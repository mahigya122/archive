import { useArchive } from "../context/postContext";
import { useState } from "react";

export default function PostArchive() {
  const { archive, addPost } = useArchive();
  const [showArchive, setShowArchive] = useState(true);


  return (
    <section className="max-w-[1400px] mx-auto p-6 space-y-6">

    <div className="flex items-center justify-between border-b border-border pb-4">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-black text-text-strong uppercase tracking-tighter">
          Post <span className="text-primary">Archive</span>
        </h2>
        <div className="h-4 w-px bg-border" />
        <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">History</span>
      </div>

     <button
          onClick={() => setShowArchive((prev) => !prev)}
          className="text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-lg bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary-strong transition-all active:scale-95"
        >
          {showArchive ? "Hide archive posts" : "Show archive posts"}
        </button>
      </div>

    {showArchive && (
      <div className="grid gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
        {archive.map((post) => (
          <div
            key={post.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-border p-5 rounded-xl bg-surface/40 hover:bg-surface hover:border-primary/30 transition-all gap-4 group"
          >
            <div className = "flex-1 space-y-1">
              <h3 className="text-lg font-bold text-text-strong group-hover:text-primary transition-colors">
                {post.text}
              </h3>
              <p className="text-sm text-text-muted line-clamp-2">
                {post.description}
              </p>
            </div>

          <button 
                onClick={() => addPost(post.text, post.description)}
                className="shrink-0 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all"
              >
                Restore post
              </button>
              </div>
        ))}
      </div>
    )}

    </section>
  );
  }