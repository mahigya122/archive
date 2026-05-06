import React from "react";
import { useArchive } from "../context/archiveContext";
import { Sun, Moon } from "@phosphor-icons/react";


const Header: React.FC = () => {
  const { totalResults, query, setQuery, theme, toggleTheme } = useArchive();

function handleSearch(e: React.FormEvent) {
  e.preventDefault();
  // Implement search logic here, e.g., filter archive based on query
}  

  return (
    <div className="flex w-full items-center justify-between gap-4 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 p-4 text-white shadow-lg">
      <h1 
        className="text-3xl font-bold tracking-wid cursor-pointer">
        The Archive
      </h1>

      <button onClick={toggleTheme} aria-label= "toggleTheme">
        { theme==='light' ? < Moon size={24}/> : <Sun size={24} />}
        </button>

      <form onSubmit={handleSearch} className="searchbox"></form>
      <input
        type="text"
        placeholder="Search archive..."
        className="w-full max-w-sm rounded bg-white px-3 py-2 text-black placeholder:text-gray-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      <p className="text-sm whitespace-nowrap text-white">
        Results: {totalResults}
      </p>
    </div>
  );
}

export default Header;