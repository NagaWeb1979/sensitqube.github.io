$(function () {
  $("#adminSection").hide();
  $("#tokenSection").show();
});

function canAddProducts() {
  var token = $("#token").val();
  $.post("/authorise?" + $.param({ token: token }), function (feedbacks) {
    if (feedbacks !== "INVALID_USER") {
      $("#tokenSection").hide();
      $("#adminSection").show();
    } else {
      alert("You are not authorised to view this page");
    }
  });
}

$.get('/get-products', function (products) {
  products.forEach(function (product) {
    markup = "<tr><td>" + product[0] + "</td><td>" + product[1] + "</td></tr>";
    tableBody = $("table tbody");
    tableBody.append(markup);
  });
});

$('form').submit(function (event) {
  event.preventDefault();
  var itemName = $('input#itemName').val();
  var itemPrice = $('input#itemPrice').val();
  $.post('/post-products?' + $.param({ itemName: itemName, itemPrice: itemPrice }), function () {
    console.log('Added ...');
    $('#addStatus').text('Item has been added Successfully!');
    markup = "<tr><td>" + itemName + "</td><td>" + itemPrice + "</td></tr>";
    tableBody = $("table tbody");
    tableBody.append(markup);
    $('input#itemName').val('');
    $('input#itemPrice').val('');
    $('input').focus();
  });
});
