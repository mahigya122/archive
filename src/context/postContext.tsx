import { createContext, useContext, useReducer} from "react";
import {faker} from "@faker-js/faker";
import type { ArchiveAction, SourceFilterType } from "../type";

export interface PostItem {
  id: string;
  text: string;
  description: string;
}

 export interface ArchiveState {
  posts: PostItem[];
  archive: PostItem[];
  query: string;
  sourceFilter: SourceFilterType;
}

interface ArchiveContextType extends ArchiveState {
setQuery: (query: string) => void;
setSourceFilter: (filter: SourceFilterType) => void;
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
  query: "",
  sourceFilter: "all",
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
    case "SET_SOURCE_FILTER":
      return { ...state, sourceFilter: action.payload };
    default:
      return state;
  }
}

export function ArchiveProvider({   
    children,
} : { children: React.ReactNode }) {

  const [state, dispatch] = useReducer(ArchiveReducer, initialState);

  let targetPosts : PostItem[] = [];

  if (state.sourceFilter === "all") {
    targetPosts = [...state.posts, ...state.archive];
  } else if (state.sourceFilter === "user") {
    targetPosts = state.posts;
  } else if (state.sourceFilter === "archive") {
    targetPosts = state.archive;
  }

  const filteredPosts = targetPosts.filter((post) => {
    const LowerQuery = state.query.toLowerCase();
    return (
      post.text.toLowerCase().includes(LowerQuery) ||
      post.description.toLowerCase().includes(LowerQuery)
    );
  });
  
  const setQuery = (query: string) => 
    dispatch({ type: "SET_QUERY", payload: query });

  const setSourceFilter = (filter: SourceFilterType) =>
    dispatch({ type: "SET_SOURCE_FILTER", payload: filter });

  const addPost = (text: string, description: string) => 
    dispatch({ type: "ADD_POST", payload: { text, description } });

  const clearPosts = () => 
    dispatch({ type: "CLEAR_POSTS" });
  

    return(
        <ArchiveContext.Provider value={{ 
            ...state,filteredPosts, totalResults: filteredPosts.length, setSourceFilter, setQuery, addPost, clearPosts
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