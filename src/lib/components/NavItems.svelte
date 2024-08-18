<script lang="ts">
  import { LightSwitch } from "@skeletonlabs/skeleton";
  import { username, id } from "$lib/stores";

  export let changeUsername: () => void;
</script>

<div class="w-full h-full p-4 relative">
  <nav>
    <h4 class="ml-4 text-2xl text-secondary-500"><strong>Settings</strong></h4>
    <ul class="mt-2">
      <button class="h-full w-full" on:click={changeUsername}>
        <li class="list-items group">
          <span>Change Name</span>
          <span class="group-hover:animate-spin"
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
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </span>
        </li>
      </button>
      <span class="hidden md:block">
        <li class="list-items">
          <span>Theme</span>
          <span class="rounded-xl">
            <LightSwitch />
          </span>
        </li>
      </span>
      <span class="md:hidden">
        <li class="list-items">
          <a href="https://github.com/sm-harun/RTC-app" class="w-full h-full">
            <span>Github</span>
          </a>
        </li>
      </span>
      <span class="md:hidden">
        <li class="list-items">
          <a href="https://github.com/sm-harun/RTC-app" class="w-full h-full">
            <span>Repository</span>
          </a>
        </li>
      </span>
    </ul>
  </nav>
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

<style>
  .list-items {
    @apply text-xl p-4 rounded-xl flex justify-between items-center hover:bg-secondary-500/20;
  }
</style>
