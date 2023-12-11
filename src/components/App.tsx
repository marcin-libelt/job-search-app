import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import Pagination from "./PaginationControls";
import JobList from "./JobList";
import { useDebounce, useSearchQuery } from "../lib/hooks";
import { Toaster } from "react-hot-toast";
import { PAGINATION_PAGE_COUNT } from "../lib/constants";
import { PaginationDirection, SortBy } from "../lib/types";

function App() {
  // state
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debounceSearchText = useDebounce<string>(searchText);
  const { jobItems, isLoading } = useSearchQuery(debounceSearchText);
  const [sortBy, setSortBy] = useState<SortBy>("relevance");

  // computed
  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = Math.ceil(
    totalNumberOfResults / PAGINATION_PAGE_COUNT
  );
  const jobItemsSorted = jobItems?.sort((a, b) => {
    if (sortBy === "relevance") {
      return b.relevanceScore - a.relevanceScore;
    } else {
      return a.daysAgo - b.daysAgo;
    }
  });
  const jobItemsSortedAndSliced =
    jobItemsSorted?.slice(
      currentPage * PAGINATION_PAGE_COUNT - PAGINATION_PAGE_COUNT,
      currentPage * PAGINATION_PAGE_COUNT
    ) || [];

  // event handlers

  const handleChangePage = (direction: PaginationDirection) => {
    if (direction === "previous") {
      setCurrentPage((page) => page - 1);
    } else if (direction === "next") {
      setCurrentPage((page) => page + 1);
    }
  };

  const handleSort = (sortBy: SortBy) => {
    setCurrentPage(1);
    setSortBy(sortBy);
  };

  // Structure looks to complex
  // TODO: consider Redux or Context at least
  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalNumberOfResults={totalNumberOfResults} />
            <SortingControls onSort={handleSort} sortBy={sortBy} />
          </SidebarTop>
          <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />
          <Pagination
            currentPage={currentPage}
            onChangePage={handleChangePage}
            totalNumberOfPages={totalNumberOfPages}
          />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
