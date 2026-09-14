"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ActiveCategoryContextValue = {
  activeCategorySlug: string | null;
  setActiveCategorySlug: (slug: string | null) => void;
};

const ActiveCategoryContext = createContext<ActiveCategoryContextValue | null>(null);

export const ActiveCategoryProvider = ({ children }: { children: ReactNode }) => {
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(null);

  return (
    <ActiveCategoryContext.Provider value={{ activeCategorySlug, setActiveCategorySlug }}>
      {children}
    </ActiveCategoryContext.Provider>
  );
};

export const useActiveCategory = () => {
  const ctx = useContext(ActiveCategoryContext);
  if (!ctx) throw new Error("useActiveCategory must be used within an ActiveCategoryProvider");
  return ctx;
};