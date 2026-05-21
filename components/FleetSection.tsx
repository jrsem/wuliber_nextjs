import { motion } from "framer-motion";
import fleetInterior from "@/public/assets/fleet-interior.jpg";
import fleetSedan from "@/public/assets/fleet-sedan.jpg";
import fleetSuv from "@/public/assets/fleet-suv.jpg";
import { STRAPI_URL } from "@/lib/utils";

// const vehicles = [
//   {
//     image: fleetSedan,
//     name: "Executive Sedan",
//     desc: "Mercedes S-Class & BMW 7 Series",
//     capacity: "Up to 3 passengers",
//   },
//   {
//     image: fleetSuv,
//     name: "Luxury SUV",
//     desc: "Range Rover & Cadillac Escalade",
//     capacity: "Up to 5 passengers",
//   },
//   {
//     image: fleetInterior,
//     name: "First Class Interior",
//     desc: "Handcrafted leather, ambient lighting",
//     capacity: "Premium amenities",
//   },
// ];

type OfferFleet = {
  id: number;
  __component: string;
  image: unknown;
  title: string;
  nbr_passengers: string;
  description: string;
};

type fleesSectionData = {
  id: number;
  title_1: string;
  title_2: string;
  fleets: OfferFleet[];
};

function resolveStrapiMediaUrl(media: unknown): string | null {
  if (!media) return null;

  // plain string (either absolute URL or "/uploads/...")
  if (typeof media === "string") return media;

  // common shapes
  const maybeAny = media as any;
  const url =
    maybeAny?.url ??
    maybeAny?.data?.attributes?.url ??
    maybeAny?.data?.[0]?.attributes?.url;

  if (typeof url !== "string" || !url) return null;
  return url;
}

function toAbsoluteUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) return url;
  if (url.startsWith("/")) return `${STRAPI_URL}${url}`;
  return url;
}

const FleetSection = ({ fleesSection }: { fleesSection?: fleesSectionData }) => {
  return (
    <section id="fleet" className="py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs font-body uppercase tracking-[0.3em] text-primary">{fleesSection?.title_1 }</p>
          <h2 className="text-3xl font-display font-medium text-foreground md:text-5xl">
           {fleesSection?.title_2}
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {fleesSection?.fleets?.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group overflow-hidden border border-border bg-card"
            >
              <div className="overflow-hidden">
                {(() => {
                  const fallbackImages = [fleetSedan, fleetSuv, fleetInterior] as const;
                  const mediaUrl = resolveStrapiMediaUrl(v.image);
                  const src = mediaUrl ? toAbsoluteUrl(mediaUrl) : fallbackImages[i % fallbackImages.length];
                  return (
                <img
                  src={src as string}
                  alt={v.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                  );
                })()}
              </div>
              <div className="p-6">
                <h3 className="mb-1 font-display text-lg font-medium text-foreground">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.description}</p>
                <p className="mt-2 text-xs uppercase tracking-widest text-primary">{v.nbr_passengers }</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
