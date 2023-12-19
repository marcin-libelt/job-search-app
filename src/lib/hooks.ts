import { useContext, useEffect, useState } from "react";
import { JobItem, JobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";
import { useQueries, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { errorHandler } from "./utils";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";
import { ActiveIdContext } from "../contexts/ActiveIdContextProvider";
import { SearchTextContext } from "../contexts/SearchTextContextProvider";

export function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchJobItem(id),
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: (error: unknown) => errorHandler(error, toast.error),
    })),
  });

  const jobItems = results
    .map((result) => result.data?.jobItem)
    .filter((result) => result !== undefined) as JobItemExpanded[];

  return {
    jobItems,
    isLoading: results.some((result) => result.isLoading),
  };
}

// --------------------------------------------------------------------------------
type JobItemApiResponse = { public: boolean; jobItem: JobItemExpanded };

const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
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
      onError: (error) => errorHandler(error, toast.error),
    }
  );

  return { jobItem: data?.jobItem, isLoading: isInitialLoading } as const;
}

// --------------------------------------------------------------------------------

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

const fetchSearchQuery = async (
  SearchTextContext: string
): Promise<JobItemsApiResponse> => {
  const response = await fetch(`${BASE_API_URL}?search=${SearchTextContext}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();

  return data;
};

export function useSearchQuery(SearchTextContext: string) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", SearchTextContext],
    () => fetchSearchQuery(SearchTextContext),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(SearchTextContext),
      onError: (error) => errorHandler(error, toast.error),
    }
  );

  return { jobItems: data?.jobItems, isLoading: isInitialLoading } as const;
}

export function useBookmarkedJobItems<T>(items: T[]) {
  return {
    isLoading: false,
    bookmarkedJobItems: items,
  };
}

// --------------------------------------------------------------------------------

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

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
  );

  // effects
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}

// --------------------------------------------------------------------------------

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashchange = () => {
      const id = +window.location.hash.slice(1);
      setActiveId(id);
    };
    handleHashchange();
    window.addEventListener("hashchange", handleHashchange);

    return () => {
      window.removeEventListener("hashchange", handleHashchange);
    };
  }, []);

  return activeId;
}

// --------------------------------------------------------------------------------

export function useActiveIdContext() {
  const context = useContext(ActiveIdContext);
  if (!context) {
    throw new Error(
      "useActiveIdContext must be used within a ActiveIdContextProvider"
    );
  }
  return context;
}

export function useBookmarksContext() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error(
      "useBookmarksContext must be used within a BookmarksContextProvider"
    );
  }
  return context;
}

export function useSearchTextContext() {
  const context = useContext(SearchTextContext);
  if (!context) {
    throw new Error(
      "useSearchTextContext must be used within a SearchTextContextProvider"
    );
  }
  return context;
}

// --------------------------------------------------------------------------------

export function useOnClickOutside(
  refs: React.RefObject<HTMLElement>[],
  handler: () => void
) {
  // effects
  useEffect(() => {
    const handleClick = (ev: MouseEvent) => {
      if (
        ev.target instanceof HTMLElement &&
        refs.every((ref) => !ref.current?.contains(ev.target as Node))
      ) {
        handler();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [refs, handler]);
}
