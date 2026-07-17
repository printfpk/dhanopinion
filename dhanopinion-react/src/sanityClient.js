import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'gg3p2wwe',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-07-11',
  perspective: 'published', // Always fetch published content, never drafts
});

// Helper function for generating image URLs
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
