const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblVzZXIiOnsibmFtZSI6IlR1YW4iLCJ1c2VySWQiOiI2MmYxMjY3ZmRiYTc1YjEwYjgzZWUxOGYiLCJyb2xlIjoic3R1ZGVudCIsImVtYWlsIjoiczM4NzczNDdAcm1pdC5lZHUudm4ifSwiaWF0IjoxNjYwMTQwNzYzfQ.jVppKDYjNzp6iudWwLr9tWPMJkMxLFcsyZ3QaJvtVwc";

const socket = io("http://localhost:8080", { auth: { token } });
const messageContainer = document.getElementById("message-container");
const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const messageButton = document.getElementById("send-button");
const roomButton = document.getElementById("room-button");

const userId = prompt("What is your userId?");
appendMessage("You joined");
socket.emit("new-user", userId);

socket.on("chat-message", (data) => {
    appendMessage(`${data.name}: ${data.message}`);
});

socket.on("user-connected", (name) => {
    appendMessage(`${name} connected`);
});

socket.on("user-disconnected", (name) => {
    appendMessage(`${name} disconnected`);
});

socket.on("connect_error", err => {
    appendMessage(err);
})

socket.on("error", err => {
    appendMessage(err);
})

messageButton.addEventListener("click", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    const roomId = roomInput.value;
    appendMessage(`You: ${message}`);
    socket.emit("send-chat-message", { userId, roomId, message });
    messageInput.value = "";
});

roomButton.addEventListener("click", (e) => {
    e.preventDefault();
    const roomId = roomInput.value;
    socket.emit("join-room", userId, roomId);
});

function appendMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}
