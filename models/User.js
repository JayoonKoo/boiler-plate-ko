const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

userSchema.methods.comparePassword = function(plainPassword, cb) {
	// plainPassword vs 암호화된 비밀번호, 암호화해서 비교해야 함. 복호화 불가능 
	bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
		if (err) return cb(err) 
			cb(null, isMatch)
	})
}

userSchema.methods.generateToken = function(cb) {
	const user = this;
	// jsonwebtoken을 이요해서 toekn 생성하기 
	const token = jwt.sign(user._id.toHexString(), 'secretToken');
	user.token = token;
	user.save(function(err, user) {
		if (err) return cb(err);
		cb(null, user);
	});
}

const User = mongoose.model('User', userSchema);

module.exports = {User};
