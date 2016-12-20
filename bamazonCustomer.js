var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require('text-table');


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "w@ter1bed",
  database: "bamazon"
});


// show table
// then ask which item_id to buy
// then ask what's the quantity to buy, 
// take the quantity of that data, update mysql

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

var showProducts = function() {

	connection.query("SELECT * FROM products3", function(err, res) {

	//console.log("I'm at res "+ JSON.stringify(res));
	console.log( " ID    |  Product               |  Department | Price | Stock ");

	for ( var i = 0; i < res.length ; i++)

		{
			console.log("  " + res[i].item_id  + "    " + res[i].product_name + "    " 
				+ res[i].department_name  + "      " + res[i].price  
				+ "     "+ res[i].stock_quantity  + "  " );
		}

		selectProduct(res);

	});

	//console.log(res);
	// console.log(res.length);
	// var arr = [];
	// var t = table(res[0]);
// 	var t = table(res);
// console.log(t);
}

	showProducts();


	var selectProduct = function(x) {
		console.log(x[0].item_id);
  inquirer.prompt({
    name: "action",
    type: "list",
    message: "Which product id would you like to purchase?",
    choices: ["1","2", "3", "4","5","6","7","8","9","10"]
    //choices: [x[0].item_id , x[1].item_id ,"x[2].item_id"]
    //  ,x[3].item_id ,x[4].item_id 
    // ,x[5].item_id ,x[6].item_id ,x[7].item_id ,x[8].item_id ,x[9].item_id]

    // 
  }).then(function(answer) {

    switch (answer.action) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "10":
       	updateSQL(answer.action, x[parseInt(answer.action)-1].stock_quantity
       		, x[parseInt(answer.action)-1].price);
      	break;
    }
  });
};





var updateSQL = function (x,y,z) {

	 inquirer.prompt({
    name: "quantity",
    type: "input",
    message: "How many would you like to purchase?" 
  }).then(function(answer) {

  	console.log("you've agreed to purchase " + answer.quantity + " quantities");

  	if ( y < answer.quantity)
  		{
  		console.log("Unfortunately, we have insufficient quantity of the item that you requested");
  		process.exit();
  		}

  	else {

  			var newQuantity = y - answer.quantity;

	  		 connection.query("UPDATE products3 SET ? WHERE ?", [{
			  stock_quantity: newQuantity
			}, {
			  item_id: x
			}], function(err, res) {});

			  connection.query("SELECT * FROM products3", function(err, res) {
	 		 if (err) throw err;
	  			//console.log(res);

	  			var totalCost = (answer.quantity*z)

	  			console.log("Total Cost of your purchase is $" + totalCost);

	  			process.exit();

			});
  		}

	});
}