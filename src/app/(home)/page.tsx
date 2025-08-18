import FeaturesBenefitsSection from "./components/FeaturesBenefits";
import HeroBannerSection from "./components/HeroBanner";
import StatsSection from "./components/StatsSection";
import ValuePropLineSection from "./components/ValuePropLine";
import Mowing from "./components/Mowing";
import HowItWorksAndHelpSection from "./components/HowItWorksAndHelp";
import EcosystemSection from "./components/EcosystemSection";
import ReadyToOrderSection from "./components/ReadyToOrder";
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
        <section className="section-padding text-center bg-gray-800 text-white">
            <h2 className="text-3xl font-semibold mb-4 text-gray-50">Ready for 5-Star Service?</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">Don&apos;t wait for a small problem to become a major repair. Contact our expert team today!</p>
            <a href="tel:516-775-9724">
              <Button size="lg" className="btn-accent hover:bg-red-500 font-semibold text-lg px-8 py-4">
                <Phone className="w-5 h-5 mr-2" />
                CALL NOW: 516-775-9724
              </Button>
            </a>
        </section>
        </>
    );
}
