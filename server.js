var express = require("express");
var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')
var adapter = new FileSync('.data/db.json')
var db = low(adapter)
var app = express();

db.defaults({
  feedbacks: [],
  products: [
    { "itemName": "Item-1", "itemPrice": "1" },
    { "itemName": "Item-2", "itemPrice": "2" },
    { "itemName": "Item-3", "itemPrice": "3" }
  ],
  orders: [],
  credentials: [
    { "username": "prithiv", "password": "secret" }
  ]
}).write();

app.use(express.static(__dirname + '/public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/contacts", function (request, response) {
  response.sendFile(__dirname + "/views/contacts.html");
});

app.get("/admin", function (request, response) {
  response.sendFile(__dirname + "/views/admin.html");
});

app.get("/about", function (request, response) {
  response.sendFile(__dirname + "/views/about.html");
});

app.get("/team", function (request, response) {
  response.sendFile(__dirname + "/views/team.html");
});

app.get("/market", function (request, response) {
  response.sendFile(__dirname + "/views/market.html");
});

app.get("/add-products", function (request, response) {
  response.sendFile(__dirname + "/views/add-products.html");
});

app.get("/list-products", function (request, response) {
  response.sendFile(__dirname + "/views/list-products.html");
});

app.get("/orders", function (request, response) {
  response.sendFile(__dirname + "/views/orders.html");
});

app.get("/login", function (request, response) {
  response.sendFile(__dirname + "/views/login.html");
});

app.get("/abc", function (request, response) {
  response.sendFile(__dirname + "/views/abc.html");
});

app.post("/authorise", function (request, response) {
  if (request.query.token === "a") {
    // if (request.query.token === "Windication") {
    var dbFeedbacks = [];
    var feedbacks = db.get('feedbacks').value()
    feedbacks.forEach(function (feedback) {
      dbFeedbacks.push([feedback.name, feedback.email, feedback.message]);
    });
    response.send(dbFeedbacks);
  } else {
    response.send("INVALID_USER");
  }
});

// Feedbacks
app.post("/feedbacks", function (request, response) {
  db.get('feedbacks')
    .push({ name: request.query.name, email: request.query.email, message: request.query.message })
    .write()
  console.log("New product inserted in the database");
  response.sendStatus(200);
});

app.get("/clear-feedbacks", function (request, response) {
  db.get('feedbacks')
    .remove()
    .write()
  console.log("Database cleared for feedbacks");
  response.redirect("/admin");
});

// Products
app.get("/get-products", function (request, response) {
  var dbProducts = [];
  var products = db.get('products').value();
  products.forEach(function (product) {
    dbProducts.push([product.itemName, product.itemPrice]);
  });
  response.send(dbProducts);
});

app.post("/post-products", function (request, response) {
  db.get('products')
    .push({ itemName: request.query.itemName, itemPrice: request.query.itemPrice })
    .write()
  console.log("New product inserted in the database");
  response.sendStatus(200);
});

app.get("/reset-products", function (request, response) {
  db.get('products')
    .remove()
    .write()
  console.log("Database cleared for products");

  var products = [
    { "itemName": "Item-1", "itemPrice": "1" },
    { "itemName": "Item-2", "itemPrice": "2" },
    { "itemName": "Item-3", "itemPrice": "3" }
  ];

  products.forEach(function (product) {
    db.get('products')
      .push({ itemName: product.itemName, itemPrice: product.itemPrice })
      .write()
  });
  console.log("Default products added");
  response.redirect("/add-products");
});

app.get("/clear-products", function (request, response) {
  db.get('products')
    .remove()
    .write()
  console.log("Database cleared for products");
  response.redirect("/add-products");
});

// Orders
app.get("/get-orders", function (request, response) {
  var dbOrders = [];
  var orders = db.get('orders').value();
  orders.forEach(function (order) {
    if (request.query.username == order.username) {
      dbOrders.push([order.itemName, order.itemPrice]);
    }
  });
  response.send(dbOrders);
});

app.post("/post-orders", function (request, response) {
  db.get('orders')
    .push({ username: request.query.username, itemName: request.query.itemName, itemPrice: request.query.itemPrice })
    .write()
  console.log("New order inserted in the database");
  response.sendStatus(200);
});

app.get("/clear-orders", function (request, response) {
  db.get('orders')
    .remove()
    .write()
  console.log("Database cleared for orders");
  response.redirect("/orders");
});

// Orders
app.get("/check-credentials", function (request, response) {
  var dbCredentials = [];
  var credentials = db.get('credentials').value();
  credentials.forEach(function (order) {
    dbOrders.push([order.itemName, order.itemPrice]);
  });
  response.send(dbCredentials);
});

app.post("/post-credentials", function (request, response) {
  db.get('credentials')
    .push({ username: request.query.username, password: request.query.password })
    .write()
  console.log("New credential inserted in the database");
  response.sendStatus(200);
});

// Validate User
app.post("/validate-user", function (request, response) {
  var credentials = db.get('credentials').value();
  var validUser = false;
  credentials.forEach(function (credential) {
    if (credential.username == request.query.username && credential.password == request.query.password) {
      validUser = true;
    }
  });

  if (validUser) {
    response.send("VALID_USER");
  } else {
    response.send("INVALID_USER");
  }
});

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

// AllOrders
app.get("/get-all-orders", function (request, response) {
  var dbOrders = [];
  var orders = db.get('orders').value();
  orders.forEach(function (order) {
    dbOrders.push([order.username, order.itemName, order.itemPrice]);
  });
  response.send(dbOrders);
});

var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});


