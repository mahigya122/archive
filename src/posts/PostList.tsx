import { useArchive } from "../context/postContext";

export default function PostList() {
  const { posts ,query, filteredPosts} = useArchive();
  const postToDisplay = query ? filteredPosts : posts;
  
  if (posts.length === 0) { 
    return (
      <section className="px-8">
        <p className="text-gray-500">
          No posts created yet.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4 px-8">
      <h2 className="text-2xl font-bold text-text-strong">
        Published Posts
      </h2>

      {postToDisplay.map((post) => (
        <div
          key={post.id}
          className="rounded border border-border bg-surface p-4 shadow"
        >
          <h3 className="text-xl font-semibold text-text-strong">
            {post.text}
          </h3>

          <p className="text-text-muted">
            {post.description}
          </p>
        </div>
      ))}
    </section>
  );
  }