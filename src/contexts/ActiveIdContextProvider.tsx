import { createContext } from "react";
import { useActiveId } from "../lib/hooks";

type ActiveIdContextProviderProps = {
  children: React.ReactNode;
};

export const ActiveIdContext = createContext<{
  activeId: number | null;
} | null>(null);

export default function ActiveIdContextProvider({
  children,
}: ActiveIdContextProviderProps) {
  const activeId = useActiveId();

  return (
    <ActiveIdContext.Provider value={{ activeId }}>
      {children}
    </ActiveIdContext.Provider>
  );
}
