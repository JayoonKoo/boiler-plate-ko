// import UserInfo from './confg';
const config = require('./config/key');
const express = require('express');
const mongoose = require('mongoose');
const {User} = require("./models/User");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(config.mongoURI, {})
	.then(() => console.log('MongoDb Connected ...'))
	.catch(console.log);


app.get('/', (req, res) => res.send('Hello World! 안녕하세요'));

app.post('/register', (req, res) => {
	// 회원 가입 할때 필요한 정보를 client에서 가져오면 
	// 데이터 베이스에 넣어준다. 
	const user = new User(req.body);
	user.save((err, userInfo) => {
		if (err) return res.json({success: false, err,})
		return res.status(200).json({
			success: true
		})
	});

})

app.listen(port, () => console.log(`${port} server Open!`));
