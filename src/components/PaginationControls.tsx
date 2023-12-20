import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useJobItemsContext } from "../lib/hooks";

type PaginationButtonProps = {
  direction: string;
  currentPage: number;
  onClick: () => void;
};

export default function Pagination() {
  const { totalNumberOfPages, currentPage, handleChangePage } =
    useJobItemsContext();

  return (
    <section className="pagination">
      {currentPage > 1 ? (
        <PaginationButton
          direction={"previous"}
          currentPage={currentPage}
          onClick={() => handleChangePage("previous")}
        />
      ) : (
        <span />
      )}

      {currentPage < totalNumberOfPages && (
        <PaginationButton
          direction={"next"}
          currentPage={currentPage}
          onClick={() => handleChangePage("next")}
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
