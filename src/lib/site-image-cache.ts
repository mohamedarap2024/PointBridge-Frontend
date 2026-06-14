const CACHE_KEY = "pb_site_image_map";
const CACHE_VERSION = 1;

type CachedPayload = {
  version: number;
  map: Record<string, string>;
  updatedAt: number;
};

export function readCachedImageMap(): Record<string, string> | undefined {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return undefined;

    const parsed = JSON.parse(raw) as CachedPayload;
    if (parsed.version !== CACHE_VERSION || !parsed.map) return undefined;

    return parsed.map;
  } catch {
    return undefined;
  }
}

export function writeCachedImageMap(map: Record<string, string>) {
  try {
    const payload: CachedPayload = {
      version: CACHE_VERSION,
      map,
      updatedAt: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    /* storage full or unavailable */
  }
}

export function preloadImageUrls(urls: string[]) {
  const unique = [...new Set(urls.filter(Boolean))];
  unique.forEach((url) => {
    const img = new Image();
    img.decoding = "async";
    img.src = url;
  });
}

export function preloadImageUrlsAsync(urls: string[]): Promise<void> {
  const unique = [...new Set(urls.filter(Boolean))];
  if (!unique.length) return Promise.resolve();

  return Promise.all(
    unique.map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.decoding = "async";
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = url;
        }),
    ),
  ).then(() => undefined);
}
