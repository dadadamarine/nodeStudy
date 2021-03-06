var express = require('express');
var app = express()
var router = express.Router();
var path = require('path'); 

//하나의 main 페이지를 이렇게 라우터 기반으로 별도로 처리할수 있음.




//10 메인은 로그인이 될때만(즉, 세션정보가 있을때만) 접근 가능하게 하자.
router.get('/', (req, res) =>{ // app.js 에서 main으로 들어올 경우, 이 파일에선ㄴ root니까 main지워줘야함.
    console.log('main is loaded', req.user); // req의 user로 deserializedUser의 값 사용가능
    //res.sendFile(__dirname + "/public/main.html"); // 절대경로 다쓰기 불편 : node.js에서 제공하는 변수사용 __dirname
    //dirname 은 현재경로를 이야기하는건데, 지금 경로는 router 폴더 안이라 파일 못찾음
    //res.sendFile(path.join(__dirname, "../public/main.html")); // 경로 두개를 결합해줌.
    const id = req.user;
    if(!id) res.render('login.ejs'); //10 id값이 없으면 로그인 페이지로 옮김
    res.render('main.ejs', {'id':id});
});


module.exports = router; // export