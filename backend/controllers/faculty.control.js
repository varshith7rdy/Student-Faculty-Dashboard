import { executionAsyncResource } from "node:async_hooks";
import { pool } from "../db/index.js"
import { randomBytes, createHmac } from 'node:crypto'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"

dotenv.config()

async function login(req, res) {

    const { userEmail, userName, userPass }  = req.body ;
    console.log(userEmail);
    
    const text = 'SELECT email, salt FROM accounts WHERE email = ($1)'
    const exists = await pool.query(text, [userEmail]);
    
    if(!exists.rowCount){
        console.log("User doesn't exists");
        res.status(400).json({ message: "user doesnt exists"})
        return;
    }
    else{
        const salt = exists.rows[0].salt;
        const hashedPassword = createHmac('sha256', salt).update(userPass).digest('hex')       
        const text1 = 'select * from accounts where password = ($1)'
        const value1 = await pool.query(text1, [hashedPassword])
        console.log(value1.rowCount);
        if(!value1.rowCount){
            res.status(400).send(`Incorrect Password`)
        }
    }
    const payload = {
        emailID: userEmail,
        name: userName
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
    res.json({
        status: "success",
        user : req.user,
        token: token
    })
}

async function signup(req, res){
    const { userEmail, userName, userPass }  = req.body ;
    
    const text1 = 'SELECT email FROM accounts WHERE email = ($1)'
    const exists = await pool.query(text1, [userEmail]);
    if(exists.rowCount){
        console.log("User exists!!");
        res.status(200).send("User Already exists");
    }
    else{
        
        const value = randomBytes(256).toString('hex')
        console.log(typeof userPass);
        
        const hashedPassword = createHmac('sha256', value).update(userPass).digest('hex')
        const text = 'insert into accounts(email, name, password, salt) values ($1, $2, $3, $4)';
        const values = [userEmail, userName, hashedPassword, value];
        await pool.query(text, values);
        res.status(200).send(values);
    }
    // console.log("Working");
}

export { signup, login }
// async function getProfileById(req, res) {
    
// }