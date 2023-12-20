import { useJobItemsContext } from "../lib/hooks";

export default function SortingControls() {
  const { handleSort, sortBy } = useJobItemsContext();

  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortingButton
        isActive={"age" === sortBy}
        onClick={() => handleSort("age")}
      >
        Recent
      </SortingButton>
      <SortingButton
        isActive={"relevance" === sortBy}
        onClick={() => handleSort("relevance")}
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
