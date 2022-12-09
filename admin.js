$(function() {
  $("#adminSection").hide();
  $("#tokenSection").show();
});

function showFeedback() {
  var token = $("#token").val();
  $.post("/authorise?" + $.param({ token: token }), function(feedbacks) {
    if (feedbacks !== "INVALID_USER") {
      feedbacks.forEach(function(feedback) {
        var markup =
          "<tr><td>" +
          feedback[0] +
          "</td><td>" +
          feedback[1] +
          "</td><td>" +
          feedback[2] +
          "</td></tr>";
        $("table tbody").append(markup);
      });
      $("#tokenSection").hide();
      $("#adminSection").show();
    } else {
      alert("You are not authorised to view this page");
    }
  });
}

$('form').submit(function (event) {
  event.preventDefault();
  var username = $('input#username').val();
  var password = $('input#password').val();
  $.post('/post-credentials?' + $.param({ username: username, password: password }), function () {
    $('#addStatus').text('Item has been added Successfully!');
    $('input#username').val('');
    $('input#password').val('');
    $('input').focus();
  });
});
