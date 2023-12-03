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
import { useDebounce, useJobItems } from "../lib/hooks";
import { Toaster } from "react-hot-toast";
import { PAGINATION_PAGE_COUNT } from "../lib/constants";

function App() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debounceSearchText = useDebounce<string>(searchText);
  const { jobItems, isLoading } = useJobItems(debounceSearchText);

  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = Math.ceil(
    totalNumberOfResults / PAGINATION_PAGE_COUNT
  );

  const jobItemsSliced =
    jobItems?.slice(
      currentPage * PAGINATION_PAGE_COUNT - PAGINATION_PAGE_COUNT,
      currentPage * PAGINATION_PAGE_COUNT
    ) || [];

  // Structure looks to complex
  // TODO: consider Redux or Context at least

  const handleChangePage = (direction: "next" | "previous") => {
    if (direction === "previous") {
      setCurrentPage((page) => page - 1);
    } else if (direction === "next") {
      setCurrentPage((page) => page + 1);
    }
  };

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
            <SortingControls />
          </SidebarTop>
          <JobList jobItems={jobItemsSliced} isLoading={isLoading} />
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
