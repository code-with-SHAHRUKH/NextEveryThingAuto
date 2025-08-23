import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils/createPageUrl";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, Shield, Award, Users, Star } from "lucide-react";

export default function HeroSection() {
  const videoUrl = "https://www.youtube.com/embed/bfDpZval4uQ?autoplay=1&mute=1&loop=1&playlist=bfDpZval4uQ&controls=0&showinfo=0&autohide=1&modestbranding=1&rel=0";

  return (
    <section className="relative h-[85vh] text-white flex items-end justify-center text-center">
      <div className="absolute inset-0 overflow-hidden bg-black">
        <iframe
          src={videoUrl}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Everything Auto Background Video"
          className="absolute top-1/2 left-1/2 w-full h-full min-w-[100vh] min-h-[100vh] object-cover fit-content transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-40"
        ></iframe>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.9)]"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 z-20 pb-20">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a href="tel:516-775-9724" className="w-full sm:w-auto">
            <Button
              style={{
                boxShadow:
                  "inset 0 -2px 5px rgba(249, 195, 195, 0.85), inset 0 2px 5px rgba(19, 19, 19, 0.4), 0 2px 5px rgba(0, 0, 0, 0.11)",
              }}
              size="lg" className="bg-gradient-to-b from-red-600 to-gray-100/10 rounded-lg font-semibold text-xl px-8 py-6 w-full flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <Phone className="w-5 h-5 mr-2" />
              CALL NOW: 516-775-9724
            </Button>
          </a>
          <a href="https://myalp.io/nqc45n" target="_blank" rel="noopener noreferrer">
            <Button
              style={{
                boxShadow:
                  "inset 0 -2px 5px rgba(138, 193, 252, 0.85), inset 0 2px 5px rgba(19, 19, 19, 0.4), 0 2px 5px rgba(0, 0, 0, 0.11)",
              }}
              size="lg" className="bg-gradient-to-b from-blue-700 to-gray-100/10 rounded-lg font-semibold text-xl px-8 py-6 w-full sm:w-auto transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <Calendar className="w-5 h-5 mr-2" />
              Book Appointment
            </Button>
          </a>
        </div>
        <div>
          <p className="text-xl font-semibold text-blue-300 uppercase tracking-widest">
            Trusted Auto Care in Franklin Square
          </p>
          <h1 className="text-4xl md:text-6xl text-gray-50 font-semibold tracking-tight my-4 text-shadow-lg animate-fade-loop">
            Honest, Quality Auto Repair
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Your family-owned shop with 17+ years of experience. We service all makes and models with a commitment to excellence and transparent pricing.
          </p>
        </div>
      </div>
    </section>
  );
}