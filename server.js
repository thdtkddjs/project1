const express = require('express');
const app = express();
const session = require('express-session');
const ejs = require('ejs')

//ejs를 뷰 엔진으로 사용
app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

const mapper = require('mybatis-mapper');
const port = process.env.PORT || 3000;
const { Client } = require("pg");

//매퍼를 불러온다
mapper.createMapper(['./resources/testmapper.xml']);
//포맷은 바꿀 예정이 없으니 미리 지정
const format = {language: 'sql', indent: ''};

//server의 정보를 지정
const dbClient = new Client({
    user: "test",
    host: "localhost",
    database: "postgres",
    password: "2119",
    port: 5432
});

//연결 성공여부를 출력
dbClient.connect(err => {
    if(err){
        console.error('connection error', err.stack)
    } else{
        console.log("db connection success!")
    }
})
//서비스를 연결한다.
const user_service=require('./api/services/user_service.js')(app, dbClient, mapper, format, session);
app.use('/api',user_service);

//ejs 모듈을 연결한다.
const router_ejs=require('./api/router/ejs.js')(app, session, ejs)
app.use('', router_ejs);

const router=require('./api/router/router.js')
app.use('',router);

app.listen(port, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
});