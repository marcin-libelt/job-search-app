import { useEffect, useState } from "react";
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
import { useJobItems } from "../lib/hooks";

function App() {
  const [searchText, setSearchText] = useState("");
  const [jobItems, isLoading] = useJobItems(searchText);
  const [activeId, setActiveId] = useState<number | null>(null);

  // Structure looks to complex
  // TODO: consider Redux or Context at least

  useEffect(() => {
    const handleHashchange = () => {
      const id = +window.location.hash.slice(1);
      setActiveId(id);
    };
    window.addEventListener("hashchange", handleHashchange);

    return () => {
      window.removeEventListener("hashchange", handleHashchange);
    };
  }, []);

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
            <ResultsCount />
            <SortingControls />
          </SidebarTop>
          <JobList jobItems={jobItems} isLoading={isLoading} />
          <Pagination />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
