// Manual seed entry point:  npm run seed
// Importing db.js already runs the one-time starter seed automatically on first
// use; this script simply reports the result.
import { seedInitialData } from './db.js';

const result = seedInitialData();
console.log(
  result.seeded
    ? 'Seeded starter content (partner + blog posts).'
    : 'Database already seeded — nothing to do.'
);
process.exit(0);
