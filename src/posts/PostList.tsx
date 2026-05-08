import { useArchive } from "../context/postContext";

export default function PostList() {
  const { filteredUserPosts, sourceFilter, deletePost } = useArchive();

  if (sourceFilter !== "archive" && filteredUserPosts.length === 0) {
    return (
      <section className="px-8">
        <p className="text-gray-500">No posts created yet.</p>
      </section>
    );
  }

  if (sourceFilter === "archive") {
    return null;
  }

  return (
    <section className="space-y-4 px-8">
      <h2 className="text-2xl font-bold text-text-strong">Published Posts</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUserPosts.map((post) => (
          <div
            key={post.id}
            className="flex items-start justify-between rounded border border-border bg-surface p-4 shadow"
          >
            <div>
              <h3 className="text-xl font-semibold text-text-strong">
                {post.text}
              </h3>

              <p className="text-text-muted">{post.description}</p>

              {post.image instanceof File && (
                <div className="mt-3 max-w-md overflow-hidden rounded-lg border border-border">
                  <img
                    src={URL.createObjectURL(post.image)}
                    alt={post.text}
                    className="w-full h-auto object-cover max-h-64"
                  />
                </div>
              )}
              <button
                onClick={() => deletePost(post.id)}
                className=" mt-3 px-3 py-1 text-xs font-bold rounded bg-red-500 text-white hover:bg-red-600 transition"
              >
                Delete Post
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
