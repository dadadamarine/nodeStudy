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


module.exports = router;