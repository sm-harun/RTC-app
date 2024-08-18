import { writable } from "svelte/store";
import { localStorageStore } from "@skeletonlabs/skeleton";

export type Variant = "sent" | "recieved" | "notification";
export type message = {
  type: Variant,
  text: string,
  user?: string
}

export const messages = writable<message[]>([{ type: "notification", text: "Conversation Started" }]);
export const username = localStorageStore("rtcusername", "{ unset }");
export const id = writable(" connecting... ");
