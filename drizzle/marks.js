// Raw-SQL version of the marks table schema and helper
// Replaces Drizzle ORM schema with SQL DDL and a helper that can be used with a pg Pool

const createMarksTableSQL = `
CREATE TABLE IF NOT EXISTS markstable (
    rollnumber varchar(225) PRIMARY KEY REFERENCES studenttable(rollnumber),
    java integer NOT NULL,
    dm integer NOT NULL,
    de integer NOT NULL
);
`;

async function ensureMarksTable(pool) {
    await pool.query(createMarksTableSQL);
}

export { createMarksTableSQL, ensureMarksTable };