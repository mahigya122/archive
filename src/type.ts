export type ArchiveAction =
  | { type: "ADD_POST"; payload: { text: string; description: string } }
  | { type: "CLEAR_POSTS" }
  | { type: "SET_QUERY"; payload: string }
  | { type: "TOGGLE_THEME" };