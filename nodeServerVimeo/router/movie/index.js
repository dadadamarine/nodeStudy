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


module.exports = router;