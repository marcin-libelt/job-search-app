import { SortBy } from "../lib/types";

type SortingControls = {
  sortBy: SortBy;
  onSort: (sortBy: SortBy) => void;
};
export default function SortingControls({ onSort, sortBy }: SortingControls) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortingButton isActive={"age" === sortBy} onClick={() => onSort("age")}>
        Recent
      </SortingButton>
      <SortingButton
        isActive={"relevance" === sortBy}
        onClick={() => onSort("relevance")}
      >
        Relevant
      </SortingButton>
    </section>
  );
}
type SortingButtonProps = {
  isActive: boolean;
  children: React.ReactNode;
  onClick: () => void;
};
function SortingButton({ children, isActive, onClick }: SortingButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`sorting__button sorting__button--relevant ${
        isActive && "sorting__button--active"
      }`}
    >
      {children}
    </button>
  );
}
