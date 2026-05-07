import { useArchive } from "../context/archiveContext";
import { useState } from "react";

export default function PostArchive() {
  const { archive } = useArchive();
  const [showArchive, setShowArchive] = useState(true);

  return (
    <section className="p-6 space-y-4">

    <div className="flex items-center justify-between">
    <h2 className="text-xl font-bold font-san text-gray-900 dark:text-white">Post Archive</h2>

     <button
          onClick={() => setShowArchive((prev) => !prev)}
          className="text-sm px-3 py-1 rounded bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {showArchive ? "Hide" : "Show"}
        </button>
      </div>

    {showArchive && (
      <div className="space-y-3">
        {archive.map((post) => (
          <div
            key={post.id}
            className="border p-4 rounded bg-white text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          >
            <h3 className="text-lg font-semibold">
              {post.text}
            </h3>
            <p>{post.description}</p>
          </div>
        ))}
      </div>
    )}

    </section>
  );
}