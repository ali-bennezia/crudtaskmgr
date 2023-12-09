const userModel = require("./../models/userModel.js");
const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;
const bcrypt = require("bcrypt");

exports.register = async function ( req, res ){
	try {
		if ( !( "username" in req.body ) || !( "password" in req.body ) || !( "email" in req.body ) )
		{
			res.set("WWW-Authenticate", 'Bearer realm="App"');
			return res.status(401).json("Unauthorized");
		}

		await userModel.create( {
			username: req.body.username,
			password: req.body.password,
			email: req.body.email
		} );

		const token = jwt.sign( { username: req.body.username }, JWT_KEY );

		return res.status(201).json(token);
	} catch (err)
	{
		console.error( err );
		res.status(500).json("Internal Server Error");
	}
};

exports.signIn = async function ( req, res ){
	try {
		if ( !( "username" in req.body ) || !( "password" in req.body ) )
		{
			res.set("WWW-Authenticate", 'Bearer realm="App"');
			return res.status(401).json("Unauthorized");
		}

		const user = await userModel.findOne({ username: req.body.username });

		if ( !user || !bcrypt.compareSync( req.body.password, user.password ) )
		{
			return res.status(403).json("Forbidden");	
		}else{
			const token = jwt.sign( { username: req.body.username }, JWT_KEY, { expiresIn: '7d' } );
			const expiration = new Date();
			expiration.setDate( expiration.getDate() + 7 );
			return res.status(200).json( { token: token, username: req.body.username, expiration: expiration } );
		}
	} catch (err)
	{
		console.error( err );
		res.status(500).json("Internal Server Error");
	}
}
