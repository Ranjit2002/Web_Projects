// const chatsContainer = document.querySelector(".chats-container");
// const promptForm = document.querySelector(".prompt-form")
// const promptInput = document.querySelector(".prompt-input")

// let userMessage = "";

// const chatHistory = [];

// const API_KEY = `AQ.Ab8RN6ITzfT4eO1-qHC1-G0VN9bkuO7tJ4_Abj7eLXkzHA38xA`;
// const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${API_KEY}`;

// const createMsgElement = (content, classes) => {
//     const div = document.createElement("div");
//     div.className = `message ${classes}`;
//     div.innerHTML = content;
//     return div;
// }

// const generateResponse = async () => {
//     chatHistory.push({
//         role: "user",
//         parts: [{ text: userMessage }]
//     });

//     try {
//         const response = await fetch(API_URL, {
//             method: "POST", // Changed = to :
//             headers: { "Content-Type": "application/json" }, // Changed = to :
//             body: JSON.stringify({ contents: chatHistory }) // Changed = to :
//         });

//         const data = await response.json();

//         // Note: 'Error' must be capitalized in JavaScript
//         if (!response.ok) throw new Error(data.error.message);

//         console.log(data);
//     }
//     catch (error) {
//         console.log(error);
//     }
// }

// const handleFormSubmit = (e) => {
//     e.preventDefault();
//     userMessage = promptInput.value.trim();

//     if (!userMessage) return;

//     promptInput.value = "";

//     const userMsgHTML = `<p class="message-text py-3 px-4 max-w-[75%] rounded-[12px_12px_0px_12px] bg-[#1e2330]"></p>`;
//     const userMsgDiv = createMsgElement(userMsgHTML, "user-message flex justify-end w-full mb-2");

//     userMsgDiv.querySelector(".message-text").textContent = userMessage;
//     chatsContainer.appendChild(userMsgDiv);

//     setTimeout(() => {

//         const botMsgHTML = `<img src="img/Gemini.png" alt="avatar"
//                     class="w-14 h-14 shrink-0 p-2 self-start -mr-1.75 rounded-[50%] bg-[#283045] border border-[#333e58] animate-[spin_3s_linear_infinite]"><p class="message-text py-3 px-4 max-w-[75%] rounded-[12px_12px_0px_12px]">Just a sec...</p>`;
//         const botMsgDiv = createMsgElement(botMsgHTML, "bot-message flex flex-start w-full mb-0 gap-3 text-lg");

//         chatsContainer.appendChild(botMsgDiv);
//         generateResponse();

//     }, 600);


// }

// promptForm.addEventListener("submit", handleFormSubmit);


const chatsContainer = document.querySelector(".chats-container");
const promptForm = document.querySelector(".prompt-form");
const promptInput = document.querySelector(".prompt-input");

let userMessage = "";
const chatHistory = [];

// WARNING: Never expose your actual API key in production frontend code.
const API_KEY = `AQ.Ab8RN6J8MhvfEFegABnOYaGqKjcVZrZaPLtMM_UQ6TNawJ9nMA`;
// FIXED: Changed gemini-3.5-flash to gemini-1.5-flash
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const createMsgElement = (content, classes) => {
    const div = document.createElement("div");
    div.className = `message ${classes}`;
    div.innerHTML = content;
    return div;
}

// FIXED: Passed incomingBotMsgDiv as an argument so we can update its text later
const generateResponse = async (incomingBotMsgDiv) => {
    // Add user message to history
    chatHistory.push({
        role: "user",
        parts: [{ text: userMessage }]
    });

    try {
        const response = await fetch(API_URL, {
            method: "POST", // FIXED: Changed = to :
            headers: { "Content-Type": "application/json" }, // FIXED: Changed = to :
            body: JSON.stringify({ contents: chatHistory }) // FIXED: Changed = to :
        });

        const data = await response.json();

        // FIXED: Capitalized 'Error'
        if (!response.ok) throw new Error(data.error.message);

        // FIXED: Extract the actual text from Gemini's response object
        const botResponseText = data.candidates[0].content.parts[0].text;

        // FIXED: Update the UI with the bot's response
        const messageElement = incomingBotMsgDiv.querySelector(".message-text");
        messageElement.textContent = botResponseText;

        // Optional: Stop the spinning animation once the response arrives
        const avatar = incomingBotMsgDiv.querySelector("img");
        avatar.classList.remove("animate-[spin_3s_linear_infinite]");

        // FIXED: Add the bot's response to the history so it remembers context
        chatHistory.push({
            role: "model",
            parts: [{ text: botResponseText }]
        });

    } catch (error) {
        console.error("API Error:", error);

        // Update UI to show an error message
        const messageElement = incomingBotMsgDiv.querySelector(".message-text");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
        messageElement.style.color = "red";

        const avatar = incomingBotMsgDiv.querySelector("img");
        avatar.classList.remove("animate-[spin_3s_linear_infinite]");
    }
}

const handleFormSubmit = (e) => {
    e.preventDefault();
    userMessage = promptInput.value.trim();

    if (!userMessage) return;

    promptInput.value = "";

    const userMsgHTML = `<p class="message-text py-3 px-4 max-w-[75%] rounded-[12px_12px_0px_12px] bg-[#1e2330]"></p>`;
    const userMsgDiv = createMsgElement(userMsgHTML, "user-message flex justify-end w-full mb-2");

    userMsgDiv.querySelector(".message-text").textContent = userMessage;
    chatsContainer.appendChild(userMsgDiv);

    // Scroll to the bottom
    chatsContainer.scrollTo(0, chatsContainer.scrollHeight);

    setTimeout(() => {
        const botMsgHTML = `<img src="img/Gemini.png" alt="avatar"
                    class="w-14 h-14 shrink-0 p-2 self-start -mr-1.75 rounded-[50%] bg-[#283045] border border-[#333e58] animate-[spin_3s_linear_infinite]">
                    <p class="message-text py-3 px-4 max-w-[75%] rounded-[12px_12px_0px_12px]">Just a sec...</p>`;

        const botMsgDiv = createMsgElement(botMsgHTML, "bot-message flex flex-start w-full mb-0 gap-3 text-lg");

        chatsContainer.appendChild(botMsgDiv);
        chatsContainer.scrollTo(0, chatsContainer.scrollHeight);

        // FIXED: Pass the botMsgDiv into the function so it can be updated!
        generateResponse(botMsgDiv);

    }, 600);
}

promptForm.addEventListener("submit", handleFormSubmit);