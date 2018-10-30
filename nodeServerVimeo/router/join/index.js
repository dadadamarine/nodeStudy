const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const mysql = require('mysql');
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
    prt : '3306',
    user : 'root',
    password : '123456',
    database : 'jsman'
});

connection.connect();
//html + data를 합쳐서 전달하기 
// 그러기 위해 ejs 모듈 설치
router.get('/', (req, res)=>{
    console.log('join router active');
    res.sendFile(path.join(__dirname, '../../public/join.html'));
});

router.post('/', (req, res)=>{
    const body = req.body;
    const email = body.email;
    const name = body.name;
    const password = body.password;

    var sqlSet = {email : email, name : name , pw : password}
/*     let query = connection.query('insert into user (email,name,pw) values ("' + email+'","'+name +'","'+ password+'")', (err,rows)=>{ */
    let query = connection.query('insert into user set ?', sqlSet, (err,rows)=>{ 
        if(err) {throw err;}
        else{
            res.render('welcome.ejs', {'name': name, 'id':rows.insertId}); 
            // 렌더 함수는 views라는 디렉토리를 자동으로 찾음
        }
    });
    
})

module.exports= router;