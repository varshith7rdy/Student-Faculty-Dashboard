import { log } from "node:console";

const createaccountsTableSQL = `    
CREATE TABLE IF NOT EXISTS accounts (
  email varchar(255) UNIQUE NOT NULL,
  password text NOT NULL,
  salt text NOT NULL,
  name varchar(255) NOT NULL
);
`;

async function ensureloginsTable(pool) {
  console.log(
    "here's the error"
  );

  await pool.query(createaccountsTableSQL);
}

export { createaccountsTableSQL, ensureloginsTable };