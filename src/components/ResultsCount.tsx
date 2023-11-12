type ResultsCountProps = {
  totalNumberOfResults: number;
};

export default function ResultsCount({
  totalNumberOfResults,
}: ResultsCountProps) {
  return <p className="count">{totalNumberOfResults} results</p>;
}
