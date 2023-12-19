import { createContext, useState } from "react";
import { useDebounce } from "../lib/hooks";

export const JobItemsContext = createContext(null);

export default function JobItemsContextProvider({ children }) {
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
