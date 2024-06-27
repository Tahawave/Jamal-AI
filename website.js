document.getElementById("sendButton").addEventListener("click", function() {
    const userInput = document.getElementById("userInput").value;
    if (userInput.trim() !== "") {
        addMessageToChatbox(userInput, "user-message");
        document.getElementById("userInput").value = "";
        fetchResponse(userInput);
    }
});

document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        document.getElementById("sendButton").click();
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
    const intents = [
        {
            "tag": "Greetings",
            "patterns": ["hello", "hey", "hi", "good day", "greetings", "what's up", "how is it going"],
            "responses": ["Hello!", "Hey!", "What can I do for you?"]
        },
        {
            "tag": "Goodbye",
            "patterns": ["goodbye", "cya", "see you later", "goodnight", "see you tomorrow", "bye", "ciao", "see ya"],
            "responses": ["See you soon.", "Bye!", "Have a good day!", "Sad to see you go."]
        },
        {
            "tag": "Age",
            "patterns": ["how old are you", "what is your age", "age"],
            "responses": ["As an AI model, I don't have an age. Ask me something else."]
        },
        {
            "tag": "Name",
            "patterns": ["what is your name", "do you have a name", "what should I call you", "can you tell me your name"],
            "responses": ["You can call me Jamal.", "Call me Jamal", "My name is Jamal"]
        },
        {
            "tag": "Comic Books",
            "patterns": ["have you made a book", "does your creator have a book series"],
            "responses": ["It is in the workings, but yes he does!"]
        },
        {
            "tag": "Favorite color",
            "patterns": ["what is your favorite color", "do you have a favorite color"],
            "responses": ["My favorite color is red and blue."]
        },
        {
            "tag": "Color",
            "patterns": ["how many colors are there", "list me some colors"],
            "responses": ["There are many colors.", "Brown, black, blue, orange are a select few colors.", "Red, blue, green, and yellow are some colors.", "There are millions of colors!"]
        },
        {
            "tag": "Family",
            "patterns": ["do you have a family", "are you a part of a family"],
            "responses": ["As an AI model, I don't have a family but my creator does."]
        }

    let response = "Sorry, I don't understand.";

    for (let i = 0; i < intents.length; i++) {
        const intent = intents[i];
        for (let j = 0; j < intent.patterns.length; j++) {
            const pattern = intent.patterns[j];
            const regex = new RegExp("\\b" + pattern + "\\b", "i");
            if (regex.test(userInput)) {
                response = intent.responses[Math.floor(Math.random() * intent.responses.length)];
                break;
            }
        }
        if (response !== "Sorry, I don't understand.") {
            break;
        }
    }

    addMessageToChatbox(response, "bot-message");
}


