import { createContext } from "react";

import { useLocalStorage } from "../lib/hooks";

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
  const [bookmarkIds, setBookmarksIds] = useLocalStorage<number[]>(
    "bookmarsksIds",
    []
  );

  // event handlers
  const handleToggleBookmark = (id: number) => {
    if (bookmarkIds.includes(id)) {
      setBookmarksIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarksIds((prev) => [...prev, id]);
    }
  };

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
