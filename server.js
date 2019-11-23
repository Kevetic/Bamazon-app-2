var mysql = require("mysql");
var inquirer = require('inquirer')


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    pasword: 'Password',
    database: 'bamazon_DB',
    port: 8080
})
connection.connect();

var display = function(){
    connection.query('SELECT * FROM products', function(err, res){
        if (err) throw (err);
        console.log('')
        console.log('==================')
        console.log('working')
        console.log('===================')
        console.log('')
    })
}