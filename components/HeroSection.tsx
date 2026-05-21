import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroCar from "../assets/hero-car.jpg";
import { StaticImageData } from "next/image";

const HeroSection = ({title_1,title_2,title_3,description,image}:{image:string | StaticImageData,title_1:string, title_2:string,title_3:string, description:string,}) => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <img
        src={typeof image === "string" ? image : image.src}
        alt="Luxury executive sedan at a grand hotel"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-hero-overlay" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 text-md font-body uppercase tracking-[0.35em] text-primary"
        >
          {title_1}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="max-w-4xl text-5xl font-display font-medium leading-tight text-foreground md:text-7xl lg:text-8xl"
        >
          {title_2} <br />
          <span className="block italic text-gold-gradient">{title_3}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#booking"
            className="border border-primary bg-primary px-10 py-3.5 text-xs font-body font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:bg-transparent hover:text-primary"
          >
            Book Now
          </a>
          <a
            href="#fleet"
            className="border border-border px-10 py-3.5 text-xs font-body font-semibold uppercase tracking-[0.2em] text-foreground transition-all hover:border-primary hover:text-primary"
          >
            Our Fleet
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#services" className="text-muted-foreground transition-colors hover:text-primary">
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
