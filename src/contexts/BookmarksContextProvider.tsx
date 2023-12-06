import { useState, createContext, useEffect } from "react";
import { BOOKMARKS_STORAGE_KEY } from "../lib/constants";

type BookmarksContextProviderProps = {
  children: React.ReactNode;
};
export const BookmarksContext = createContext<{
  bookmarkIds: number[];
  handleToggleBookmark: (id: number) => void;
} | null>(null);

export default function BookmarksContextProvider({
  children,
}: BookmarksContextProviderProps) {
  // state
  const [bookmarkIds, setBookmarksIds] = useState<number[]>(
    () => JSON.parse(localStorage.getItem(BOOKMARKS_STORAGE_KEY)) || []
  );

  // event handlers
  const handleToggleBookmark = (id: number) => {
    if (bookmarkIds.includes(id)) {
      setBookmarksIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarksIds((prev) => [...prev, id]);
    }
  };

  // effects
  useEffect(() => {
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarkIds));
  }, [bookmarkIds]);

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkIds,
        handleToggleBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
