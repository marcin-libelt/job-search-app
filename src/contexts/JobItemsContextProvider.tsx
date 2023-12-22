import React, { createContext, useCallback, useMemo, useState } from "react";
import { JobItem, PaginationDirection, SortBy } from "../lib/types";
import { PAGINATION_PAGE_COUNT } from "../lib/constants";
import { useSearchQuery, useSearchTextContext } from "../lib/hooks";

type JobItemsContextType = {
  totalNumberOfPages: number;
  totalNumberOfResults: number;
  handleSort: (sortBy: SortBy) => void;
  handleChangePage: (direction: PaginationDirection) => void;
  sortBy: SortBy;
  jobItemsSortedAndSliced: JobItem[];
  isLoading: boolean;
  currentPage: number;
};

export const JobItemsContext = createContext<JobItemsContextType | null>(null);

export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Other context dependency
  const { debounceSearchText } = useSearchTextContext();

  // state
  const [currentPage, setCurrentPage] = useState(1);
  const { jobItems, isLoading } = useSearchQuery(debounceSearchText);
  const [sortBy, setSortBy] = useState<SortBy>("relevance");

  // computed
  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = Math.ceil(
    totalNumberOfResults / PAGINATION_PAGE_COUNT
  );
  const jobItemsSorted = useMemo(
    () =>
      [...(jobItems || [])].sort((a, b) => {
        if (sortBy === "relevance") {
          return b.relevanceScore - a.relevanceScore;
        } else {
          return a.daysAgo - b.daysAgo;
        }
      }),
    [sortBy, jobItems]
  );

  const jobItemsSortedAndSliced = useMemo(
    () =>
      jobItemsSorted?.slice(
        currentPage * PAGINATION_PAGE_COUNT - PAGINATION_PAGE_COUNT,
        currentPage * PAGINATION_PAGE_COUNT
      ),
    [jobItemsSorted, currentPage]
  );

  // event handlers

  const handleChangePage = useCallback((direction: PaginationDirection) => {
    if (direction === "previous") {
      setCurrentPage((page) => page - 1);
    } else if (direction === "next") {
      setCurrentPage((page) => page + 1);
    }
  }, []);

  const handleSort = useCallback((sortBy: SortBy) => {
    setCurrentPage(1);
    setSortBy(sortBy);
  }, []);

  const contextValue = useMemo(
    () => ({
      totalNumberOfPages,
      totalNumberOfResults,
      handleSort,
      handleChangePage,
      sortBy,
      jobItemsSortedAndSliced,
      isLoading,
      currentPage,
    }),
    [
      totalNumberOfPages,
      totalNumberOfResults,
      handleSort,
      handleChangePage,
      sortBy,
      jobItemsSortedAndSliced,
      isLoading,
      currentPage,
    ]
  );

  return (
    <JobItemsContext.Provider value={contextValue}>
      {children}
    </JobItemsContext.Provider>
  );
}
