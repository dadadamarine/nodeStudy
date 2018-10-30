const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

//html + data를 합쳐서 전달하기 
// 그러기 위해 ejs 모듈 설치
router.post('/form', (req, res)=>{
    // get의경우 ,  req.param('email') 이라고 적어서 url 에있는 파라미터를 뺴서 쓸수 있음.
    // post의 경우 별도의 모듈 필요 : body parser
    console.log(req.body.email); // email주소가 출력됨.
    //res.send("<h1>welcome! "  + req.body.email +"</h1>");
    res.render('email.ejs' , {'email' : req.body.email}); // 뒤에 오브젝트를 넣어줌 , email이라고 적힌애들을 ejs에 찾아서 치환하여 클라이언트로 응답 넘김.
});




// ajax : 웹 페이지 전체를 다시 로딩하지 않고도, 웹 페이지의 일부분만을 갱신할 수 있습니다.
router.post('/ajax', function(req, res){
    console.log(req.body.email);
    //check validation 필요 ==> select db를 통한 db조회를 통해서.
    var responseData = {'result': 'ok' , 'email' : req.body.email};
    res.json(responseData);
});


module.exports = router;