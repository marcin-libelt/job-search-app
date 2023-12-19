import React, { createContext, useState } from "react";
import { useDebounce } from "../lib/hooks";

type JobItemsContextType = {
  searchText: string;
  setSearchText: (searchText: string) => void;
  debounceSearchText: string;
};

export const JobItemsContext = createContext<JobItemsContextType | null>(null);

export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchText, setSearchText] = useState("");
  const debounceSearchText = useDebounce<string>(searchText);

  return (
    <JobItemsContext.Provider
      value={{
        searchText,
        setSearchText,
        debounceSearchText,
      }}
    >
      {children}
    </JobItemsContext.Provider>
  );
}
