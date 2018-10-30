var express = require('express');
var app = express()
var router = express.Router();
var path = require('path'); 

//하나의 main 페이지를 이렇게 라우터 기반으로 별도로 처리할수 있음.

router.get('/', (req, res) =>{ // app.js 에서 main으로 들어올 경우, 이 파일에선ㄴ root니까 main지워줘야함.
    console.log(1);
    //res.sendFile(__dirname + "/public/main.html"); // 절대경로 다쓰기 불편 : node.js에서 제공하는 변수사용 __dirname
    //dirname 은 현재경로를 이야기하는건데, 지금 경로는 router 폴더 안이라 파일 못찾음
    res.sendFile(path.join(__dirname, "../public/main.html")); // 경로 두개를 결합해줌.
});


module.exports = router; // export