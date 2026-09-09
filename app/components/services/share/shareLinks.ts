import { ShareData } from "./types";

export const buildShareLinks = ({ title, url, text }: ShareData) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(text ?? title);

  return {
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    x: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };
};

// Standard centered popup window for share intents — avoids a full page navigation away from the article
export const openShareWindow = (url: string) => {
  const width = 560;
  const height = 480;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  window.open(
    url,
    "share",
    `width=${width},height=${height},left=${left},top=${top},noopener,noreferrer`
  );
};