function attachEvents() {
  const sendBtn = document.getElementById("submit");
  const refreshBtn = document.getElementById("refresh");

  sendBtn.addEventListener("click", sendMessage);
  refreshBtn.addEventListener("click", getMessage);
}

async function sendMessage(e) {
  e.preventDefault();
  const url = "http://localhost:3030/jsonstore/messenger";
  let authorNameInput = document.querySelector("input[name='author']");
  let msgTextInput = document.querySelector("input[name='content']");
  let authorName = authorNameInput.value;
  let msgText = msgTextInput.value;

  let message = {
    author: authorName,
    content: msgText,
  };

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(message),
  });
  authorNameInput.value = "";
  msgTextInput.value = "";
  getMessage();
}

async function getMessage(e) {
  const url = "http://localhost:3030/jsonstore/messenger";
  let response = await fetch(url);
  let messages = await response.json();
  let messageTextarea = document.getElementById("messages");

  let messageString = Object.values(messages)
    .map((message) => `${message.author}: ${message.content}`)
    .join("\n");
  messageTextarea.value = "";
  messageTextarea.value = messageString;
}
attachEvents();
