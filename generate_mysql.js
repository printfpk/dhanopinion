const fs = require('fs');
const readline = require('readline');
const path = require('path');

const ndjsonPath = process.argv[2];
const sqlOutputPath = process.argv[3];

if (!ndjsonPath || !sqlOutputPath) {
  console.error("Usage: node generate_mysql.js <path_to_data.ndjson> <path_to_output.sql>");
  process.exit(1);
}

async function generateSql() {
  const fileStream = fs.createReadStream(ndjsonPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const out = fs.createWriteStream(sqlOutputPath);
  
  out.write("-- MySQL Dump generated from Sanity NDJSON Backup\n");
  out.write("SET NAMES utf8mb4;\n");
  out.write("SET FOREIGN_KEY_CHECKS = 0;\n\n");

  const tablesCreated = new Set();

  for await (const line of rl) {
    if (!line.trim()) continue;
    let doc;
    try {
      doc = JSON.parse(line);
    } catch (e) {
      continue;
    }

    if (!doc._type || doc._type.startsWith('sanity.')) {
      continue; // Skip sanity internal documents
    }

    const typeName = doc._type.replace(/-/g, '_');
    const tableName = `sanity_${typeName}`;

    if (!tablesCreated.has(tableName)) {
      out.write(`DROP TABLE IF EXISTS \`${tableName}\`;\n`);
      out.write(`CREATE TABLE \`${tableName}\` (\n`);
      out.write(`  \`id\` VARCHAR(255) NOT NULL,\n`);
      out.write(`  \`data\` JSON NOT NULL,\n`);
      out.write(`  PRIMARY KEY (\`id\`)\n`);
      out.write(`) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`);
      tablesCreated.add(tableName);
    }

    const id = doc._id;
    // Escape single quotes for SQL
    const dataStr = JSON.stringify(doc).replace(/\\/g, '\\\\').replace(/'/g, "''");
    
    out.write(`INSERT INTO \`${tableName}\` (\`id\`, \`data\`) VALUES ('${id}', '${dataStr}');\n`);
  }

  out.write("\nSET FOREIGN_KEY_CHECKS = 1;\n");
  out.write("-- End of Dump\n");
  
  out.end();
  console.log(`Successfully generated MySQL dump at ${sqlOutputPath}`);
}

generateSql().catch(console.error);
