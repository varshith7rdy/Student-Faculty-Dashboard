import { pool } from '../db/index.js';

async function main() {
  try {
    const studentCols = await pool.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'studenttable'
      ORDER BY ordinal_position
    `);
    console.log('studenttable columns:');
    console.table(studentCols.rows);

    const marksCols = await pool.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'markstable'
      ORDER BY ordinal_position
    `);
    console.log('markstable columns:');
    console.table(marksCols.rows);
    
    const logins = await pool.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'accounts'
      ORDER BY ordinal_position
    `);
    console.log('accounts columns:');
    console.table(logins.rows);
  } catch (err) {
    console.error('inspect error', err);
    process.exitCode = 2;
  } finally {
    await pool.end();
  }
}

main();
