import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { databases } from "../appwrite/appwriteConfig";
import { Query } from "appwrite";

export default function SearchBar({ databaseId, collectionId, onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setIsLoading(true);
        const res = await databases.listDocuments(databaseId, collectionId, [
          Query.or([
            Query.search("title", query),
            Query.search("content", query),
          ]),
        ]);
        setResults(res.documents);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [query, databaseId, collectionId]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && results.length > 0) {
      onSelect && onSelect(results[0]);
    }
  };

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search posts..."
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
          bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white
          focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 
          focus:border-transparent"
      />

      {query && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {isLoading ? (
            <p className="p-3 text-gray-500 text-sm">Searching...</p>
          ) : results.length > 0 ? (
            results.map((post) => (
              <button
                key={post.$id}
                onClick={() => onSelect && onSelect(post)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100 cursor-pointer"
              >
                {post.title}
              </button>
            ))
          ) : (
            <p className="p-3 text-gray-500 text-sm">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
}
