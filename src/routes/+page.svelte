<script lang="ts">
  import { initializeApp } from "firebase/app";
  import { getDatabase, ref, set, push, get } from "firebase/database";

  import Message from "$lib/components/Message.svelte";
  import { messages, username, id } from "$lib/stores";
  import type { Variant, message } from "$lib/stores";

  import { io } from "socket.io-client";
  import type { Socket } from "socket.io-client";

  let hostedSite = "https://rtc-socket.onrender.com";
  let localSite = "http://localhost:3001";

  let messageValue: string;

  let socket: Socket = io(localSite);

  const firebaseConfig = {
    apiKey: "AIzaSyDpyPLOQsOueepemQma5G8O4r3ywkA70Dc",
    authDomain: "rtc-app-11370.firebaseapp.com",
    projectId: "rtc-app-11370",
    storageBucket: "rtc-app-11370.appspot.com",
    messagingSenderId: "621823141851",
    appId: "1:621823141851:web:1baf4efc60a195789f69fe",
    measurementId: "G-FVH9QDPQHP",
    databaseURL: "https://rtc-app-11370-default-rtdb.firebaseio.com",
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  socket.on("connect", () => {
    if (socket.id) {
      id.set(socket.id);
    }
    socket.emit("new-connection", socket.id);

    const userRef = ref(db, "message");

    get(userRef).then((snapshot) => {
      const oldMessages = snapshot.val();

      if (oldMessages) {
        const messagesArray = Object.keys(oldMessages).map((messageId) => ({
          ...oldMessages[messageId],
        }));
        messages.set(messagesArray);
      } else {
        messages.set([]);
      }
    });
  });

  socket.on("broad-connection", (userId) => {
    addMessage(
      "notification",
      "User with ID: " + userId + " connected.",
      "server",
    );
  });

  socket.on("recieve-message", (newMessage, senderUsername) => {
    console.log("Client recieved " + newMessage + " by " + senderUsername);
    addMessage("recieved", newMessage, senderUsername);
  });

  socket.on("broad-disconnection", (userId) => {
    addMessage(
      "notification",
      "User with ID: " + userId + " disconnected.",
      "server",
    );
  });

  function sendMessageToDb(newMessage: message) {
    set(push(ref(db, "message")), {
      type: "recieved",
      user: newMessage.user,
      text: newMessage.text,
    });
  }

  function addMessage(newType: Variant, newText: string, newUsername: string) {
    let newMessage: message = {
      type: newType,
      text: newText,
      user: newUsername,
    };

    messages.update((currentMessages) => [...currentMessages, newMessage]);
  }

  function updater(type: Variant) {
    addMessage(type, messageValue, $username);
    socket.emit("new-message", messageValue, $username);

    let newMessage: message = {
      type: type,
      text: messageValue,
      user: $username,
    };

    sendMessageToDb(newMessage);
    messageValue = "";
  }
</script>

<div class="flex flex-col h-full w-full">
  <div class="flex-1 w-full p-5 flex flex-col items-end">
    {#each $messages as message}
      <Message
        text={message.text}
        variant={message.type}
        user={message?.user}
      />
    {/each}
  </div>

  <div class="h-16">
    <form
      class="h-full w-full"
      on:submit|preventDefault={() => {
        updater("sent");
      }}
    >
      <div
        class="h-full w-full input-group input-group-divider grid-cols-[1fr_auto]"
      >
        <input
          class="p-3 text-white"
          type="text"
          placeholder="Enter message..."
          bind:value={messageValue}
        />
        <button class="variant-filled-secondary hover:varient-filled-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </form>
  </div>
</div>
