<script lang="ts">
  import { fly } from "svelte/transition";

  export let text: string;
</script>

<div
  class="w-1/3 h-24 variant-filled-primary p-4 mt-4 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl"
  in:fly={{ y: 50, duration: 1000 }}
>
  {text}
</div>
