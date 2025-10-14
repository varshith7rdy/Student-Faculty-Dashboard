import { executionAsyncResource } from "node:async_hooks";
import { pool } from "../db/index.js"
import { randomBytes, createHmac } from 'node:crypto'

async function login(req, res) {

    const { email, name, password }  = req.body ;
    console.log(email);
    
    const text = 'SELECT email, salt FROM accounts WHERE email = ($1)'
    const exists = await pool.query(text, [email]);
    
    if(!exists.rowCount){
        console.log("User doesn't exists");
        res.status(400).json({ message: "user doesnt exists"})
    }
    else{
        const salt = exists.rows[0].salt;
        const hashedPassword = createHmac('sha256', salt).update(password).digest('hex')       
        const text1 = 'select * from accounts where password = ($1)'
        const value1 = await pool.query(text1, [hashedPassword])
        console.log(value1.rowCount);
        res
        .status(200)
        .send(`${name} has successfully logged in!!`)
    }
}

async function signup(req, res){
    
    console.log("HEYY");
    
    const { email, name, password }  = req.body ;

    const text1 = 'SELECT email FROM accounts WHERE email = ($1)'
    const exists = await pool.query(text1, [email]);
    if(exists.rowCount){
        console.log("User exists!!");
        res.status(400).send("User Already exists");
    }
    else{
        
        const value = randomBytes(256).toString('hex')
        console.log(typeof password);
        
        const hashedPassword = createHmac('sha256', value).update(password).digest('hex')
        const text = 'insert into accounts(email, name, password, salt) values ($1, $2, $3, $4)';
        const values = [email, name, hashedPassword, value];
        await pool.query(text, values);
        res.status(200).send(values);
    }
}

export { signup, login }
// async function getProfileById(req, res) {
    
// }