import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { get } from "http";
import { router1 } from "./backend/routes/students.route.js"
import { router2 } from "./backend/routes/faculty.route.js"
import { pool } from "./backend/db/index.js";
import { ensureStudentTable } from "./backend/schema/studentProfile.js";
import { ensureMarksTable } from "./backend/schema/marks.js";
import { ensureloginsTable } from "./backend/schema/accounts.js"
import { logger, authenticationM } from "./backend/middlewares/auth.middleware.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

console.log("Working here");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(logger)
app.use(express.json())
app.use("/faculty",authenticationM)
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