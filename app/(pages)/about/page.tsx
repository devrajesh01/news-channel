import Recommended from "@/app/components/home/Recommended";
import { getPosts } from "@/app/lib/api/posts";
import { notFound } from "next/navigation";
import React from "react";

const page = async () => {
  const posts = await getPosts();
  if (posts.length === 0) return notFound();
  return (
    <div className="flex">
      <Recommended posts={posts} />
    </div>
  );
};

export default page;
