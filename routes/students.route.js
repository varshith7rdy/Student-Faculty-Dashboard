import express from "express";
import { createStudentProfile, getStudents, enterMarks, getMarks, login, getMarksbyNumber} from "../controllers/dbControl.js";

const router1 = express.Router();

router1.get("/login", login);

router1.post("/createprofile", createStudentProfile);

router1.post("/entermarks", enterMarks)

router1.get("/getprofiles", getStudents)

router1.get("/getmarks", getMarks)

router1.get("/getbynumber", getMarksbyNumber)

export { router1 }