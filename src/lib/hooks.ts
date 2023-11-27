import { useEffect, useState } from "react";
import { JobItem, JobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

type JobItemApiResponse = { public: boolean; jobItem: JobItemExpanded };
type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashchange = () => {
      const id = +window.location.hash.slice(1);
      setActiveId(id);
    };
    window.addEventListener("hashchange", handleHashchange);

    return () => {
      window.removeEventListener("hashchange", handleHashchange);
    };
  }, []);

  return activeId;
}

const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
  console.log("response", response);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};

export function useJobItem(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  return { jobItem: data?.jobItem, isLoading: isInitialLoading } as const;
}

const fetchJobItems = async (
  searchText: string
): Promise<JobItemsApiResponse> => {
  const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();

  return data;
};

export function useJobItems(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(searchText),
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  return { jobItems: data?.jobItems, isLoading: isInitialLoading } as const;
}

export function useDebounce<T>(value: T, delay = 500): T {
  const [debounceText, setDebounceText] = useState(value);

  useEffect(() => {
    if (!value) return;

    const timeout = setTimeout(() => setDebounceText(value), delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debounceText;
}
