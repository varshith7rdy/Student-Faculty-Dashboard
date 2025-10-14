import { pool } from '../db/index.js';

const sql = `
CREATE TABLE IF NOT EXISTS accounts (
  id serial PRIMARY KEY,
  rollnumber varchar(225) REFERENCES studenttable(rollnumber),
  email varchar(255) UNIQUE NOT NULL,
  password text NOT NULL,
  salt text NOT NULL
);
`;

await pool.query(sql);
await pool.end();
console.log('accounts table ensured');