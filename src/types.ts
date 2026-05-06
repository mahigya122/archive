export type Theme = 'light' | 'dark';

export type ArchiveContextType = {
  archive: string[];
  theme: Theme;
  setQuery: (query: string) => void
 
}
export type postItem = {
  text1: string;
  text2: string;
  data: number;
}
export type Store = {
  id: string;
 
};