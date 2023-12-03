import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { PaginationDirection } from "../lib/types";

type PaginationProps = {
  currentPage: number;
  onChangePage: (direction: PaginationDirection) => void;
  totalNumberOfPages: number;
};

type PaginationButtonProps = {
  direction: string;
  currentPage: number;
  onClick: () => void;
};

export default function Pagination({
  currentPage,
  onChangePage,
  totalNumberOfPages,
}: PaginationProps) {
  return (
    <section className="pagination">
      {currentPage > 1 ? (
        <PaginationButton
          direction={"previous"}
          currentPage={currentPage}
          onClick={() => onChangePage("previous")}
        />
      ) : (
        <span />
      )}

      {currentPage < totalNumberOfPages && (
        <PaginationButton
          direction={"next"}
          currentPage={currentPage}
          onClick={() => onChangePage("next")}
        />
      )}
    </section>
  );
}

function PaginationButton({
  direction,
  currentPage,
  onClick,
}: PaginationButtonProps) {
  return (
    <button
      className="pagination__button"
      onClick={(ev) => {
        ev.currentTarget.blur();
        onClick();
      }}
    >
      {direction === "previous" && (
        <>
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </>
      )}
      {direction === "next" && (
        <>
          Page {currentPage + 1}
          <ArrowRightIcon />
        </>
      )}
    </button>
  );
}
