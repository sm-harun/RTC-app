<script lang="ts">
  import "../app.postcss";

  import {
    AppShell,
    initializeStores,
    Modal,
    getModalStore,
    type ModalSettings,
  } from "@skeletonlabs/skeleton";

  import NavItems from "$lib/components/NavItems.svelte";
  import { messages, username, id } from "$lib/stores";

  initializeStores();

  let modalStore = getModalStore();

  function changeUsername(): void {
    const modalSettings: ModalSettings = {
      type: "prompt",
      title: "Enter new name: ",
      valueAttr: { type: "text", minlength: 5, maxlength: 10, required: true },
      response: (r: string) => {
        username.set(r);
        modalStore.close();
      },
    };

    modalStore.trigger(modalSettings);
  }
</script>

<Modal />

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
    <div class="w-full h-full p-4 relative">
      <NavItems {changeUsername} />
      <div class="absolute bottom-4 left-4">
        <p>
          <strong>Name: </strong>
          <span class="text-primary-500">{$username}</span>
        </p>
        <p>
          <strong>ID: </strong>
          <span class="text-primary-500">{$id}</span>
        </p>
      </div>
    </div>
  </svelte:fragment>

  <slot />
</AppShell>
