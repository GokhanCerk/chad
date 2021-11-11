const socket = io.connect("http://localhost:5000/");

const sender = document.getElementById("sender");

const message = document.getElementById("message");

const submitBtn = document.getElementById("submitBtn");

const output = document.getElementById("output");

const feedBack = document.getElementById("feedback");

submitBtn.addEventListener("click", () => {
  socket.emit("chat", {
    message: message.value,
    sender: sender.value,
  });
});

socket.on("chat", (data) => {
  feedBack.innerHTML = ''
  output.innerHTML += "<p><strong>" + data.sender + " : </strong>" + data.message + "</p>";
  message.value = "";
});

message.addEventListener('keypress',() => {
  socket.emit('typing', sender.value)
})

socket.on('typing', data => {
  feedBack.innerHTML = '<p>' + data + 'yazıyor...</p>'
})