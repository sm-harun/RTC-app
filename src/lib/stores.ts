import { writable } from "svelte/store";

export type Variant = "sent" | "recieved" | "notification";
export type message = {
  type: Variant,
  text: string,
}

export const messages = writable<message[]>([{ type: "notification", text: "Conversation Started" }]);
export const username = writable("{ unset }");
export const id = writable(" connecting... ");
