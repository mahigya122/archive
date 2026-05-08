import { useArchive } from "../context/postContext";

export default function PostList() {
  const { filteredUserPosts, sourceFilter, deletePost } = useArchive();


   if (
    sourceFilter !== "archive" &&
    filteredUserPosts.length === 0
  ) {
    return (
      <section className="px-8">
        <p className="text-gray-500">
          No posts created yet.
        </p>
      </section>
    );
  }

   if (sourceFilter === "archive") {
    return null;
  }

  return (
    <section className="space-y-4 px-8">
      <h2 className="text-2xl font-bold text-text-strong">
        Published Posts
      </h2>

       {filteredUserPosts.map((post) => ( 
        <div
          key={post.id}
          className="flex items-start justify-between rounded border border-border bg-surface p-4 shadow"
        >
          <div>
          <h3 className="text-xl font-semibold text-text-strong">
            {post.text}
          </h3>

          <p className="text-text-muted">
            {post.description}
          </p>
          </div>

          <button
           onClick={() => deletePost(post.id)}
           className="mt-3 px-3 py-1 text-xs font-bold rounded bg-red-500 text-white hover:bg-red-600 transition"
          >
          Delete Post
         </button>
         </div>
      ))} 
    </section>
  );
  }