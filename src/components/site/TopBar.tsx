import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SocialLinks } from "./SocialLinks";

export function TopBar() {
  return (
    <div className="hidden border-b border-white/10 bg-[oklch(0.42_0.12_230)] text-white md:block">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs">
          <a href="tel:+252613685943" className="inline-flex items-center gap-1.5 hover:text-secondary transition-colors">
            <Phone className="h-3.5 w-3.5 shrink-0" />
            +252-613-685-943
          </a>
          <a href="mailto:pointbridgeconsulting@gmail.com" className="inline-flex items-center gap-1.5 hover:text-secondary transition-colors">
            <Mail className="h-3.5 w-3.5 shrink-0" />
            pointbridgeconsulting@gmail.com
          </a>
          <span className="inline-flex items-center gap-1.5 text-white/90">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            Sat–Thu: 8.00 to 17.00
          </span>
          <span className="inline-flex items-center gap-1.5 text-white/90">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            Horn of Africa Region
          </span>
        </div>
        <SocialLinks variant="topbar" />
      </div>
    </div>
  );
}
