import { SortBy } from "../lib/types";

type SortingControls = {
  sortBy: SortBy;
  onSort: (type: SortBy) => void;
};
export default function SortingControls({ onSort, sortBy }: SortingControls) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button
        onClick={() => onSort("relevance")}
        className={`sorting__button sorting__button--relevant ${
          sortBy === "relevance" && "sorting__button--active"
        }`}
      >
        Relevant
      </button>

      <button
        onClick={() => onSort("age")}
        className={`sorting__button sorting__button--relevant ${
          sortBy === "age" && "sorting__button--active"
        }`}
      >
        Recent
      </button>
    </section>
  );
}
