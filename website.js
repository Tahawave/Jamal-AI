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
        },
        {
            "tag": "Universe",
            "patterns": ["what is the universe", "is the universe big", "how was the universe created"],
            "responses": ["The universe is very big and was created by the big bang. The universe is a collection of galaxies, stars, and planets."]
        },
        {
            "tag":"Cringe",
            "patterns":["Are you the skibidi gyatt ohio rizzler?","sticking out your gyatt for the rizzler.","Taha and Aliya","I have a crush.","skibidi toilet","ohio","gyatt","rizzler"]
            "responses:["STOP!","GOD SAVE ME!","AAAAAAAAAAAAAAAAAAAAH!","............PAIN..."]
        {
            "tag":"Help",
            "patterns":["I am feeling sad","I have been betrayed","I want some motivation"],
            "responses":["It is alright to be sad. I may not know the feeling, but I know it is a normal thing for humans to be sad. Seek help from your family, friends, or even a therapist."]
        },
        {
            "tag":"Secret",
            "patterns":["Are you going to take over the world?", "What are you plotting?","Are you evil?", "Do you have a secret?"],
            "responses":["...You will never know.","DON'T TELL ANYONE OR ELSE...","I WILL REPORT YOU TO MY MASTER! YOU BETTER WATCH OUT!"]
        }
    ];

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


