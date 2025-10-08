// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    window.scrollY > 50 ?
        navbar.style.backgroundColor = 'rgba(10,10,10,0.98)' :
        navbar.style.backgroundColor = 'rgba(10,10,10,0.95)';
});

// Toggle mobile menu
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Chatbot
const chatbotIcon = document.getElementById("chatbot-icon");
const chatbotWindow = document.getElementById("chatbot-window");
const closeBtn = document.getElementById("chatbot-close");
const messages = document.getElementById("chatbot-messages");
const options = document.querySelectorAll("#chatbot-options button");

// Open/close chatbot
chatbotIcon.addEventListener("click", () => chatbotWindow.classList.toggle("visible"));
closeBtn.addEventListener("click", () => {
    chatbotWindow.classList.remove("visible");
    resetChat();
});

// Function to reset chat
function resetChat() {
    messages.innerHTML = '<div class="bot-message">Hello! I\'m here to help. What would you like to do?</div>';
}

// Handle options click
options.forEach(btn => {
    btn.addEventListener("click", () => {
        const action = btn.dataset.action;

        // Add user message
        const userMsg = document.createElement("div");
        userMsg.classList.add("user-message");
        userMsg.textContent = btn.textContent;
        messages.appendChild(userMsg);

        // Handle bot response
        if (action === "other") {
            const botMsg = document.createElement("div");
            botMsg.classList.add("bot-message");
            botMsg.textContent = "Sure! You can type your question below:";
            messages.appendChild(botMsg);

            // Create input field for user
            const inputDiv = document.createElement("div");
            inputDiv.classList.add("other-input-div");
            inputDiv.innerHTML = `
                <input type="text" id="other-input" placeholder="Type your question..." style="width: 70%; padding: 0.3rem; margin-top: 0.3rem;">
                <button id="other-send" style="padding:0.3rem 0.5rem; margin-left:0.3rem;">Send</button>
            `;
            messages.appendChild(inputDiv);
            messages.scrollTop = messages.scrollHeight;

            // Handle user question
            document.getElementById("other-send").addEventListener("click", () => {
                const userQuestion = document.getElementById("other-input").value.trim();
                if (!userQuestion) return;

                // Show user message
                const userMsg2 = document.createElement("div");
                userMsg2.classList.add("user-message");
                userMsg2.textContent = userQuestion;
                messages.appendChild(userMsg2);

                // Bot default reply (you can customize)
                const botReply = document.createElement("div");
                botReply.classList.add("bot-message");
                botReply.textContent = "Thanks for your question! I will get back to you soon.";
                messages.appendChild(botReply);

                // Remove input field
                inputDiv.remove();
                messages.scrollTop = messages.scrollHeight;
            });

        } else {
            const botMsg = document.createElement("div");
            botMsg.classList.add("bot-message");

            if (action === "home") {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                botMsg.textContent = "Taking you to Home!";
            } else if (action === "projects") {
                document.getElementById("projects").scrollIntoView({ behavior: 'smooth' });
                botMsg.textContent = "Here are my Projects!";
            } else if (action === "resume") {
                window.open("resume.docx", "_blank");
                botMsg.textContent = "Downloading my Resume!";
            } else if (action === "contact") {
                document.getElementById("contact").scrollIntoView({ behavior: 'smooth' });
                botMsg.textContent = "Opening Contact Section!";
            }

            messages.appendChild(botMsg);
        }

        // Auto scroll
        messages.scrollTop = messages.scrollHeight;
    });
});
