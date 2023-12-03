import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";

type BookmarkIconProps = {
  id: number;
};

export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { bookmarkIds, handleToggleBookmark } = useContext(BookmarksContext);
  console.log(bookmarkIds);
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
        className={`${bookmarkIds.includes(id) && "filled"}`}
      />
    </button>
  );
}
