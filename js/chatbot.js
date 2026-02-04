const fab = document.getElementById("chatFab");
const chat = document.getElementById("chatWindow");
const closeBtn = document.getElementById("closeChat");
const sendBtn = document.getElementById("sendBtn");
const input = document.getElementById("chatInput");
const body = document.getElementById("chatBody");

fab.onclick = () => chat.style.display = "flex";
closeBtn.onclick = () => chat.style.display = "none";

sendBtn.onclick = sendMessage;
input.addEventListener("keypress", e => {
  if(e.key === "Enter") sendMessage();
});

async function sendMessage(){
  const text = chatInput.value.trim();
  if(!text) return;

  // show user message
  addMsg(text, "user");
  chatInput.value = "";

  // typing indicator
  const typing = document.createElement("div");
  typing.className = "bot-msg";
  typing.innerText = "Roboost AI is typing...";
  chatBody.appendChild(typing);
  chatBody.scrollTop = chatBody.scrollHeight;

  try {
    const response = await fetch("https://roboost-ai-backend.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();
    typing.remove();

    addMsg(data.reply, "bot");

  } catch (err) {
    typing.remove();
    addMsg("⚠️ Unable to reach AI server. Please try again.", "bot");
  }
}


function addMsg(text, type){
  const div = document.createElement("div");

  if(type === "user"){
    div.className = "user-msg";
  } else {
    div.className = "bot-msg";
  }

  div.innerHTML = text;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}

const emojiBtn = document.getElementById("emojiBtn");
const attachBtn = document.getElementById("attachBtn");
const fileInput = document.getElementById("fileInput");
const chatInput = document.getElementById("chatInput");

/* 😊 Emoji button → insert emoji into input */
emojiBtn.addEventListener("click", () => {
  chatInput.value += "😊";
  chatInput.focus();
});

/* 📎 Attachment button → open file picker */
attachBtn.addEventListener("click", () => {
  fileInput.click();
});

/* Handle selected file */
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if(!file) return;

  addMsg(`📎 <strong>File selected:</strong> ${file.name}`, "user");

  // later this file will be sent to backend
  fileInput.value = "";
});
