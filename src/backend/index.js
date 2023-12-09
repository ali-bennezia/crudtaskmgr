// init

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

// config

dotenv.config();
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

const PORT = process.env.PORT ?? 5506;
const DB_URL = process.env.DB_URL;
if ( !DB_URL )
{
	console.error( "Erreur: aucun paramètre DB_URL n'est donné pour la connexion à la base de donnée." );
	return;
}

const FRONTEND_URL = process.env.FRONTEND_URL;

app.all("*", function (req, res, next) {
	res.set("Access-Control-Allow-Origin", FRONTEND_URL ?? "*");
	res.set("Access-Control-Allow-Methods", "*");
	res.set("Access-Control-Allow-Headers", "*");
	next();
});

// routes

const userRoutes = require("./routes/userRoutes.js");
const taskRoutes = require("./routes/taskRoutes.js");

app.use( "/api/user", userRoutes );
app.use("/api/task", taskRoutes );

// launch

mongoose.connect( DB_URL )
	.then( function(){
	console.log( "Connexion à la base de donnée établie." );
	app.listen( PORT, function ( err ){
		if ( err )
		{
			console.error( err );
			return;
		}
		console.log( `Serveur en ligne sur le port ${PORT}.` );
	} );
} ).catch( function(err){
	console.error(err);
} );


