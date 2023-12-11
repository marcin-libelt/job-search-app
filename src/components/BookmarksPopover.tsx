import JobList from "./JobList";
import { forwardRef, useContext } from "react";
import {
  BookmarksContext,
  BookmarksContextType,
} from "../contexts/BookmarksContextProvider";
import { createPortal } from "react-dom";

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const { bookmarkedJobItems, isLoading } = useContext(
    BookmarksContext
  ) as BookmarksContextType;

  return createPortal(
    <div className="bookmarks-popover" ref={ref}>
      <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />
    </div>,
    document.body
  );
});

export default BookmarksPopover;
