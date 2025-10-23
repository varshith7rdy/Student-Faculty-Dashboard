import express from 'express';
import { signup, login } from '../controllers/faculty.control.js'

const router2 = express.Router()

router2.get('/signup', signup);

router2.get('/login', login)

export { router2 };