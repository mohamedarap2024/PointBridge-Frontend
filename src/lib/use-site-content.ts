import { useQuery } from "@tanstack/react-query";
import { fetchPublicImages, fetchPublicTestimonials } from "@/lib/admin-api";
import { heroSlides, images } from "@/lib/images";
import {
  preloadImageUrls,
  readCachedImageMap,
  writeCachedImageMap,
} from "@/lib/site-image-cache";
import { blogPosts, publications, testimonials as staticTestimonials } from "@/lib/site-data";

function getInitialImageData() {
  if (typeof window === "undefined") return undefined;

  const map = readCachedImageMap();
  if (!map) return undefined;

  preloadImageUrls(Object.values(map));
  return { items: [], map };
}

export function siteImagesQueryOptions() {
  return {
    queryKey: ["site-images"] as const,
    queryFn: async () => {
      try {
        const data = await fetchPublicImages();
        writeCachedImageMap(data.map);
        preloadImageUrls(Object.values(data.map));
        return data;
      } catch {
        const cached = readCachedImageMap();
        if (cached) return { items: [], map: cached };
        return { items: [], map: {} };
      }
    },
    initialData: getInitialImageData(),
    staleTime: 30_000,
    refetchOnMount: true as const,
    retry: 1,
  };
}

export function useSiteImageMap() {
  return useQuery({
    ...siteImagesQueryOptions(),
    select: (data) => data.map,
  });
}

export function useSiteImages() {
  const query = useSiteImageMap();
  return {
    ...query,
    getImage: (key: string, fallback: string) => query.data?.[key] ?? fallback,
  };
}

export function useHeroSlides() {
  const { data: map, isPending } = useSiteImageMap();

  const slides = heroSlides.map((slide, index) => ({
    ...slide,
    image: map?.[`hero.slide.${index + 1}`] ?? slide.image,
  }));

  return {
    slides,
    /** True only on first visit with no cached image map */
    isLoading: isPending && !map,
  };
}

export function usePublicTestimonials() {
  return useQuery({
    queryKey: ["site-testimonials"],
    queryFn: fetchPublicTestimonials,
    staleTime: 60_000,
    select: (data) =>
      data.items.length
        ? data.items.map((item) => ({ name: item.name, role: item.role, quote: item.quote }))
        : staticTestimonials,
  });
}

export function resolveBlogImage(slug: string, fallback: string, map?: Record<string, string>) {
  return map?.[`blog.${slug}`] ?? fallback;
}

export function resolvePublicationImage(slug: string, fallback: string, map?: Record<string, string>) {
  return map?.[`pub.${slug}`] ?? fallback;
}

export function resolveQuickLinkImage(key: keyof typeof images.quickLinks, map?: Record<string, string>) {
  return map?.[`quick.${key}`] ?? images.quickLinks[key];
}

export function resolveBlogPosts(map?: Record<string, string>) {
  return blogPosts.map((post) => ({
    ...post,
    image: resolveBlogImage(post.slug, post.image, map),
  }));
}

export function resolvePublications(map?: Record<string, string>) {
  return publications.map((item) => ({
    ...item,
    image: resolvePublicationImage(item.slug, item.image, map),
  }));
}
