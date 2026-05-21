"use client";

import BookingSection from "@/components/BookingSection";
import FleetSection from "@/components/FleetSection";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import heroCar from "@/public/assets/hero-car.jpg";
import { GetHomePageData } from "../hook/queries";
import { STRAPI_URL } from "@/lib/utils";



export default function Home() {
     const { data, isLoading: pageLoading, isError: pageError, error: pageErrorObj } = GetHomePageData();
 
   console.log(data?.data);

   if (pageLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (pageError) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">Error: {pageErrorObj.message}</div>;
  }

   const hero = data?.data?.hero?.[0];
   const heroImageUrl = hero?.image?.url || hero?.image?.formats?.large?.url || hero?.image?.formats?.medium?.url;

   console.log(data);
  return (
    <main className="min-h-screen">
      <HeroSection image={heroImageUrl ? `${STRAPI_URL}${heroImageUrl}` : heroCar} 
        title_1={hero?.title_1 ?? ""} 
        title_2={hero?.title_2 ?? ""} 
        title_3={hero?.title_3 ?? ""} 
        description={hero?.description ?? ""}  />
      <ServicesSection offersSection={data?.data?.offersSection?.[0]} />
	    <FleetSection fleesSection={data?.data?.fleetsSection?.[0]} />
	      <TestimonialsSection testimonialSection={data?.data?.testimonalsSection?.[0]} />
	     <BookingSection contactSection={data?.data?.ContactSection?.[0]}/> 
      
      {/* <div className="container mx-auto p-8">
        {pageLoading && <p>Loading homepage data...</p>}
        {pageError && <p className="text-red-500">Error loading data.</p>}
        {data && (
          <pre className="bg-muted p-4 rounded-md overflow-auto text-sm mt-4">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div> */}
    </main>
  );
}
