import { createContext, useContext, useState } from "react";
import {faker} from "@faker-js/faker";


export interface PostItem {
  id: string;
  text: string;
  description: string;
}

interface ArchiveContextType {
posts: PostItem[];
archive: PostItem[];
query: string;
theme: 'light' | 'dark';
totalResults: number;

setQuery: (query: string) => void;
toggleTheme: () => void;
addPost: (text: string, description: string) => void;
clearPosts: () => void;
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

export function ArchiveProvider ({
    children,
} : { children: React.ReactNode }) {
  const [archive] = useState<PostItem[]>(initialArchive);
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');  
  const [query, setQuery] = useState("");
  

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  function addPost(text: string, description: string) {
    const newPost: PostItem = {
      id: faker.string.uuid(),
      text,
      description,
    };

    setPosts((prevPosts) => [...prevPosts, newPost]);
}

  function clearPosts() {
    setPosts([]);
  }
  
  const filteredArchive = archive.filter((post) =>
    post.text.toLowerCase().includes(query.toLowerCase()) ||
    post.description.toLowerCase().includes(query.toLowerCase())
  );


    return(
        <ArchiveContext.Provider value={{ 
            posts, archive: filteredArchive, theme, toggleTheme, query, setQuery, totalResults: filteredArchive.length, addPost, clearPosts
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