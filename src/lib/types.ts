export type JobItem = {
  id: number;
  title: string;
  badgeLetters: string;
  company: string;
  date: string;
  relevanceScore: number;
  daysAgo: number;
};

export type JobListProps = {
  jobItems: JobItem[];
  isLoading: boolean;
};
