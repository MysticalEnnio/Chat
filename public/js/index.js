var socket = io();
var username = localStorage.getItem("username");
var profilePicture = localStorage.getItem("profilePicture");

function loadMessage(options) {
  var messageTemplate = document.querySelector("[data-message-template]");
  var messageWrapper = document.getElementById("messageWrapper");
  var message = messageTemplate.content.cloneNode(true);
  message.querySelector("[data-username]").textContent =
    options.username || "Username";
  message.querySelector("[data-time]").textContent = options.time || "";
  message.querySelector("[data-message]").textContent = options.message || "";
  message.querySelector("[data-profile-picture]").src =
    options.profilePicture ||
    "https://ik.imagekit.io/mystical/Default_Pb_vXykZsFHE.png";
  messageWrapper.appendChild(message);
  messageWrapper.scrollTop = messageWrapper.scrollHeight;
}

function sendMessage() {
  var message = document.getElementById("newMessageInput").value;
  if (message) {
    socket.emit("message", {
      message,
      username,
      profilePicture,
      time: new Date().toLocaleTimeString(),
    });
    document.getElementById("newMessageInput").value = "";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (profilePicture) {
    document.querySelector("#newMessageWrapper .profilePicture").src =
      profilePicture;
  }

  document
    .getElementById("messageSubmit")
    .addEventListener("click", function () {
      sendMessage();
    });
  document
    .getElementById("newMessageInput")
    .addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        sendMessage();
      }
    });

  socket.on("message", function (data) {
    console.log("new message", data);
    loadMessage(data);
  });
});
