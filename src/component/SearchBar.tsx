import { useArchive } from "../context/postContext";
import type { SourceFilterType } from "../type";

export const SearchBar = () => {
    const { sourceFilter, setSourceFilter } = useArchive();

 return (
    <div className="flex items-center gap-3">
    <select
      value={sourceFilter}
      onChange={(e) => setSourceFilter(e.target.value as SourceFilterType)}
      className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="all">All Posts</option>
      <option value="user">My Posts</option>
      <option value="archive">Archived Posts</option>
    </select>
  </div>
)};