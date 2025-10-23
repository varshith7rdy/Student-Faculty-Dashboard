import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../db/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createStudentProfile(req, res) {
  
  const { userName, userNumber, userDesc } = req.body; 
  console.log(userName, userNumber, userDesc);
  try {
    const text = `INSERT INTO studenttable(name, rollnumber, description) VALUES($1, $2, $3)`;
    const values = [userName, userNumber, userDesc];
    await pool.query(text, values);
    console.log("Successfully inserted the Student Profile");
    res.status(201).json({ message: 'Inserted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Insert failed' });
  }
}

async function getStudents(req, res) {
  try {
    const { rows } = await pool.query('SELECT name, rollnumber, description FROM studenttable');
    console.log(rows);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Query failed' });
  }
}

async function enterMarks(req, res) {
 
  const { userNumber, userJava, userDE, userDM } = req.body;
  console.log( userNumber, userJava, userDE, userDM);
  try {
    const text = `INSERT INTO markstable(rollnumber, java, DE, DM) VALUES($1, $2, $3, $4)`;
    const values = [userNumber, userJava, userDE, userDM];
    await pool.query(text, values);
    console.log("req success entermarks");
    res.status(201).json({ message: 'Inserted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Insert failed' });
  }
}

async function getMarks(req, res) {
  try {
    const { rows } = await pool.query('SELECT rollnumber, java, DE, DM FROM markstable');
    console.log(rows);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Query failed' });
  }
}

async function login(req, res){
  res.sendFile(path.join(__dirname, "index.html"));
  console.log("Sent the file");
  
};

async function getMarksbyNumber(req, res){

  const { userNumber } = req.body;
  console.log(userNumber);
  try {
    const { rows } = await pool.query('SELECT rollnumber, java, de, dm FROM markstable WHERE rollnumber = $1', [userNumber]);
    if (!rows[0]) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
    console.log(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Query failed' });
  }
}

export { createStudentProfile, getStudents, enterMarks, getMarks, login, getMarksbyNumber }