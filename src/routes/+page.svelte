<script lang="ts">
  import Message from "$lib/components/Message.svelte";
  import { messages, username, id } from "$lib/stores";
  import { io } from "socket.io-client";
  import type { Socket } from "socket.io-client";

  import type { Variant } from "$lib/stores";

  let hostedSite = "https://rtc-socket.onrender.com";
  let localSite = "http://localhost:3001";

  let messageValue: string;

  let socket: Socket = io(hostedSite);

  socket.on("connect", () => {
    id.set(socket?.id);
  });

  socket.on("broad-connection", (userId) => {
    addMessage("notification", "User with ID: " + userId + " connected.");
  });

  socket.on("recieve-message", (newMessage, senderUsername) => {
    console.log("Client recieved " + newMessage + " by " + senderUsername);
    addMessage("recieved", newMessage, senderUsername);
  });

  socket.on("broad-disconnection", (userId) => {
    addMessage("notification", "User with ID: " + userId + " disconnected.");
  });

  function addMessage(newType: Variant, newText: string, newUsername?: string) {
    let newMessage = {
      type: newType,
      text: newText,
      user: newUsername || null,
    };
    messages.update((currentMessages) => [...currentMessages, newMessage]);
  }

  function updater(type: Variant) {
    addMessage(type, messageValue, $username);
    socket.emit("new-message", messageValue, $username);

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
          placeholder="Search..."
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
