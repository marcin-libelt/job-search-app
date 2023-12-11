import JobList from "./JobList";
import { useContext } from "react";
import {
  BookmarksContext,
  BookmarksContextType,
} from "../contexts/BookmarksContextProvider";

export default function BookmarksPopover() {
  const { bookmarkedJobItems, isLoading } = useContext(
    BookmarksContext
  ) as BookmarksContextType;

  return (
    <div className="bookmarks-popover">
      <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />
    </div>
  );
}
