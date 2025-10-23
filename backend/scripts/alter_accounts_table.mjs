import { pool } from '../db/index.js';

async function removeIDCol() {
    const text = 'alter table accounts drop column rollnumber ';
    await pool.query(text);
}

removeIDCol()