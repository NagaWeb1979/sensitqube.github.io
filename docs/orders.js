$(function () {
  if (typeof localStorage.getItem("username") === "undefined" || localStorage.getItem("username") === null) {
    $("#validateSection").show();
  } else {
    $("#validateSection").hide();
    getOrders();
  }
});

function validateUser() {
  var username = $("#username").val();
  var password = $("#password").val();
  $.post("/validate-user?" + $.param({ username: username, password: password }), function (result) {
    if (result === "VALID_USER") {
      localStorage.setItem("username", username);
      getOrders();
    } else {
      alert("You are not authorised to view the orders");
    }
  });
}

function getOrders() {
  var username = localStorage.getItem("username")
  $.get('/get-orders?' + $.param({ username: username }), function (orders) {
    orders.forEach(function (order) {
      markup = "<tr><td>" + order[0] + "</td><td>" + order[1] + "</td></tr>";
      tableBody = $("table tbody");
      tableBody.append(markup);
    });
  });
}