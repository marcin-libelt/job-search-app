import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useEffect, useRef, useState } from "react";

export default function BookmarksButton() {
  // state
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // effects
  useEffect(() => {
    const handleClick = (ev: MouseEvent) => {
      if (
        ev.target instanceof HTMLElement &&
        !buttonRef.current?.contains(ev.target) &&
        !popoverRef.current?.contains(ev.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <section>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="bookmarks-btn"
      >
        Bookmarks {isOpen ? <TriangleUpIcon /> : <TriangleDownIcon />}
      </button>
      {isOpen && <BookmarksPopover ref={popoverRef} />}
    </section>
  );
}
