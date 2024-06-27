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

function fetchResponse(userInput) {
    // Simulate a response from the chatbot based on predefined intents
    const intents = {
        "Greetings": ["Hello!", "Hey!", "What can I do for you?"],
        "Goodbye": ["See you soon.", "Bye!", "Have a good day!", "Sad to see you go."],
        "Age": ["As an AI model, I don't have an age. Ask me something else."],
        "Name": ["You can call me Jamal.", "Call me Jamal", "My name is Jamal"],
        "Comic Books": ["It is in the workings, but yes he does!"],
        "Favorite color": ["My favorite color is red and blue."],
        "Color": ["There are many colors.", "Brown, black, blue, orange are a select few colors.", "Red, blue, green, and yellow are some colors.", "There are millions of colors!"],
        "Family": ["As an AI model, I don't have a family but my creator does."],
        "Universe": ["The universe is very big and was created by the big bang. The universe is a collection of galaxies, stars, and planets."],

    let response = "Sorry, I don't understand.";
    for (let intent in intents) {
        if (new RegExp(intent, "i").test(userInput)) {
            response = intents[intent][Math.floor(Math.random() * intents[intent].length)];
            break;
        }
    }

    addMessageToChatbox(response, "bot-message");
}


