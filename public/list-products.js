$(function () {
  if (typeof localStorage.getItem("username") === "undefined" || localStorage.getItem("username") === null) {
    $("#submitSection").hide();
    $("#validateSection").show();
  } else {
    $("#validateSection").hide();
    $("#submitSection").show();
  }
});

$.get('/get-products', function (products) {
  products.forEach(function (product) {
    markup = "<tr><td>" + product[0] + "</td><td>" + product[1] + "</td><td><input type='checkbox' value=" + product + " /></td></tr>";
    tableBody = $("table tbody");
    tableBody.append(markup);
  });
});

$('form').submit(function (event) {
  event.preventDefault();
  var username = localStorage.getItem("username");
  $('input:checkbox:checked').map(function () {
    product = this.value.split(',');
    console.log(product[0], product[1]);
    $.post('/post-orders?' + $.param({ username: username, itemName: product[0], itemPrice: product[1] }), function () {
      console.log('Added ...');
      $('#addStatus').text('Item has been added Successfully!');
    });
  });
});

function validateUser() {
  var username = $("#username").val();
  var password = $("#password").val();
  $.post("/validate-user?" + $.param({ username: username, password: password }), function (result) {
    if (result === "VALID_USER") {
      localStorage.setItem("username", username);
      $("#validateSection").hide();
      $("#submitSection").show();
    } else {
      alert("You are not authorised to order");
    }
  });
}
