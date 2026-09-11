export type CitySearchResult = {
  id: number;
  name: string;
  country: string;
  admin1?: string; // state/region, e.g. "West Bengal"
  latitude: number;
  longitude: number;
};

export async function searchCities(query: string): Promise<CitySearchResult[]> {
  if (query.trim().length < 2) return [];

  try {
    const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
    url.searchParams.set("name", query);
    url.searchParams.set("count", "5");
    url.searchParams.set("language", "en");

    const res = await fetch(url.toString());
    if (!res.ok) return [];

    const data = await res.json();
    return (data.results ?? []).map((r: any) => ({
      id: r.id,
      name: r.name,
      country: r.country,
      admin1: r.admin1,
      latitude: r.latitude,
      longitude: r.longitude,
    }));
  } catch {
    return [];
  }
}

export async function reverseGeocodeCity(lat: number, lon: number): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.city || data.locality || data.principalSubdivision || null;
  } catch {
    return null;
  }
}