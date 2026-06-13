import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/lib/site-data";
import { images } from "@/lib/images";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — PointBridge Consulting" },
      { name: "description", content: "Strategic policy, peace-building, audit & risk, human capital, research, M&E, business development and ICT." },
      { property: "og:title", content: "Services — PointBridge Consulting" },
      { property: "og:description", content: "Eight integrated practices, one standard of rigor." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero
        image={images.quickLinks.projects}
        eyebrow="What we do"
        title="Services that shape institutions and outcomes"
        description="Eight integrated practices, delivered with rigor and tailored to fragile and complex settings."
      />

      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.04}>
              <Card id={s.slug} className="overflow-hidden scroll-mt-28 hover:shadow-elegant transition-shadow">
                <div className="grid md:grid-cols-5">
                  <div className="md:col-span-2 relative min-h-56 md:min-h-full">
                    <img
                      src={images.services[s.slug as keyof typeof images.services]}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/10 md:bg-gradient-to-l md:from-transparent md:to-card" />
                  </div>
                  <CardContent className="md:col-span-3 p-6 sm:p-8 flex flex-col justify-center">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <s.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{s.title}</h3>
                        <p className="mt-2 text-muted-foreground">{s.short}</p>
                      </div>
                    </div>
                    <ul className="mt-6 grid sm:grid-cols-2 gap-2">
                      {s.items.map((it) => (
                        <li key={it} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
