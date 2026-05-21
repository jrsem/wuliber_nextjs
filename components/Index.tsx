import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import FleetSection from "./FleetSection";
import BookingSection from "./BookingSection";
import TestimonialsSection from "./TestimonialsSection";
import Footer from "./Footer";

export default function Index() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <FleetSection />
      <BookingSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
