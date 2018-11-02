const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const mysql = require('mysql');
const passport =require('passport');
const LocalStrategy = require('passport-local').Strategy;
// https://expressjs.com/en/guide/database-integration.html#mysql 사이트 가이드 참조


/* create table user(
    UID int not null AUTO_INCREMENT
    EMAIL char(30),
    NAME char(20),
    PW char(30),
    primary key(UID)
    );
     */
const connection = mysql.createConnection({
    host : 'localhost',
    port : '3306',
    user : 'root',
    password : '123456',
    database : 'jsman'
});

connection.connect();
//html + data를 합쳐서 전달하기 
// 그러기 위해 ejs 모듈 설치
router.get('/', (req, res)=>{
    //중복 아이디시 전달되는 message받기
    let msg;
    const errMsg = req.flash('error'); 
    if(errMsg) msg = errMsg;
    console.log('get join router active');
    res.render('join.ejs', {'message': msg});
});

passport.serializeUser((user, done)=>{
    //done에서 flase가 없이 객체값을 전달했을때, 그값을 받아 사용가능.

    console.log('passport session save : ', user.id);
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    //세션값의 id를 뽑은다음에 다시 db를 조회해서 추가 정보를 가져옴이 가능

    console.log('passport session save getdata : ', id);
    done(null, id);
});

//passport 설정 해줘야함
passport.use('local-join', new LocalStrategy({ 
    //passport 전략중 local-join 사용
    //얘를 라우팅 할때 불러서 사용함.
        usernameField: 'email',
        passwordField: 'password', // form 에서 email,password를 파라미터로 전달받기 때문에 그걸 사용한다고 해줌.
        passReqToCallback : true
    }, (req, email, password, done)=>{
        const query = connection.query('select * from user where email=?', [email], (err, rows)=>{
            if(err) return done(err); // 없을경우 done으로 마무리
            if(rows.length){ // 있을경우 넘어감
                console.log('existed user');
                return done(null, false, {message : 'your email is already used'});
                //http://www.passportjs.org/docs/downloads/html/ 에서 done 검색
                //실패일 경우 false를 남기면 fail리다이렉트로 감 근데 여기선 메세지를 가져감
            }else{
                //정상일 경우 insert해줌
            const sql = {email:email , pw : password};
            const query = connection.query('insert into user set ?', sql, (err,rows)=>{
                if(err) throw err;
                return done(null , {'email':rows.email, 'id':rows.insertId}); //정상 작동일경우 false 안넣고 , 값을 넣어주면됨
                // 성공일 경우 메인으로 감
                // + 시리얼 라이즈 처리 해줘야함
            });
            }

        });
    }
    ));

router.post('/', passport.authenticate('local-join', { 
    // 위에서 정의한 local-join사용
    successRedirect: '/main', // 성공일때는 main 리다이렉트 시킴
    failureRedirect: '/join', // 다시 회원가입창 , 
    failureFlash : true
    //이부분은 콜백으로 동작
}));

/* router.post('/', (req, res)=>{
    const body = req.body;
    const email = body.email;
    const name = body.name;
    const password = body.password;

    var sqlSet = {email : email, name : name , pw : password}
//     let query = connection.query('insert into user (email,name,pw) values ("' + email+'","'+name +'","'+ password+'")', (err,rows)=>{ 
    let query = connection.query('insert into user set ?', sqlSet, (err,rows)=>{ 
        if(err) {throw err;}
        else{
            res.render('welcome.ejs', {'name': name, 'id':rows.insertId}); 
            // 렌더 함수는 views라는 디렉토리를 자동으로 찾음
        }
    });
    
}); */ 
//기존에 이렇게 post로 처리하던걸 passport 모듈을 이용해서 처리하고 + 세션까지 만드는 방식으로 처리
// npm install passport passport-local express-session connect-flash --save-dev


module.exports= router;