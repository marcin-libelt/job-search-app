import JobList from "./JobList";
import { forwardRef, useContext } from "react";
import {
  BookmarksContext,
  BookmarksContextType,
} from "../contexts/BookmarksContextProvider";

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const { bookmarkedJobItems, isLoading } = useContext(
    BookmarksContext
  ) as BookmarksContextType;

  return (
    <div className="bookmarks-popover" ref={ref}>
      <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />
    </div>
  );
});

export default BookmarksPopover;
