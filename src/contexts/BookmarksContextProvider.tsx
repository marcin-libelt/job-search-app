import { useState, createContext } from "react";

type BookmarksContextProviderProps = {
  children: React.ReactNode;
};
export const BookmarksContext = createContext(null);

export default function BookmarksContextProvider({
  children,
}: BookmarksContextProviderProps) {
  const [bookmarkIds, setBookmarksIds] = useState<number[]>([]);
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
