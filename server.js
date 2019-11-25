var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table2');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", 
    password: "password",
    database: "bamazon_db"
})

var listing = function() {
    connection.query('SELECT * FROM products', function(err, res) {
        var table = new Table({
            head: ['ID', 'Product Name', 'Department', 'Price', 'Stock Quantity']
        });
        console.log("*******************************************")
        console.log("HERE ARE ALL THE ITEMS AVAILABLE FOR SALE: ");
        console.log("*******************************************");
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].id, res[i].name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        console.log("-----------------------------------------------");
        console.log(table.toString());
        inquirer.prompt([{
            name: "itemId",
            type: "input",
            message: "What is the item ID you would like to buy?",
            validate: function(value) {
                if (isNaN(value) == false) {
                    return true;
                } else {
                    return false;
                }
            }
        }, {
            name: "Quantity",
            type: "input",
            message: "How many of this item would you like to buy?",
            validate: function(value) {
                if (isNaN(value) == false) {
                    return true;
                } else {
                    return false;
                }
            }
        }]).then(function(answer) {
            var chosenId = answer.itemId - 1
            var chosenProduct = res[chosenId]
            var chosenQuantity = answer.Quantity
            if (chosenQuantity < res[chosenId].stock_quantity) {
                console.log(' XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                console.log("Your total for " + "(" + answer.Quantity + ")" + " - " + res[chosenId].name + " is: " + res[chosenId].price * chosenQuantity);
                console.log(' XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: res[chosenId].stock_quantity - chosenQuantity
                }, {
                    id: res[chosenId].id
                }], function(err, res) {
                    //console.log(err);
                    listing();
                });

            } else {
                console.log("Sorry, that item is out of stock.");
                listing();
            }
        })
    })
}


listing();