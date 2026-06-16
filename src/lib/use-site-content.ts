import { useQuery } from "@tanstack/react-query";
import { fetchPublicImages, fetchPublicTestimonials } from "@/lib/admin-api";
import { heroSlides, images } from "@/lib/images";
import {
  optimizeImageUrl,
  preloadFirstImage,
  readCachedImageMap,
  writeCachedImageMap,
} from "@/lib/site-image-cache";
import { blogPosts, publications, testimonials as staticTestimonials } from "@/lib/site-data";

function getInitialImageData() {
  if (typeof window === "undefined") return undefined;

  const map = readCachedImageMap();
  if (!map) return undefined;

  const firstHero = map["hero.slide.1"];
  if (firstHero) preloadFirstImage(firstHero);
  return { items: [], map };
}

export function siteImagesQueryOptions() {
  return {
    queryKey: ["site-images"] as const,
    queryFn: async () => {
      try {
        const data = await fetchPublicImages();
        writeCachedImageMap(data.map);
        const firstHero = data.map["hero.slide.1"];
        if (firstHero) preloadFirstImage(firstHero);
        return data;
      } catch {
        const cached = readCachedImageMap();
        if (cached) return { items: [], map: cached };
        return { items: [], map: {} };
      }
    },
    initialData: getInitialImageData(),
    staleTime: 5 * 60_000,
    refetchOnMount: false as const,
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
  const { data: map } = useSiteImageMap();

  const slides = heroSlides.map((slide, index) => {
    const raw = map?.[`hero.slide.${index + 1}`] ?? slide.image;
    return {
      ...slide,
      image: optimizeImageUrl(raw, index === 0 ? 1440 : 1200),
    };
  });

  return { slides };
}

export function usePublicTestimonials() {
  return useQuery({
    queryKey: ["site-testimonials"],
    queryFn: fetchPublicTestimonials,
    staleTime: 5 * 60_000,
    refetchOnMount: false,
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
