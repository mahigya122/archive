import { createContext, useContext, useEffect, useReducer} from "react";
import {faker} from "@faker-js/faker";
import type { ArchiveAction } from "../type";

export interface PostItem {
  id: string;
  text: string;
  description: string;
}
export interface ArchiveState {
  posts: PostItem[];
  archive: PostItem[];
  query: string;
  theme: 'light' | 'dark';
}
interface ArchiveContextType extends ArchiveState {
setQuery: (query: string) => void;
toggleTheme: () => void;
addPost: (text: string, description: string) => void;
clearPosts: () => void;
filteredPosts: PostItem[];
totalResults: number;
}   

const ArchiveContext = createContext<ArchiveContextType | undefined>(undefined);

function createRandomPost() {
  return {
    id: faker.string.uuid(),
    text: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    description: faker.hacker.phrase(),
  };
}

const initialArchive = faker.helpers.multiple(createRandomPost, { count: 100 });

const initialState: ArchiveState = {
  posts: [],
  archive: initialArchive,
  theme: 'light',
  query: "",
};

function ArchiveReducer( state: ArchiveState, action: ArchiveAction): ArchiveState {
  switch (action.type) {
    case "ADD_POST":
      const newPost: PostItem = {
        id: faker.string.uuid(),
        text: action.payload.text,
        description: action.payload.description,
      };
      return { ...state, posts: [...state.posts, newPost] };  
    case "CLEAR_POSTS":
      return { ...state, posts: [] }; 
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };    
    default:
      return state;
  }
}

export function ArchiveProvider({   
    children,
} : { children: React.ReactNode }) {

  const [state, dispatch] = useReducer(ArchiveReducer, initialState);

  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    }, [state.theme]);
  
  const setQuery = (query: string) => 
    dispatch({ type: "SET_QUERY", payload: query });
  const toggleTheme = () => 
    dispatch({ type: "TOGGLE_THEME" });
  const addPost = (text: string, description: string) => 
    dispatch({ type: "ADD_POST", payload: { text, description } });
  const clearPosts = () => 
    dispatch({ type: "CLEAR_POSTS" });
  
  const filteredPosts = state.posts.filter((post) =>
    post.text.toLowerCase().includes(state.query.toLowerCase()) ||
    post.description.toLowerCase().includes(state.query.toLowerCase())
  );

    return(
        <ArchiveContext.Provider value={{ 
            ...state,filteredPosts, totalResults: filteredPosts.length, toggleTheme, setQuery, addPost, clearPosts
            }}>
          {children}
        </ArchiveContext.Provider>
    )
  }

   export function useArchive() {
    const context = useContext(ArchiveContext);
    if (!context){ 
        throw new Error("useArchive must be used within an ArchiveProvider");
    }
    return context;
  }