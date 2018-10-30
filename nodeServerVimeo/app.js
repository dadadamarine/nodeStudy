const express = require('express');
const app = express();
const bodyParser = require("body-parser");

const router  = require('./router/index');


app.listen(3000, ()=>{
    console.log("start express server on port 3000");
    //3000포트에서 이 함수를 한번 실행하고, 응답을 받기위해 대기중 상태에 머무름
    // 이 안의 비동기로 실행됨 . 다른 동기적인 함수가 다 실행되고 여기가 실행됨.
});

// 자동으로 파일변화 감지해서, 서버를 종료했다 재시작 해주는 라이브러리 : nodemon 



//스태틱파일을 일일히 등록하기 힘듬 : 스태틱 파일을 express에 등록해주는 절차

app.use(express.static('public')); // public 이라는 디렉토리를 static으로 express가 기억하도록 만듬.
app.use(bodyParser.json()); // express야, 나 bodyParser 쓸거야 
// 클라에서 json형태로 올때도 있고, post로 올때도 있어서
app.use(bodyParser.urlencoded({extended:true})); // 클라와 서버의 통신은 아스키 형태의 데이터만 보낼수 있음 ( 그래서 다른 문자는 인코딩 해서 보냄. ) 
// 이 두경우 모두 처리하겠다
app.set('view engine','ejs'); // 뷰 엔진으로 ejs사용.

app.use(router); // path 가 없을때는 router가 처리








/* 
app.post('/email_post', (req, res)=>{
    // get의경우 ,  req.param('email') 이라고 적어서 url 에있는 파라미터를 뺴서 쓸수 있음.
    // post의 경우 별도의 모듈 필요 : body parser
    console.log(req.body.email); // email주소가 출력됨.
    res.send("<h1>welcome! "  + req.body.email +"</h1>");
});
 */


/* app.post('/ajax_search' , (req,res)=>{
    console.log(req.body.searchData);

    var responseData = {'result':'ok', 'searchData' : req.body.searchData, 'responseData' : 'null'};

    res.json(responseData);
});
 */

//mysql 사용을 위해서 mysql 노드 모듈을 설치해야 한다.

