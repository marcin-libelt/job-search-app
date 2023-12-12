import JobList from "./JobList";
import { forwardRef } from "react";
import { createPortal } from "react-dom";
import BookmarksEmptyMessage from "./BookmarksEmptyMessage";
import { useBookmarksContext } from "../lib/hooks";

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const { bookmarkedJobItems, isLoading } = useBookmarksContext();

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
