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
deletePost: (id: string) => void;

filteredUserPosts: PostItem[];    
filteredArchivePosts: PostItem[];
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
    case "DELETE_POST":
      return {...state, posts: state.posts.filter(
      (post) => post.id !== action.payload
    ),
  };  
    default:
      return state;
  }
}

export function ArchiveProvider({children,} : { children: React.ReactNode }) {
const [state, dispatch] = useReducer(ArchiveReducer, initialState);
   
  const lowerQuery = state.query.toLowerCase();

  const filteredUserPosts = state.posts.filter((post) =>
      post.text.toLowerCase().includes(lowerQuery) ||
      post.description.toLowerCase().includes(lowerQuery)
  );

  const filteredArchivePosts = state.archive.filter((post) =>
      post.text.toLowerCase().includes(lowerQuery) ||
      post.description.toLowerCase().includes(lowerQuery)
  );

  const totalResults =
  state.sourceFilter === "all"
    ? filteredUserPosts.length + filteredArchivePosts.length
    : state.sourceFilter === "user"
    ? filteredUserPosts.length
    : filteredArchivePosts.length;

  const setQuery = (query: string) => 
    dispatch({ type: "SET_QUERY", payload: query });

  const setSourceFilter = (filter: SourceFilterType) =>
    dispatch({ type: "SET_SOURCE_FILTER", payload: filter });

  const addPost = (text: string, description: string) => 
    dispatch({ type: "ADD_POST", payload: { text, description } });

  const deletePost = (id: string) =>
    dispatch({ type: "DELETE_POST", payload: id,});

  const clearPosts = () => 
    dispatch({ type: "CLEAR_POSTS" });
  

    return(
        <ArchiveContext.Provider value={{ 
            ...state,filteredUserPosts, filteredArchivePosts, totalResults, setSourceFilter, setQuery, addPost, clearPosts, deletePost
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