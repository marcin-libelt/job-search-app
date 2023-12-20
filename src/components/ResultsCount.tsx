import { useJobItemsContext } from "../lib/hooks";

export default function ResultsCount() {
  const { totalNumberOfResults } = useJobItemsContext();

  return <p className="count">{totalNumberOfResults} results</p>;
}
