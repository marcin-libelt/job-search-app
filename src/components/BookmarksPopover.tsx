import JobList from "./JobList";
import { forwardRef, useContext } from "react";
import {
  BookmarksContext,
  BookmarksContextType,
} from "../contexts/BookmarksContextProvider";
import { createPortal } from "react-dom";
import BookmarksEmptyMessage from "./BookmarksEmptyMessage";

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const { bookmarkedJobItems, isLoading } = useContext(
    BookmarksContext
  ) as BookmarksContextType;

  const hasJobItems = bookmarkedJobItems.length > 0;

  return createPortal(
    <div className="bookmarks-popover" ref={ref}>
      {!hasJobItems && <BookmarksEmptyMessage />}
      {hasJobItems && (
        <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />
      )}
    </div>,
    document.body
  );
});

export default BookmarksPopover;
