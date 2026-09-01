export function rewriteContentImages(html: string): string {
  return html
    .replace(/\ssizes="[^"]*"/g, "") // remove sizes, Next's proxy doesn't need WP's version
    .replace(/srcset="([^"]+)"/g, (match, srcsetValue) => {
      const rewritten = srcsetValue
        .split(",")
        .map((entry: string) => {
          const [url, width] = entry.trim().split(" ");
          const proxied = `/_next/image?url=${encodeURIComponent(url)}&w=1920&q=75`;
          return width ? `${proxied} ${width}` : proxied;
        })
        .join(", ");
      return `srcset="${rewritten}"`;
    })
    .replace(/<img([^>]*)\ssrc="([^"]+)"/g, (match, attrs, src) => {
      const proxiedSrc = `/_next/image?url=${encodeURIComponent(src)}&w=1920&q=75`;
      return `<img${attrs} src="${proxiedSrc}"`;
    });
}
