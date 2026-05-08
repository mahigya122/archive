import React from "react";
import { useArchive } from "../context/postContext";
import { useTheme } from "../context/themeContext";
import { Sun, Moon, Atom } from "@phosphor-icons/react";
import type { SourceFilterType } from "../type";

const Header: React.FC = () => {
  const { query, sourceFilter, setQuery, setSourceFilter, clearPosts, totalResults } = useArchive();
  const { theme, toggleTheme } = useTheme();
  //const postToDisplay = query ? totalResults : posts.length;
  const postToDisplay = totalResults;

  return (
    <header className="w-full bg-surface border-b border-border px-6 py-3 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-accent/10 p-1.5 rounded-lg text-accent">
            <Atom size={28} weight="duotone" />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-text-strong uppercase">
            The Atomic <span className="text-primary">Archive</span>
          </h1>
        </div>

        <div className="flex items-center gap-2 px-4 py-1.5 bg-surface-soft rounded-full border border-border shrink-0">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-bold text-text-muted uppercase tracking-tighter">
            {postToDisplay} atomic posts found
          </span>
        </div>


         {/* Search & Dropdown Box container */}
        <div className="flex-1 max-w-md mx-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-2/3 bg-surface-soft border border-border rounded-lg px-4 py-2 test-sm text-text-strong placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all "
          />

        {/* Dropdown Menu element connected to Context */}
        <select
        value ={sourceFilter}
        onChange= {(e) => setSourceFilter(e.target.value as SourceFilterType)}
        className="w-2/3 bg-surface-soft border border-border rounded-lg px-3 py-2 text-sm text-text-strong cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all "
        >
          <option value="user">My Posts</option>
          <option value="archive">Archive</option>
          <option value="all">All Posts</option>
        </select>
        </div>


        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={clearPosts}
            className="px-4 py-2 bg-primary hover:bg-primary-strong text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-95"
          >
            Clear posts
          </button>

          <button
            onClick={toggleTheme}
            aria-label="toggle theme"
            className="p-2 hover:bg-surface-soft text-text-strong border border-border rounded-lg transition-colors"
          >
            {theme === "light" ? <Moon size={20} weight="fill" /> : <Sun size={20} weight="fill" />}
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;