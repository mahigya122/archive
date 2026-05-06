import type { Store } from "./types";

const STORAGE_KEY = "archiveAppStore";
 
export function saveStore(store: Store) {                           
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store)); 
}