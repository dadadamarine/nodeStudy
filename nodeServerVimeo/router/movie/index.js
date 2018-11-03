var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var mysql = require('mysql')

// DATABASE SETTING
var connection = mysql.createConnection({
    host : 'localhost',
    port : '3306',
    user : 'root',
    password : '123456',
    database : 'jsman'
})

connection.connect()


router.get('/list', (req,res)=>{
	res.render('movie.ejs');
})

//1. /movie , GET
router.get('/', (req,res)=>{
	var responseData = {};

	var query = connection.query('select title from movie', (err,rows)=>{
		if(err) throw err;
		if(rows.length){
			responseData.result = 1;
			responseData.data = rows;
		}else{
			responseData.result=0;
		}
		res.json(responseData);
	});
})

router.post('/',(req, res)=>{
	const title = req.body.title;
	const type = req.body.type;
	const grade = req.body.grade; 
	const actor = req.body.actor;

	const sql = {title, type, grade, actor};
	console.log(sql);
	const query = connection.query('insert into movie set ?', sql, (err,rows)=>{
		console.log(err);
		if(err) throw err;
		return res.json({'result':1});
	})

})

//3. /movie/:title , GET
router.get('/:title', (req,res)=>{
	var title = req.params.title; // 하부 uri로 전달한값 이렇게 받을 수있음.
	var responseData = {};

	var query = connection.query('select * from movie where title = ?', [title],(err,rows)=>{
		if(err) throw err;
		if(rows[0]){
			responseData.result = 1;
			responseData.data = rows;
		}else{
			responseData.result=0;
		}
		res.json(responseData);
	});
})

//3. /movie/:title , DELETE
router.delete('/:title', (req,res)=>{
	var title = req.params.title; // 하부 uri로 전달한값 이렇게 받을 수있음.
	var responseData = {};

	var query = connection.query('delete from movie where title = ?', [title],(err,rows)=>{ // 삭제시 여부에따라, ok패킷의 affectedRows가 달라짐
		if(err) throw err;
		//console.log(rows);
		if(rows.affectedRows>0){
			responseData.result = 1;
			responseData.data = title;
		}else{
			responseData.result=0;
		}
		res.json(responseData);
	});
})

module.exports = router;