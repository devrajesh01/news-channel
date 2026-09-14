"use client";

import { useEffect } from "react";
import { useActiveCategory } from "@/app/components/layout/ActiveCategoryProvider";

const SetActiveCategory = ({ slug }: { slug: string }) => {
  const { setActiveCategorySlug } = useActiveCategory();

  useEffect(() => {
    setActiveCategorySlug(slug);
    return () => setActiveCategorySlug(null); // clear when leaving the details page
  }, [slug, setActiveCategorySlug]);

  return null; // renders nothing — purely a side-effect component
};

export default SetActiveCategory;