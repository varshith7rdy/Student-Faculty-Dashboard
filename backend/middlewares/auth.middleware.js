import jwt from "jsonwebtoken"

export function logger(req, res, next)
{
	const timestamp = new Date().toISOString();
  console.log(`${timestamp} - Method: ${req.method}, URL: ${req.originalUrl}`);
  next(); 
}

export const authenticationM = (req, res, next)=>{

	const tokenHeader = req.headers["authorization"];
	const role = req.headers["role"];
	console.log(role);
	
	if(!tokenHeader){
		next();
	}

	if(!tokenHeader.startsWith("Bearer")){
		return res.status(401).json({message: "Bearer token misssing"})
	}
	const token = tokenHeader.split(" ")[1];

	try{

		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
		console.log(decoded);
		req.user = decoded
		// res.send({user: decoded})
		next();
	}
	catch(err)
	{
		console.log("Error has occured while authenticating");
		next()
	}

}