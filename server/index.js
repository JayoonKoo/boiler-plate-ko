// import UserInfo from './confg';
const config = require('./config/key');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser') ;
const {auth} = require('./middleware/auth');
const {User} = require("./models/User");

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

mongoose.connect(config.mongoURI, {})
	.then(() => console.log('MongoDb Connected ...'))
	.catch(console.log);


app.get('/', (req, res) => res.send('Hello World! 안녕하세요'));

app.get('/api/hello', (req, res) => {
	res.send('안녕하세요 ~');
})

app.post('/api/users/register', (req, res) => {
	// 회원 가입 할때 필요한 정보를 client에서 가져오면 
	// 데이터 베이스에 넣어준다. 
	const user = new User(req.body);
	user.save((err, userInfo) => {
		if (err) {
			console.log(err);
			return res.json({success: false, err,})
		}
		return res.status(200).json({
			success: true
		})
	});
})

app.post('/api/users/login', (req, res) => {
	// 요청된 이메일을 데이터베이스에서 있는지 찾는다.
	User.findOne({email: req.body.email}, (err, user) => {
		if (!user) {
			return res.json({
				loginSuccess: false,
				message: "제공된 이메일에 해당하는 유저가 없습니다."
			})
		}

		// 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인 
		user.comparePassword(req.body.password, (err, isMatch) => {
			if(!isMatch) {
				return res.json({loginSuccess: false, messge: "비밀번호가 틀렸습니다."})
			}
			// 비밀번호 까지 맞다면 토큰을 생성하기 
			user.generateToken((err, user) => {
				if (err) return res.status(400).send(err);
				// 토큰을 저장한다... 쿠기? or 로컬스토리지... 여기서는 쿠키에 저장하도록 함.. 
				res.cookie("x_auth", user.token)
					.status(200)
					.json({loginSuccess: true, userId: user._id});
			})
		})
	})
})

app.get("/api/users/auth", auth,  (req, res) => {
	// 여기 까지 미들웨어를 통과했다는 이야기는 authntication이 true 라는 말. 
	res.status(200).json({
		_id: req.user._id,
		isAdmin: req.user.role === 0 ? false : true,
		isAuth: true,
		email: req.user.email,
		name: req.user.name,
		lastname: req.user.lastname,
		role: req.user.role,
		image: req.user.image
	})
})

app.get('/api/users/logout', auth, (req, res) => {
	User.findOneAndUpdate({_id: req.user._id}, {token: ""}, (err, user) => {
		if (err) return res.json({ success: false, err});
		return res.status(200).send({
			success: true
		})
	})
})

app.listen(port, () => console.log(`${port} server Open!`));
