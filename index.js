// import UserInfo from './confg';
const userInfo = require('./confg');
const {userInfo:{id, password}} = userInfo;
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

mongoose.connect(`mongodb+srv://${id}:${password}@cluster0.7copo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {})
	.then(() => console.log('MongoDb Connected ...'))
	.catch(console.log);


app.get('/', (req, res) => res.send('Hello World! 안녕하세요'));

app.listen(port, () => console.log(`${port} server Open!`));
