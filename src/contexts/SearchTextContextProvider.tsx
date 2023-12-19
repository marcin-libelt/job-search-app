import React, { createContext, useState } from "react";
import { useDebounce } from "../lib/hooks";

type SearchTextContextType = {
  searchText: string;
  setSearchText: (searchText: string) => void;
  debounceSearchText: string;
};

export const SearchTextContext = createContext<SearchTextContextType | null>(
  null
);

export default function SearchTextContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchText, setSearchText] = useState("");
  const debounceSearchText = useDebounce<string>(searchText);

  return (
    <SearchTextContext.Provider
      value={{
        searchText,
        setSearchText,
        debounceSearchText,
      }}
    >
      {children}
    </SearchTextContext.Provider>
  );
}
