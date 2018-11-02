var express = require('express');
var app = express()
var router = express.Router();
var path = require('path'); 
const main = require('./main/main');
const email = require('./email/email');
const join = require('./join/index');
const login = require('./login/index');
const logout = require('./logout/index');
const movie = require('./movie/index');
//get요청이 올경우
router.get('/', (req, res)=>
{
    //콜백함수 만듬
    //res.send("<h1>hi friends</h1>");

    //루트로 접속햇을때 main.html 파일을 보내주려면?

    //모든 요청에 대해서 일일히 처리를 해주게 되있음!
    //res.sendFile("C:/Users/ms/Desktop/스터디/nodeJS/nodeServerVimeo/public/main.html");
    
    res.sendFile(path.join(__dirname ,"../public/main.html")); // 절대경로 다쓰기 불편 : node.js에서 제공하는 변수사용 __dirname
});

router.use('/main', main); // 바디 파서 선언등은 app.js 에서 이루어 졌어도 , 이 파일 안에서도 사용가능
router.use('/email', email); 
router.use('/join', join);
router.use('/login', login);
router.use('/logout', logout);
router.use('/movie', movie);
//여기서 router를 export시켰는데 , router에 들어간게 get밖에 없음. app -> router로 바꿔줘야함.
//라우터에 각 요청별로 이걸 처리해~! 라고 지정해둠 , 다른모듈쓸때는 use를 쓰면됨.
module.exports= router;