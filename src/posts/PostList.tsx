import { useArchive } from "../context/archiveContext";

export default function PostList() {
  const { posts } = useArchive();

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
      <h2 className="text-2xl font-bold">
        Published Posts
      </h2>

      {posts.map((post) => (
        <div
          key={post.id}
          className="rounded border bg-white p-4 shadow"
        >
          <h3 className="text-xl font-semibold">
            {post.text}
          </h3>

          <p className="text-gray-700">
            {post.description}
          </p>
        </div>
      ))}
    </section>
  );
}