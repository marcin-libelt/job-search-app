import JobListItem from "./JobListItem";

export function JobList({ jobItems }) {
  return (
    <ul className="job-list">
      {jobItems.map((jobItem) => (
        <JobListItem jobItem={jobItem} key={jobItem.id} />
      ))}
    </ul>
  );
}

export default JobList;
