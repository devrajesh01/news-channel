type FetchOptions = {
  params?: Record<string, string | number | boolean>;
  revalidate?: number | false;
  tags?: string[];
};

export async function wpFetch<T>(
  endpoint: string,
  { params, revalidate = 3600, tags }: FetchOptions = {}
): Promise<T> {
  const url = new URL(`${process.env.WP_API_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.set(key, String(value))
    );
  }
  const res = await fetch(url.toString(), {
    next: { revalidate, tags },
  });

  if (!res.ok) {
    throw new Error(`WP API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}