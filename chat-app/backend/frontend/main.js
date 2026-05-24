const form = document.querySelector(".form");

const input = document.querySelector(".input");

const messagesList = document.querySelector(".messages");

async function loadMessages() {
  const response = await fetch("/messages");

  const messages = await response.json();

  messagesList.innerHTML = "";

  messages.forEach((message) => {
    const li = document.createElement("li");

    li.textContent = message.text;

    messagesList.appendChild(li);
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  await fetch("/messages", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      text: input.value,
    }),
  });

  input.value = "";

  loadMessages();
});

loadMessages();