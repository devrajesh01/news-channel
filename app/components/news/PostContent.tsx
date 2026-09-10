"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import Lightbox from "./Lightbox";

type PostContentProps = {
  html: string;
};

const PostContent = ({ html }: PostContentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Collect every image inside the post once it's rendered                                                                                                                                                                                                                                                                     
  useEffect(() => {
    if (!containerRef.current) return;
    const imgs = Array.from(containerRef.current.querySelectorAll("img"));
    setImages(imgs.map((img) => img.src));
  }, [html]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const img = target.closest("img");
    if (!img || !containerRef.current) return;

    const allImgs = Array.from(containerRef.current.querySelectorAll("img"));
    const index = allImgs.indexOf(img as HTMLImageElement);
    if (index !== -1) setActiveIndex(index);
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        onClick={handleClick}
        className="post-content mt-8 [&_img]:cursor-zoom-in"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {activeIndex !== null && (
        <Lightbox
          images={images}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </>
  );
};

export default PostContent;