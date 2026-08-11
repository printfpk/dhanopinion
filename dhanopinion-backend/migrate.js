require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const { createClient } = require('@sanity/client');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Configure Sanity Client
const sanityClient = createClient({
  projectId: 'gg3p2wwe', // Your Sanity Project ID
  dataset: 'production',
  useCdn: false, // We want the latest data
  apiVersion: '2023-05-03', // Use current date
  // token: process.env.SANITY_API_TOKEN, // Optional: if you have private data or want to export drafts
});

async function main() {
  console.log('Starting migration from Sanity to PostgreSQL...');

  try {
    // 1. Migrate Categories
    console.log('Fetching Categories...');
    const categories = await sanityClient.fetch(`*[_type == "category"]`);
    console.log(`Found ${categories.length} categories.`);
    for (const cat of categories) {
      await prisma.category.upsert({
        where: { id: cat._id },
        update: {
          title: cat.title || '',
          description: cat.description || '',
        },
        create: {
          id: cat._id,
          title: cat.title || '',
          description: cat.description || '',
        }
      });
    }

    // 2. Migrate Authors
    console.log('Fetching Authors...');
    const authors = await sanityClient.fetch(`*[_type == "author"]`);
    console.log(`Found ${authors.length} authors.`);
    for (const author of authors) {
      await prisma.author.upsert({
        where: { id: author._id },
        update: {
          name: author.name || '',
          slug: author.slug?.current || '',
          image: author.image || null,
          bio: author.bio || null,
        },
        create: {
          id: author._id,
          name: author.name || '',
          slug: author.slug?.current || '',
          image: author.image || null,
          bio: author.bio || null,
        }
      });
    }

    // 3. Migrate Posts
    console.log('Fetching Posts...');
    // We need to fetch references for categories as well
    const posts = await sanityClient.fetch(`*[_type == "post"]{
      _id,
      title,
      slug,
      "authorId": author._ref,
      mainImage,
      publishedAt,
      body,
      "categoryIds": categories[]._ref
    }`);
    console.log(`Found ${posts.length} posts.`);
    for (const post of posts) {
      // Connect categories if they exist
      const categoryConnections = post.categoryIds 
        ? post.categoryIds.map(id => ({ id })) 
        : [];

      await prisma.post.upsert({
        where: { id: post._id },
        update: {
          title: post.title || '',
          slug: post.slug?.current || '',
          authorId: post.authorId || null,
          mainImage: post.mainImage || null,
          publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
          body: post.body || null,
          categories: {
            set: [], // Clear existing relations to re-add
            connect: categoryConnections
          }
        },
        create: {
          id: post._id,
          title: post.title || '',
          slug: post.slug?.current || '',
          authorId: post.authorId || null,
          mainImage: post.mainImage || null,
          publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
          body: post.body || null,
          categories: {
            connect: categoryConnections
          }
        }
      });
    }

    // 4. Migrate Other Pages
    console.log('Fetching Other Pages...');
    
    const pageTypes = [
      { type: 'homePage', model: prisma.homePage },
      { type: 'siteSettings', model: prisma.siteSettings },
      { type: 'easyWinsPage', model: prisma.easyWinsPage },
      { type: 'caseStudiesPage', model: prisma.caseStudiesPage },
      { type: 'philosophyPage', model: prisma.philosophyPage },
      { type: 'informationCentrePage', model: prisma.informationCentrePage },
      { type: 'simpleStrategyPage', model: prisma.simpleStrategyPage },
      { type: 'stepsToSuccessPage', model: prisma.stepsToSuccessPage },
      { type: 'page', model: prisma.genericPage },
    ];

    for (const { type, model } of pageTypes) {
      console.log(`Fetching ${type}...`);
      const docs = await sanityClient.fetch(`*[_type == "${type}"]`);
      console.log(`Found ${docs.length} of ${type}.`);
      
      for (const doc of docs) {
        await model.upsert({
          where: { id: doc._id },
          update: { data: doc },
          create: { id: doc._id, data: doc }
        });
      }
    }

    console.log('Migration completed successfully!');

  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
