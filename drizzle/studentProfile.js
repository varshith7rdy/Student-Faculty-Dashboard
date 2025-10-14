// Raw-SQL version of the student profile table

const createStudentTableSQL = `
CREATE TABLE IF NOT EXISTS studenttable (
    name varchar(255) NOT NULL UNIQUE,
    rollnumber varchar(225) PRIMARY KEY,
    description text
);`;
// heck Database Views: If you have any database views that used the old column, you'll need to update or recreate them.

async function ensureStudentTable(pool) {
    await pool.query(createStudentTableSQL);
}

export { createStudentTableSQL, ensureStudentTable };