export type SourceFilterType = "all" | "user" | "archive";

export type ArchiveAction =
  | { type: "ADD_POST"; payload: { text: string; description: string } }
  | { type: "CLEAR_POSTS" }
  | { type: "SET_QUERY"; payload: string }
  | { type: "SET_SOURCE_FILTER"; payload: SourceFilterType };
