<script>
  import Message from "$lib/components/Message.svelte";
  import { messages } from "$lib/stores";
</script>

<div class="w-full h-full p-5 flex flex-col items-end">
  {#each $messages as message}
    <Message text={message} />
  {/each}
</div>
