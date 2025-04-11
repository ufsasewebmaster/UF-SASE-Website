import { cn } from "@/shared/utils";
// import { pages } from "@navigation/pagesData";
import { Link, useRouter } from "@tanstack/react-router";
import type { FuseResult } from "fuse.js";
import Fuse from "fuse.js";
import React, { useEffect, useMemo, useRef, useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

interface MetaProps {
  path: string;
  title: string;
  description: string;
}

const SearchIcon: React.FC<{ label: string }> = ({ label }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute left-3 top-3 h-5 w-5 text-gray-600")}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-label={label}
  >
    <title>{label}</title>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 18a8 8 0 100-16 8 8 0 000 16zm6-4l4 4" />
  </svg>
);

export const SearchBar: React.FC<SearchBarProps> = ({ className = "", placeholder = "Search" }) => {
  const [query, setQuery] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchIconLabel = query ? `Searching for: ${query}` : "Search icon";

  const routes = router.flatRoutes;
  const metaTagsList: Array<MetaProps> = [];

  routes.forEach((route) => {
    if (!route.options.meta) return;
    const meta = route.options.meta({
      matches: [],
      match: route.id,
      params: {},
      loaderData: null,
    });
    if (!meta) return;
    metaTagsList.push({
      path: route.id,
      title: meta[0]?.title || "",
      description: meta[1]?.content || "",
    });
  });

  const fuseOptions = {
    // isCaseSensitive: false,
    includeScore: true,
    // ignoreDiacritics: false,
    shouldSort: true,
    includeMatches: true,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    threshold: 0.6,
    distance: 200,
    // useExtendedSearch: true,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: ["title", "description"],
  };

  const fuse = new Fuse(metaTagsList, fuseOptions);

  const filteredResults: Array<FuseResult<MetaProps>> = useMemo(() => {
    if (!query?.trim()) return [];
    return fuse.search(query);
  }, [query]);

  // ONLY match words from text, found in input if EXACT match
  const highlightText = (input: string, text: string): JSX.Element => {
    const searchWords = input
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word.toLowerCase());

    const tokens = text.split(/(\b\w+\b)/);

    const parts = tokens.map((token, i) => {
      if (/^\w+$/.test(token) && searchWords.includes(token.toLowerCase())) {
        return <mark key={i}>{token}</mark>;
      }
      return <span key={i}>{token}</span>;
    });

    return <>{parts}</>;
  };

  useEffect(() => {
    setIsDropdownOpen(query?.trim() !== "");
    setSelectedIndex(-1);
  }, [query]);

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
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (event.key === "Enter" && selectedIndex >= 0) {
      const selectedResult = filteredResults[selectedIndex];
      if (selectedResult) {
        router.navigate({ to: selectedResult.item.path });
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
          if (query?.trim()) setIsDropdownOpen(true);
        }}
        onKeyDown={handleKeyDown}
      />
      <SearchIcon label={searchIconLabel} />
      {isDropdownOpen && query?.trim() && (
        <div className="search-dropdown">
          {filteredResults.length === 0 ? (
            <div className="px-2 py-1 text-sm text-gray-500">No entries found</div>
          ) : (
            filteredResults.map((res, index) => {
              const { item, matches } = res;
              // Extract match indices for title and description
              const titleMatch = matches?.find((m) => m.key === "title");
              const descMatch = matches?.find((m) => m.key === "description");

              return (
                <div
                  key={item.path}
                  className={cn("border-b px-2 py-1 last:border-b-0", {
                    "bg-blue-100": index === selectedIndex,
                  })}
                >
                  <Link
                    to={item.path}
                    className="block text-sm font-medium"
                    onClick={() => {
                      setQuery(null);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {titleMatch ? highlightText(query, item.title) : item.title}
                  </Link>
                  <div className="truncate text-xs text-gray-500">{descMatch ? highlightText(query, item.description) : item.description}</div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
