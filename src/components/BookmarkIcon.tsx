import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import {
  BookmarksContext,
  BookmarksContextType,
} from "../contexts/BookmarksContextProvider";

type BookmarkIconProps = {
  id: number;
};

export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { bookmarkedIds, handleToggleBookmark } = useContext(
    BookmarksContext
  ) as BookmarksContextType;

  return (
    <button
      onClick={(ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        handleToggleBookmark(id);
      }}
      className="bookmark-btn"
    >
      <BookmarkFilledIcon
        className={`${bookmarkedIds.includes(id) && "filled"}`}
      />
    </button>
  );
}
