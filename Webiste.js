document.getElementById("sendButton").addEventListener("click", function() {
    const userInput = document.getElementById("userInput").value;
    if (userInput.trim() !== "") {
        addMessageToChatbox(userInput, "user-message");
        document.getElementById("userInput").value = "";
        fetchResponse(userInput);
    }
});

function addMessageToChatbox(message, className) {
    const chatbox = document.getElementById("chatbox");
    const messageDiv = document.createElement("div");
    messageDiv.className = `chat-message ${className}`;
    messageDiv.innerText = message;
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}

async function fetchResponse(userInput) {
    try {
        const response = await fetch("http://localhost:5000/getResponse", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userInput })
        });
        const data = await response.json();
        addMessageToChatbox(data.response, "bot-message");
    } catch (error) {
        console.error("Error:", error);
    }
}

