<script lang="ts">
  import "../app.postcss";

  import {
    AppShell,
    AppBar,
    initializeStores,
    Modal,
    Drawer,
    getModalStore,
    getDrawerStore,
    LightSwitch,
    type ModalSettings,
  } from "@skeletonlabs/skeleton";

  import NavItems from "$lib/components/NavItems.svelte";
  import { username } from "$lib/stores";

  initializeStores();

  let modalStore = getModalStore();
  let drawerStore = getDrawerStore();

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

  function toggleDrawer(status: boolean) {
    if (status == true) {
      drawerStore.open();
    } else {
      drawerStore.close();
    }
  }
</script>

<Modal />
<Drawer width="w-96">
  <div class="h-full w-full p-4 pt-8 relative">
    <NavItems {changeUsername} />
    <button class="absolute top-4 left-4" on:click={() => toggleDrawer(false)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-7"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
</Drawer>

<!-- svelte-ignore illegal-attribute-character -->
<AppShell
  slotSidebarLeft="w-0 md:w-80 variant-filled-surface"
  slotPageFooter="h-16 variant-filled-primary"
>
  <svelte:fragment slot="header">
    <AppBar slotLead="md:hidden" slotTrail="ml-auto">
      <svelte:fragment slot="lead"
        ><button on:click={() => toggleDrawer(true)}
          ><svg
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
          </svg>
        </button>
      </svelte:fragment>
      <h1 class="text-2xl text-primary-500">RTC App</h1>
      <svelte:fragment slot="trail">
        <a
          href="https://github.com/sm-harun"
          class="btn variant-ghost-primary hidden md:block"
        >
          <span>Github</span>
        </a>
        <a
          href="https://github.com/sm-harun/RTC-app"
          class="btn variant-ghost hidden md:block"
        >
          <span>Repository</span>
        </a>
        <span class="md:hidden">
          <LightSwitch />
        </span>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>

  <svelte:fragment slot="sidebarLeft">
    <NavItems {changeUsername} />
  </svelte:fragment>

  <slot />
</AppShell>
