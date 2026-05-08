export type SourceFilterType = "all" | "user" | "archive";

export type ArchiveAction =
  | { type: "ADD_POST"; payload: { text: string; description: string; image: File | null } }
  | { type: "CLEAR_POSTS" }
  | { type: "DELETE_POST"; payload:string }
  | { type: "SET_QUERY"; payload: string }
  | { type: "SET_SOURCE_FILTER"; payload: SourceFilterType };
