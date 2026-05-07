import React from "react";
import { useArchive } from "../context/archiveContext";
import { Sun, Moon } from "@phosphor-icons/react";
import { Trash } from "lucide-react";


const Header: React.FC = () => {
  const { totalResults, query, setQuery, theme, toggleTheme, clearPosts } = useArchive();

  return (
    <header className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg px-6 py-4">

      <div className="flex items-center justify-between">

        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-wide">
            The Archive
          </h1>

          <span className="text-sm text-gray-300">
            {totalResults} results
          </span>
        </div>

        <div className="flex items-center gap-3">

          <input
            type="text"
            placeholder="Search archive..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-64 rounded-lg px-3 py-2 text-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={clearPosts}
            className="flex items-center gap-1 rounded bg-red-600 hover:bg-red-700 px-3 py-2 text-sm"
          >
            <Trash size={16} />
            Clear
          </button>

          <button
            onClick={toggleTheme}
            aria-label="toggle theme"
            className="rounded p-2 hover:bg-gray-700"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

        </div>

      </div>
    </header>
  );
};

export default Header;