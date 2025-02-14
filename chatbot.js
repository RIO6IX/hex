// --- Chatbot Functionality ---
document.addEventListener("DOMContentLoaded", function(){
    const messagesDiv = document.getElementById("chatbot-messages");
    const inputField = document.getElementById("chatbot-input");
    const sendButton = document.getElementById("chatbot-send");
    const resetButton = document.getElementById("chatbot-reset");
    const chatbotContainer = document.getElementById("chatbot-container");

    // Default position settings
    const defaultStyles = {
        bottom: "20px",
        right: "20px",
        left: "auto",
        top: "auto"
    };

    // Function to reset the widget position to default
    function resetPosition() {
        chatbotContainer.style.bottom = defaultStyles.bottom;
        chatbotContainer.style.right = defaultStyles.right;
        chatbotContainer.style.left = defaultStyles.left;
        chatbotContainer.style.top = defaultStyles.top;
    }

    // Function to clear chat messages
    function clearChat() {
        messagesDiv.innerHTML = "";
    }

    // Append message function
    function appendMessage(sender, message) {
        const msgDiv = document.createElement("div");
        msgDiv.className = sender;
        msgDiv.innerText = message;
        messagesDiv.appendChild(msgDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    // Simple bot logic
    function botResponse(userText) {
        const text = userText.toLowerCase();
        if(text.includes("challenge") || text.includes("help")) {
            return "Which challenge are you having trouble with? (Forensics, Cryptography, or Reverse Engineering?)";
        } else if(text.includes("forensics")) {
            return "Forensics challenges require careful analysis of digital artifacts. Try examining file metadata and unusual patterns.";
        } else if(text.includes("cryptography")) {
            return "Cryptography challenges often involve decryption and code breaking. Look for ciphers, patterns, or hints in the challenge description.";
        } else if(text.includes("reverse") || text.includes("engineering")) {
            return "Reverse Engineering challenges may involve analyzing binary files or disassembling code. Consider using tools like Ghidra or IDA Pro.";
        } else if(text.includes("hint")) {
            return "Remember to check the challenge description and related resources for useful hints!";
        } else {
            return "I'm here to help! Ask me about a specific challenge or type 'help' to get started.";
        }
    }

    // Send message event
    sendButton.addEventListener("click", function(){
        const userText = inputField.value.trim();
        if(userText === "") return;
        appendMessage("user", userText);
        inputField.value = "";
        setTimeout(function(){
            const response = botResponse(userText);
            appendMessage("bot", response);
        }, 500);
    });

    inputField.addEventListener("keypress", function(e){
        if(e.key === "Enter") {
            sendButton.click();
        }
    });

    // Reset button clears chat and resets widget position
    resetButton.addEventListener("click", function(e){
        e.stopPropagation();
        clearChat();
        resetPosition();
    });

    // --- Draggable Chatbot Functionality ---
    let isDragging = false;
    let offsetX, offsetY;

    const header = document.getElementById("chatbot-header");
    header.addEventListener("mousedown", function(e) {
        isDragging = true;
        const rect = chatbotContainer.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        chatbotContainer.style.transition = "none";
    });

    document.addEventListener("mousemove", function(e) {
        if(isDragging) {
            chatbotContainer.style.left = (e.clientX - offsetX) + "px";
            chatbotContainer.style.top = (e.clientY - offsetY) + "px";
            chatbotContainer.style.bottom = "auto";
            chatbotContainer.style.right = "auto";
        }
    });

    document.addEventListener("mouseup", function() {
        if(isDragging) {
            isDragging = false;
            chatbotContainer.style.transition = "left 0.2s, top 0.2s";
        }
    });
});





function sendMessage(userText) {
    appendMessage("user", userText);
    inputField.value = "";
  
    fetch("/.netlify/functions/chat", {  // adjust the path based on your hosting provider
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText })
    })
    .then(response => response.json())
    .then(data => {
      appendMessage("bot", data.reply);
    })
    .catch(error => {
      console.error("Error:", error);
      appendMessage("bot", "There was an error connecting to the chat service.");
    });
  }
  