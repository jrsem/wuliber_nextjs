import { motion } from "framer-motion";
import { Star } from "lucide-react";

// const testimonials = [
//   {
//     quote: "Impeccable service from start to finish. The attention to detail is extraordinary — it's the only chauffeur service I trust.",
//     name: "James Harrington",
//     title: "CEO, Sterling Partners",
//   },
//   {
//     quote: "They've handled our corporate travel for three years. Consistently on time, discreet, and professional. Truly world-class.",
//     name: "Victoria Chen",
//     title: "Managing Director, Apex Capital",
//   },
//   {
//     quote: "From our wedding day to everyday airport runs, Prestige delivers an experience that simply can't be matched.",
//     name: "Alexander & Sophia Reid",
//     title: "Private Clients",
//   },
// ];
type testimonail = {
  id: number;
  __component: string;

  fullname: string;
  position: string;
  stars:number;
  description: string;
};

type testionialSectionData = {
  id: number;
  title_1: string;
  title_2: string;
  testimonials: testimonail[];
};

const TestimonialsSection = ({ testimonialSection }: { testimonialSection?: testionialSectionData }) => {
    if (!testimonialSection) return null;
  return (
    <section id="testimonials" className="bg-section-fade py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs font-body uppercase tracking-[0.3em] text-primary">{testimonialSection?.title_1}</p>
          <h2 className="text-3xl font-display font-medium text-foreground md:text-5xl">
            {testimonialSection?.title_2}
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonialSection?.testimonials?.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="border border-border bg-card p-8"
            >
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground italic">"{t.description}"</p>
              <div>
                <p className="font-display text-sm font-medium text-foreground">{t.fullname}</p>
                <p className="text-xs text-muted-foreground">{t.position}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
