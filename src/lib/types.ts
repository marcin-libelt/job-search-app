export type JobItem = {
  id: number;
  title: string;
  badgeLetters: string;
  company: string;
  date: string;
  relevanceScore: number;
  daysAgo: number;
};

export type JobItemExpanded = JobItem & {
  companyURL: string;
  coverImgURL: string;
  description: string;
  duration: string;
  location: string;
  qualifications: string[];
  relevanceScore: number;
  reviews: string[];
  salary: string;
};

export type JobListProps = {
  jobItems: JobItem[];
  isLoading: boolean;
};
