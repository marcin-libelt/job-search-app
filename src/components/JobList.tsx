import { useContext } from "react";
import { JobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";
import { ActiveIdContext } from "../contexts/ActiveIdContextProvider";

type JobListProps = {
  jobItems: JobItem[];
  isLoading: boolean;
};

export function JobList({ jobItems, isLoading }: JobListProps) {
  const activeId = useContext(ActiveIdContext);

  return (
    <ul className="job-list">
      {isLoading && <Spinner />}

      {!isLoading &&
        jobItems.map((jobItem) => (
          <JobListItem
            jobItem={jobItem}
            isActive={jobItem.id === activeId}
            key={jobItem.id}
          />
        ))}
    </ul>
  );
}

export default JobList;
