"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {motion} from "framer-motion";
import {
  Shield,
  Users,
  Award,
  Heart,
  Star,
  CheckCircle,
  TrendingUp,
  MapPin,
  MessageCircle,
  Phone,
  Calendar
} from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
const values = [
  { icon: Shield, title: "Honesty & Transparency", description: "We provide clear, upfront pricing and honest assessments. No surprises, no hidden fees—just straightforward service you can trust." },
  { icon: Award, title: "Quality Workmanship", description: "Our certified technicians use the latest tools to ensure every repair meets the highest standards of quality and safety." },
  { icon: Heart, title: "Customer Care", description: "We treat every customer like family, providing personalized service and support throughout your vehicle's lifetime." }
];

import Image from "next/image";

const MotionImage = motion(Image);
export default function About() {
    const { ref, inView } = useInView({ triggerOnce: true });


const blueglowAnimation = {
  initial: { x: -500, opacity: 1, scale: 1 },
  animate: {
    x: [-600, 0, 0, 600], // entry → pause → exit
    opacity: [0, 1, 1, 0.7], // fade out on exit
    scale: [1, 1, 1, 1],
    // filter: [
    //   "drop-shadow(0 0 10px rgba(135, 206, 235, 0.5)) drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))",
    //   "drop-shadow(0 0 30px rgba(135, 206, 235, 0.8)) drop-shadow(0 0 60px rgba(59, 130, 246, 0.6))",
    //   "drop-shadow(0 0 30px rgba(135, 206, 235, 0.8)) drop-shadow(0 0 60px rgba(59, 130, 246, 0.6))",
    //   "drop-shadow(0 0 10px rgba(135, 206, 235, 0.5)) drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))"
    // ]
  },
  transition: {
    duration: 4.7,
    ease: "easeInOut"as any,
    times: [0, 0.4, 0.7, 1], // slow entry, pause, fast exit
    repeat:0,
    // repeatDelay: 2 // gap before next car
  }
};

const spin = {
  animate: { rotate: [0, 200, 200, 360] },
  transition: {
    duration: 6, // same as car's total animation
    ease: "easeInOut"as any,
    times: [0, 0.4, 0.6, 1], // 0→0.4 spin, 0.4→0.6 pause, 0.6→1 spin again
    repeat: 0,
    // repeatDelay: 0
  }
};
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gray-800 text-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg font-semibold text-[var(--color-primary)] uppercase tracking-wider">About Us</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mt-2 mb-6">
                Your Trusted Partner in Auto Care Since 2008
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Everything Auto was founded with a simple mission: to provide honest, reliable, and high-quality automotive services to the Franklin Square and greater Long Island community. We&apos;ve grown into one of the most trusted auto repair shops in Nassau County, built on a foundation of integrity and technical expertise.
              </p>
            </div>
        <motion.div
  className="relative h-96 rounded-lg overflow-hidden flex items-center justify-center gap-0 bg-gray-900"
   
        >
     <div className="flex justify-center items-center">

  {/* Logo appears AFTER car animation */}
  {/* Logo appears after car animation */}
  <motion.img
    src="/EveryThingAutoLogo.png"
    alt="Everything Auto Logo"
    className="absolute max-w-full max-h-full object-contain drop-shadow-2xl"
    style={{
      filter:
        "drop-shadow(0 0 30px rgba(135, 206, 235, 0.8)) drop-shadow(0 0 60px rgba(59, 130, 246, 0.6))"
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 1, duration: 1, ease: "easeOut" }} // delay = car animation duration
  />
</div>
     
    </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
    <section ref={ref} className="bg-gray-800 text-white section-padding">
  <div className="max-w-screen-xl mx-auto px-4">
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
      
      {/* Years of Experience */}
      <div>
        <div className="text-4xl sm:text-5xl font-bold">
          {inView && <CountUp end={17} duration={3} />}+
        </div>
        <div className="mt-2 text-gray-300 text-sm sm:text-base">
          Years of Experience
        </div>
      </div>

      {/* Happy Customers */}
      <div>
        <div className="text-4xl sm:text-5xl font-bold">
          {inView && <CountUp end={5000} duration={3} separator="," />}+
        </div>
        <div className="mt-2 text-gray-300 text-sm sm:text-base">
          Happy Customers
        </div>
      </div>

      {/* Google Rating */}
      <div>
        <div className="flex items-center justify-center space-x-1">
          <span className="text-4xl sm:text-5xl font-bold">
            {inView && <CountUp end={5.0} duration={2} decimals={1} />}
          </span>
          <Star className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400 fill-current" />
        </div>
        <div className="mt-2 text-gray-300 text-sm sm:text-base">
          Google Rating
        </div>
      </div>

      {/* Certified Technicians */}
      <div>
        <div className="text-4xl sm:text-5xl font-bold">ASE</div>
        <div className="mt-2 text-gray-300 text-sm sm:text-base">
          Certified Technicians
        </div>
      </div>

    </div>
  </div>
</section>


      {/* Our Values Section */}
      <section className="section-padding bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-lg font-semibold text-[var(--color-primary)] uppercase tracking-wider">Our Core Values</p>
            <h2 className="text-4xl font-bold text-black mt-2 mb-4">The Foundation of Our Service</h2>
            <p className="text-lg text-[var(--color-text-light)] max-w-3xl mx-auto">
              These principles guide everything we do and ensure every customer receives the exceptional service they deserve.
            </p>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
  {values.map((value, index) => (
    
    <div
      key={index}
      className="text-center p-8 bg-gradient-to-b from-white via-gray-100 to-gray-50 rounded-xl border border-gray-100
                 shadow-md hover:shadow-sm hover:-translate-y-2 
                 transition-all duration-300 ease-out"
    >
      
      {/* Icon container */}
      
      <div className="w-16 h-16 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center mx-auto mb-6 
                      shadow-md hover:shadow-lg transition-shadow duration-300">
        <value.icon className="w-8 h-8" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-black mb-4">{value.title}</h3>

      {/* Description */}
      <p className="text-[var(--color-text-light)]">{value.description}</p>
    </div>
  ))}
</div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-b from-blue-900 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center rounded-2xl "
      
        >
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Experience the Difference?</h2>
          <p className="text-lg mx-auto mb-8 max-w-2xl text-gray-200">
            Join the thousands of satisfied customers who trust Everything Auto for all their vehicle needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
  <a href="tel:516-775-9724" className="w-full sm:w-auto">
    <Button
      style={{
        boxShadow:
          "inset 0 -2px 5px rgba(249, 195, 195, 0.85), inset 0 2px 5px rgba(19, 19, 19, 0.4), 0 2px 5px rgba(0, 0, 0, 0.11)",
      }}
      size="lg"
      className="bg-gradient-to-b from-red-600 to-gray-100/10 rounded-lg font-semibold 
                 text-lg sm:text-xl px-6 sm:px-8 py-4 sm:py-6 
                 w-full flex items-center justify-center 
                 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <Phone className="w-5 h-5 mr-2" />
      CALL NOW: (516) 775-9724
    </Button>
  </a>

  <a href="https://myalp.io/nqc45n" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
    <Button
      style={{
        boxShadow:
          "inset 0 -2px 5px rgba(138, 193, 252, 0.85), inset 0 2px 5px rgba(19, 19, 19, 0.4), 0 2px 5px rgba(0, 0, 0, 0.11)",
      }}
      size="lg"
      className="bg-gradient-to-b from-blue-700 to-gray-100/10 rounded-lg font-semibold 
                 text-lg sm:text-xl px-6 sm:px-8 py-4 sm:py-6 
                 w-full sm:w-auto flex items-center justify-center
                 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <Calendar className="w-5 h-5 mr-2" />
      Book Appointment
    </Button>
  </a>
</div>

        </div>
      </section>

    </div>
  );
}
