<script lang="ts">
  import { fly } from "svelte/transition";

  type Varient = "sent" | "recieved" | "notification";

  export let text: string;
  export let variant: Varient;
  export let user: string | null = null;
</script>

<div class={variant + " relative"} in:fly={{ y: 50, duration: 1000 }}>
  {#if user}
    <h4 class="absolute top-3 right-3"><strong>{user}</strong></h4>
  {/if}
  <div class={variant == "notification" ? "m-0" : "mt-5"}>
    {text}
  </div>
</div>

<style>
  .sent {
    @apply min-w-40 max-w-[80%] h-auto variant-filled-primary p-4 mt-4 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl;
  }

  .recieved {
    @apply min-w-40 max-w-[80%] h-auto variant-filled-secondary p-4 mt-4 mr-auto rounded-tr-2xl rounded-bl-2xl rounded-br-2xl;
  }

  .notification {
    @apply w-full h-auto variant-glass-surface mt-2 text-slate-200/40 flex items-center p-3 px-5;
  }
</style>
