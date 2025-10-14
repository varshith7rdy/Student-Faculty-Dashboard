import { pool } from '../db/index.js';

async function main() {
  try {
    // Check existing columns
    const { rows } = await pool.query(`
      SELECT column_name FROM information_schema.columns
      WHERE table_name = 'studenttable' AND column_name IN ('desc','description')
    `);

    const cols = rows.map(r => r.column_name);
    if (cols.includes('description')) {
      console.log('description column already exists — nothing to do');
      return;
    }

    if (cols.includes('desc')) {
  console.log('Renaming column desc -> description');
  await pool.query('ALTER TABLE studenttable RENAME COLUMN "desc" TO description');
      console.log('Rename completed');
    } else {
      console.log('Neither desc nor description column found — creating description column');
      await pool.query('ALTER TABLE studenttable ADD COLUMN description text');
      console.log('Added description column');
    }
  } catch (err) {
    console.error('Schema update failed', err);
    process.exitCode = 2;
  } finally {
    await pool.end();
  }
}

main();
