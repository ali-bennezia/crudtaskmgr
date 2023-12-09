const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
	username: { type: String, required: true, unique: true, minlength: 8, maxlength: 26 },
	password: { type: String, required: true, minlength: 8, maxlength: 28 },
	email: { type: String, required: true, unique: true, minlength: 3, maxlength: 28 }
});

schema.pre( "save", async function(){
	if ( this.isModified( "password" ) ){
		this.password = await bcrypt.hash( this.password, 10 );
	}
} );

module.exports = mongoose.model( "user", schema );
