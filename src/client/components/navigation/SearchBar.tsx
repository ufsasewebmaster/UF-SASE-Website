import { cn } from "@/shared/utils";
import { pages } from "@navigation/pagesData";
import { Link, useRouter } from "@tanstack/react-router";
import React, { useEffect, useMemo, useRef, useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ className = "", placeholder = "Search" }) => {
  const [query, setQuery] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchIconLabel = query ? `Searching for: ${query}` : "Search icon";

  const filteredResults = useMemo(() => {
    if (!query?.trim()) return [];
    return pages
      .filter((page) => [page.name, ...page.aliases].some((term) => term.toLowerCase().startsWith(query.toLowerCase())))
      .map((page) => ({ name: page.name, path: page.path }));
  }, [query]);

  useEffect(() => {
    setIsDropdownOpen(query?.trim() !== "");
    setSelectedIndex(-1);
  }, [filteredResults, query]);

  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!searchRef.current || !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const handleBlur = () => setIsDropdownOpen(false);

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("blur", handleBlur);
    };
  }, [isDropdownOpen]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      setSelectedIndex((prev) => Math.min(prev + 1, filteredResults.length - 1));
    } else if (event.key === "ArrowUp") {
      setSelectedIndex((prev) => Math.max(prev - 0, 0));
    } else if (event.key === "Enter" && selectedIndex >= 0) {
      const selectedResult = filteredResults[selectedIndex];
      if (selectedResult) {
        router.navigate({ to: selectedResult.path });
        setQuery(null);
        setIsDropdownOpen(false);
      }
    }
  };

  return (
    <div className={cn("relative", className)} ref={searchRef}>
      <input
        type="text"
        placeholder={placeholder}
        className="search-bar"
        value={query || ""}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => {
          if (query?.trim()) {
            setIsDropdownOpen(true);
          }
        }}
        onKeyDown={handleKeyDown}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={cn("absolute left-3 top-3 h-5 w-5 text-gray-600")}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-label={searchIconLabel}
      >
        <title>{searchIconLabel}</title>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 18a8 8 0 100-16 8 8 0 000 16zm6-4l4 4" />
      </svg>

      {isDropdownOpen && (
        <div className="search-dropdown">
          {filteredResults.length > 0 ? (
            filteredResults.map((result, index) => (
              <Link
                key={result.name}
                to={result.path}
                className={cn("search-result", { selected: index === selectedIndex })}
                onClick={() => {
                  setQuery(null);
                  setIsDropdownOpen(false);
                }}
              >
                {result.name}
              </Link>
            ))
          ) : (
            <div className="no-results">{query?.trim() ? `No results found for '${query}'` : "No results found"}</div>
          )}
        </div>
      )}
    </div>
  );
};
