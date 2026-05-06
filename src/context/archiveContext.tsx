import { createContext, useContext, useState } from "react";

export interface ArchiveContextType {
  query: string;
  setQuery: (query: string) => void;
  totalResults: number;  
  archive: string[];
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}   

const ArchiveContext = createContext<ArchiveContextType | undefined>(undefined);

export const ArchiveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [archive, setArchive] = useState<string[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');  
  const [query, setQuery] = useState("");
  const [totalResults, setTotalResults] = useState(0);    

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

    return(
        <ArchiveContext.Provider value={{ archive, theme, toggleTheme, query, setQuery, totalResults }}>
          {children}
        </ArchiveContext.Provider>
    )
  }

   export function useArchive() : ArchiveContextType{
    const context = useContext(ArchiveContext);
    if (!context) throw new Error("useArchive must be used within an ArchiveProvider");
    return context;
  }