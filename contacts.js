$(function() {
  $("form").submit(function(event) {
    event.preventDefault();
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();
    console.log("==> posting", name, email, message);
    $.post(
      "/feedbacks?" + $.param({ name: name, email: email, message: message }),
      function() {
        $("<li></li>")
          .text(name + " " + email + " " + message)
          .appendTo("ul#allFeedbackSection");
        $("input#name").val("");
        $("input#email").val("");
        $("#message").val("");
        $("input").focus();
        $("#statusMessage").text("Thanks for your feedback!");
      }
    );
  });
});

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







