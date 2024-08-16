<script lang="ts">
  import "../app.postcss";
  import { AppShell } from "@skeletonlabs/skeleton";
  import NavItems from "$lib/components/NavItems.svelte";
  import { messages } from "$lib/stores";

  let messageValue: string;

  function addMessage() {
    messages.update((currentMessages) => [...currentMessages, messageValue]);
    messageValue = "";
  }
</script>

<!-- svelte-ignore illegal-attribute-character -->
<AppShell
  slotHeader="h-24 variant-glass-surface p-5"
  slotSidebarLeft="w-80 variant-filled-surface"
  slotPageFooter="h-16 variant-filled-primary"
>
  <svelte:fragment slot="header">
    <h1 class="text-4xl text-primary-500">RTC App</h1>
  </svelte:fragment>

  <svelte:fragment slot="sidebarLeft">
    <div class="w-full h-full">
      <NavItems />
    </div>
  </svelte:fragment>

  <slot />

  <svelte:fragment slot="pageFooter">
    <form class="h-full w-full" on:submit|preventDefault={addMessage}>
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
  </svelte:fragment>
</AppShell>
