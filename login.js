$(function () {
  $("#loginSection").hide();
  $("#logoutSection").hide();
  if (typeof localStorage.getItem("username") === "undefined" || localStorage.getItem("username") === null) {
    $("#loginSection").show();
  } else {
    $("#logoutSection").show();
  }
});

function login() {
  var username = $("#username").val();
  var password = $("#password").val();
  $.post("/validate-user?" + $.param({ username: username, password: password }), function (result) {
    if (result === "VALID_USER") {
      localStorage.setItem("username", username);
      window.location.href = "/";
    } else {
      alert("Invalid username and/or password");
    }
  });
}

function logout() {
  localStorage.removeItem("username");
  $("#loginSection").show();
  $("#logoutSection").hide();
}