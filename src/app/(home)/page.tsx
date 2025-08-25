
import HeroSection from "./components/HeroSection";
import ServicesOverview from "./components/ServicesOverview";
import GoogleReviews from "./components/GoogleReviews";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
export default async function Home() {
    return (
        <>
        <HeroSection/>
        <div className="section-bg">
          <ServicesOverview />
        </div>
        <GoogleReviews/>
        <section className="section-padding text-center bg-gradient-to-b from-blue-900 to-gray-900 text-white">
            <h2 className="text-3xl font-semibold mb-4 text-gray-50">Ready for 5-Star Service?</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">Don&apos;t wait for a small problem to become a major repair. Contact our expert team in Franklin Square today!</p>
            
            <a href="tel:516-775-9724">
              <Button
                                                 style={{
        boxShadow:
          "inset 0 -2px 5px rgba(249, 195, 195, 0.85), inset 0 2px 5px rgba(19, 19, 19, 0.61), 0 8px 14px rgba(0, 0, 0, 0.22)",
      }}
              size="lg" className="bg-gradient-to-b from-red-600 to-gray-100/10 rounded-lg font-semibold text-lg sm:text-xl 
                 px-6 sm:px-8 py-4 sm:py-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <Phone className="w-5 h-5 mr-2" />
                CALL NOW: 516-775-9724
              </Button>
            </a>
        </section>
        </>
    );
}
