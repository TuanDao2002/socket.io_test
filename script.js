const socket = io("http://localhost:8080");
const messageContainer = document.getElementById("message-container");
const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const messageButton = document.getElementById("send-button");
const roomButton = document.getElementById("room-button");

const name = prompt("What is your name?");
appendMessage("You joined");
socket.emit("new-user", name);

socket.on("chat-message", (data) => {
    appendMessage(`${data.name}: ${data.message}`);
});

socket.on("user-connected", (name) => {
    appendMessage(`${name} connected`);
});

socket.on("user-disconnected", (name) => {
    appendMessage(`${name} disconnected`);
});

messageButton.addEventListener("click", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    const room = roomInput.value;
    appendMessage(`You: ${message}`);
    socket.emit("send-chat-message", { name, room, message });
    messageInput.value = "";
});

roomButton.addEventListener("click", (e) => {
    e.preventDefault();
    const room = roomInput.value;
    socket.emit("join-room", room, name);
});

function appendMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}
