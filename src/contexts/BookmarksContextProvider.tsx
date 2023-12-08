import { createContext } from "react";
import { useLocalStorage } from "../lib/hooks";

type BookmarksContextProviderProps = {
  children: React.ReactNode;
};

export type BookmarksContext = {
  bookmarkedIds: number[];
  handleToggleBookmark: (id: number) => void;
};

export const BookmarksContext = createContext<BookmarksContext | null>(null);

export default function BookmarksContextProvider({
  children,
}: BookmarksContextProviderProps) {
  // state
  const [bookmarkedIds, setBookmarksIds] = useLocalStorage<number[]>(
    "bookmarsksIds",
    []
  );

  // event handlers
  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarksIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarksIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedIds,
        handleToggleBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
