import { BookmarkFilledIcon } from "@radix-ui/react-icons";

export default function BookmarksEmptyMessage() {
  return (
    <div className="bookmark-btn bookmarks--empty">
      Search and click
      <BookmarkFilledIcon className="filled" height={30} width={30} />
      to bookmark
    </div>
  );
}
