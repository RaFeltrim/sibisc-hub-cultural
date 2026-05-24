import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Mock files
import { units } from '../src/mocks/units.js';
import { bookItems } from '../src/mocks/books.js';
import { newsItems } from '../src/mocks/news.js';
import { eventItems } from '../src/mocks/events.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.resolve(__dirname, '../supabase/seed.sql');

let sql = `-- SIBiSC Seed SQL Script
-- Generated: ${new Date().toISOString()}

-- Clean existing data
TRUNCATE public.book_inventory CASCADE;
TRUNCATE public.books CASCADE;
TRUNCATE public.library_units CASCADE;
TRUNCATE public.news_posts CASCADE;
TRUNCATE public.events CASCADE;

`;

// 1. Insert library_units
sql += `-- Seed library_units\n`;
for (const u of units) {
  let lat = 'NULL';
  let lon = 'NULL';
  if (u.id === 'u1') { lat = -22.018; lon = -47.893; }
  else if (u.id === 'u2') { lat = -22.028; lon = -47.902; }
  else if (u.id === 'u3') { lat = -22.056; lon = -47.878; }
  else if (u.id === 'u4') { lat = -21.980; lon = -47.882; }

  const name = u.name.replace(/'/g, "''");
  const address = u.address.replace(/'/g, "''");
  const neighborhood = u.neighborhood.replace(/'/g, "''");
  const hours = u.hours.replace(/'/g, "''");
  const contact = u.contact.replace(/'/g, "''");

  sql += `INSERT INTO public.library_units (id, name, neighborhood, address, hours, contact, latitude, longitude) VALUES ('${u.id}', '${name}', '${neighborhood}', '${address}', '${hours}', '${contact}', ${lat}, ${lon});\n`;
}
sql += '\n';

// 2. Insert books
sql += `-- Seed books\n`;
for (const b of bookItems) {
  const category = b.category.replace(/'/g, "''");
  const title = b.title.replace(/'/g, "''");
  const author = b.author.replace(/'/g, "''");
  const isbn = b.isbn.replace(/'/g, "''");
  const publisher = b.publisher.replace(/'/g, "''");
  const summary = b.summary.replace(/'/g, "''");

  sql += `INSERT INTO public.books (id, category, title, author, isbn, year, publisher, pages, summary) VALUES ('${b.id}', '${category}', '${title}', '${author}', '${isbn}', ${b.year}, '${publisher}', ${b.pages}, '${summary}');\n`;
}
sql += '\n';

// 3. Insert book_inventory
sql += `-- Seed book_inventory\n`;
for (const b of bookItems) {
  for (const inv of b.inventory) {
    const callNumber = inv.callNumber.replace(/'/g, "''");
    const shelf = inv.shelf.replace(/'/g, "''");
    const distanceJson = JSON.stringify(inv.distanceByNeighborhood);

    sql += `INSERT INTO public.book_inventory (book_id, unit_id, available, total, call_number, shelf, distance_by_neighborhood) VALUES ('${b.id}', '${inv.unitId}', ${inv.available}, ${inv.total}, '${callNumber}', '${shelf}', '${distanceJson}'::jsonb);\n`;
  }
}
sql += '\n';

// 4. Insert news_posts
sql += `-- Seed news_posts\n`;
for (const n of newsItems) {
  const category = n.category.replace(/'/g, "''");
  const title = n.title.replace(/'/g, "''");
  const sourceLabel = n.sourceLabel ? n.sourceLabel.replace(/'/g, "''") : '';
  const sourceUrl = n.sourceUrl ? n.sourceUrl.replace(/'/g, "''") : '';
  const summary = n.summary.replace(/'/g, "''");
  
  const formattedParagraphs = n.paragraphs.map(p => `'${p.replace(/'/g, "''")}'`).join(', ');

  sql += `INSERT INTO public.news_posts (id, category, date, title, source_label, source_url, summary, paragraphs) VALUES ('${n.id}', '${category}', '${n.date}', '${title}', '${sourceLabel}', '${sourceUrl}', '${summary}', ARRAY[${formattedParagraphs}]);\n`;
}
sql += '\n';

// 5. Insert events
sql += `-- Seed events\n`;
for (const e of eventItems) {
  const category = e.category.replace(/'/g, "''");
  const title = e.title.replace(/'/g, "''");
  const audience = e.audience.replace(/'/g, "''");
  const locationName = e.locationName.replace(/'/g, "''");
  const locationAddress = e.locationAddress.replace(/'/g, "''");
  const signup = e.signup.replace(/'/g, "''");
  const description = e.description.replace(/'/g, "''");

  sql += `INSERT INTO public.events (id, category, date, start_time, end_time, title, audience, location_name, location_address, signup, description) VALUES ('${e.id}', '${category}', '${e.date}', '${e.startTime}', '${e.endTime}', '${title}', '${audience}', '${locationName}', '${locationAddress}', '${signup}', '${description}');\n`;
}

fs.writeFileSync(outputPath, sql, 'utf8');
console.log('Seed SQL file generated successfully at SIBiSC/supabase/seed.sql');
