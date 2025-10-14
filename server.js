import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { get } from "http";
import { router1 } from "./routes/students.route.js"
import { router2 } from "./routes/faculty.route.js"
import { pool } from "./db/index.js";
import { ensureStudentTable } from "./drizzle/studentProfile.js";
import { ensureMarksTable } from "./drizzle/marks.js";
import { ensureloginsTable } from "./drizzle/accounts.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

function logger(req, res, next)
{
	const timestamp = new Date().toISOString();
  console.log(`${timestamp} - Method: ${req.method}, URL: ${req.originalUrl}`);
  next(); 
}

app.use(logger)
app.use(express.json())
app.use(express.static(__dirname));

app.use("/student", router1);
app.use("/faculty", router2);
// Ensure DB tables exist then start the server
(async () => {
	try {
		await ensureStudentTable(pool);
		await ensureMarksTable(pool);
		await ensureloginsTable(pool);
		console.log('Ensured tables exist');
		app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
	} catch (err) {
		console.error('Failed to ensure tables or start server:', err);
		process.exit(1);
	}
})();