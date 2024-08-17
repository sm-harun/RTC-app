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
  <span>
    {text}
  </span>
</div>

<style>
  .sent {
    @apply w-4/5 h-24 variant-filled-primary p-4 mt-4 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl;
  }

  .recieved {
    @apply w-4/5 h-24 variant-filled-secondary p-4 mt-4 mr-auto rounded-tr-2xl rounded-bl-2xl rounded-br-2xl;
  }

  .notification {
    @apply w-full h-12 variant-glass-surface text-slate-200/40 flex items-center px-10;
  }
</style>
