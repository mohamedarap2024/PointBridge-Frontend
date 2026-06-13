import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { heroSlides as defaultHeroSlides } from "@/lib/images";
import { cn } from "@/lib/utils";
import { useHeroSlides } from "@/lib/use-site-content";

function SlideTitle({ title, highlight, line2 }: { title: string; highlight?: string; line2?: string }) {
  if (!highlight || !title.includes(highlight)) {
    return (
      <>
        {title}
        {line2 && (
          <>
            <br />
            {line2}
          </>
        )}
      </>
    );
  }

  const [before, after] = title.split(highlight);

  return (
    <>
      {before}
      <span className="text-secondary">{highlight}</span>
      {after}
      {line2 && (
        <>
          <br />
          {line2}
        </>
      )}
    </>
  );
}

export function HeroSlider() {
  const { slides } = useHeroSlides();
  const heroSlides = slides.length ? slides : defaultHeroSlides;
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || paused) return;

    const timer = window.setInterval(() => {
      api.scrollNext();
    }, 6000);

    return () => window.clearInterval(timer);
  }, [api, paused]);

  const slide = heroSlides[current];

  return (
    <section
      className="relative isolate min-h-[88vh] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Carousel opts={{ loop: true }} setApi={setApi} className="min-h-[88vh]">
        <CarouselContent className="-ml-0 min-h-[88vh]">
          {heroSlides.map((item, index) => (
            <CarouselItem key={item.title} className="relative min-h-[88vh] basis-full pl-0">
              <div className="absolute inset-0 -z-10">
                <img
                  src={item.image}
                  alt=""
                  className={cn(
                    "h-full w-full object-cover transition-transform duration-[8000ms] ease-out",
                    current === index ? "scale-105" : "scale-100",
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.14_0.07_260/0.95)] via-[oklch(0.22_0.08_260/0.88)] to-[oklch(0.28_0.10_256/0.75)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.68_0.19_144/0.15),transparent_50%)]" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="pointer-events-none absolute inset-0 mx-auto flex max-w-7xl flex-col justify-center px-4 py-32 sm:px-6 lg:px-8 md:py-40">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="pointer-events-auto max-w-4xl text-white"
            >
              {slide.eyebrow && (
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">{slide.eyebrow}</p>
              )}
              <h1
                className={cn(
                  "max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem]",
                  slide.eyebrow ? "mt-4" : "mt-0",
                )}
              >
                <SlideTitle title={slide.title} highlight={slide.highlight} line2={slide.titleLine2} />
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">{slide.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-secondary px-8 text-secondary-foreground shadow-lg hover:bg-secondary/90"
                >
                  <Link to={slide.primaryTo}>
                    {slide.primaryLabel} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/50 bg-white/10 px-8 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
                >
                  <Link to={slide.secondaryTo}>
                    {slide.secondaryLabel === "Watch Video" && (
                      <Play className="mr-2 h-4 w-4 fill-white/20" />
                    )}
                    {slide.secondaryLabel}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="pointer-events-auto mx-auto flex items-center gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  current === index ? "w-8 bg-secondary" : "w-2.5 bg-white/40 hover:bg-white/70",
                )}
              />
            ))}
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Previous slide"
          onClick={() => api?.scrollPrev()}
          className="absolute left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 rounded-full border-white/30 bg-black/20 text-white backdrop-blur-sm hover:bg-black/35 hover:text-white md:inline-flex lg:left-8"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Next slide"
          onClick={() => api?.scrollNext()}
          className="absolute right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 rounded-full border-white/30 bg-black/20 text-white backdrop-blur-sm hover:bg-black/35 hover:text-white md:inline-flex lg:right-8"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </Carousel>
    </section>
  );
}
