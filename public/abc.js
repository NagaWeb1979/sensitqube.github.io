

function getAllOrders() {
  var token = $("#token").val();
  $.post("/authorise?" + $.param({ token: token }), function(feedbacks) {
    if (feedbacks !== "INVALID_USER") {
      $.get('/get-all-orders', function (orders) {
        orders.forEach(function (order) {
          markup = "<tr><td>" + order[0] + "</td><td>" + order[1] + "</td><td>" + order[2] + "</td></tr>";
          tableBody = $("table tbody");
          tableBody.append(markup);
        });
      });
    } else {
      alert("You are not authorised to view this page");
    }
  });
}