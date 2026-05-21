import { motion } from "framer-motion";


// const services = [
//   {
//     icon: Plane,
//     title: "Airport Transfers",
//     description: "Seamless pickups and drop-offs with flight monitoring. We're there before you land.",
//   },
//   {
//     icon: Briefcase,
//     title: "Corporate Travel",
//     description: "Reliable daily commutes and business meetings. Your mobile office awaits.",
//   },
//   {
//     icon: GlassWater,
//     title: "Special Events",
//     description: "Weddings, galas, and private occasions. Arrive with unmatched elegance.",
//   },
//   {
//     icon: Clock,
//     title: "Hourly Charter",
//     description: "Flexible hourly bookings for roadshows, city tours, or whenever you need us.",
//   },
// ];

// components/DynamicIcon.jsx
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as GiIcons from "react-icons/gi";
import * as Io5Icons from "react-icons/io5";
import * as TbIcons from "react-icons/tb";



const allIcons = { ...FaIcons, ...MdIcons, ...AiIcons,...GiIcons, ...Io5Icons, ...TbIcons  };


function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = allIcons[name as keyof typeof allIcons];

  if (!Icon) return null; // icon not found

  return <Icon className={className} />;
}


const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15 },
  }),
};

type Offer = {
  id: number;
  __component: string;
  icon: string;
  title: string;
  description: string;
};

type OffersSectionData = {
  id: number;
  title_1: string;
  title_2: string;
  offers: Offer[];
};

const ServicesSection = ({ offersSection }: { offersSection?: OffersSectionData }) => {

  console.log("Offers Section Data:", offersSection);
  if (!offersSection) return null;

  return (
    <section id="services" className="bg-section-fade py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs font-body uppercase tracking-[0.3em] text-[#cda661]">{offersSection.title_1}</p>
          <h2 className="text-3xl font-display font-medium text-foreground md:text-5xl">
           {offersSection.title_2}
          </h2>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {offersSection?.offers?.map((service, i) => (
            <motion.div
              key={service.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="group border border-border bg-card p-8 transition-all hover:border-gold-gradient rounded-none"
            >
              <DynamicIcon
                name={service.icon}  // e.g. "FaCar" from Strapi
                className="mb-6 h-7 w-7 text-[#cda661] transition-transform group-hover:scale-110"
              />
              {/* <service.icon className="mb-6 h-7 w-7 text-[#cda661] transition-transform group-hover:scale-110" /> */}
              <h3 className="mb-3 font-display text-lg font-medium text-foreground">{service.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
