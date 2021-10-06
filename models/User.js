const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
	name: {
		type: String,
		maxlength: 50
	},
	email: {
		type: String,
		trim: true,
		unique: 1
	},
	password: {
		type: String,
		minlength: 5
	},
	lastname: {
		type: String,
		maxlength: 50
	},
	role: {
		type: Number,
		default: 0
	},
	image: String,
	token: {
		type: String
	},
	tokenExp: {
		type: Number
	}
})


userSchema.pre('save', function(next) {

	if (this.isModified('password')) {
		// 비밀번호 암호화 시키기
		bcrypt.genSalt(saltRounds, (err, salt) => {
			if (err) return next(err);
			bcrypt.hash(this.password, salt, (err, hash) => {
				if (err) return next(err);
				this.password = hash;
			})
		})
	}
	next();
})

const User = mongoose.model('User', userSchema);

module.exports = {User};
