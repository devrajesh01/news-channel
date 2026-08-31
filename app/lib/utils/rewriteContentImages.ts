// src/lib/utils/rewriteContentImages.ts
export function rewriteContentImages(html: string): string {
  return html
    // Remove srcset and sizes attributes entirely — force browser to use src only
    .replace(/\ssrcset="[^"]*"/g, "")
    .replace(/\ssizes="[^"]*"/g, "")
    // Rewrite src to go through Next.js image proxy
    .replace(
      /<img([^>]*)\ssrc="([^"]+)"/g,
      (match, attrs, src) => {
        const proxiedSrc = `/_next/image?url=${encodeURIComponent(src)}&w=1920&q=75`;
        return `<img${attrs} src="${proxiedSrc}"`;
      }
    );
}