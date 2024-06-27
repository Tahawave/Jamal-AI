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
        "Jauhar": ["Jauhar Ismail is the father of Taha Ismail. Jauhar Ismail works at Mathworks and his position is being the director."],
        "Famy": ["Famy also known as Fehmeeda is the wife of Jauhar Ismail. She is the mother of two monkeys named Taha and Abdullah."],
        "Abdullah": ["Abdullah is the brother of Taha Ismail", "Abdullah is an 18-year-old monkey who does nothing in the summer but works as hard as Einstein during the school year.", "Abdullah Ismail is going to Northeastern for college and is majoring in Computer Science."],
        "Iqra": ["Iqra is the sister of Emaan Mehta.", "Iqra is the youngest in Emaan's family.", "Iqra is one of the two monkeys in the Mehta family. Iqra is 4 years old in 2024 The other one is Emaan.", "NOT JUST IQRA WHO IS 4, BUT HOW DO THE PARENTS DEAL WITH BOTH IQRA WITH EMAAN!"],
        "Emaan": ["Emaan is the sister of Iqra.", "Emaan is a responsible girl who takes care of Iqra. Emaan attends ISOC also known as International Society Of Cambridge. She is 8 years old in 2024.", "Emaan is one of the monkeys of the Mehta family, the other one is Iqra who is the youngest in the family.", "THOSE MONKEYS ARE SO CRAZY!!!!!!"],
        "Sumi": ["Summaiyah Mehta is the khala of Taha and Abdullah Ismail. Sumi (her nickname) is a very fun person to be around and is seen around young people often."],
        "Fahmida": ["Fahmida Panchbaya (not to be confused with Fehmeeda Mehta) is the mother of Iqra and Emaan. Fahmida is married to Junaid Mehta.", "..I don't know how she deals with both Emaan and Iqra...."],
        "Junaid": ["Junaid Mehta is the father of Iqra and Emaan. Junaid is also married to Fahmida Panchbaya. Junaid has an interest in cars similarly to Abdullah Ismail.", "HOW DOES HE DEAL WITH BOTH OF THOSE MONKEYS?!"]
    };

    let response = "Sorry, I don't understand.";
    for (let intent in intents) {
        if (new RegExp(intent, "i").test(userInput)) {
            response = intents[intent][Math.floor(Math.random() * intents[intent].length)];
            break;
        }
    }

    addMessageToChatbox(response, "bot-message");
}


