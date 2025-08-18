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
          <div className="grid lg:grid-cols-2 gap-16 items-center">
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
  className="relative h-96 rounded-lg overflow-hidden flex items-center justify-center gap-0"
  initial={{ background: "linear-gradient(to bottom, #111827, #1f2937)" }} // gray-900 → gray-800
  animate={{  background: [
      "linear-gradient(to bottom, #111827, #1f2937", // ~gray-800
      "linear-gradient(to bottom, #111827, #1f2937", // ~gray-850
      "linear-gradient(to bottom, #0f172a, #111827)"  // ~gray-900
    ]}} // solid gray-900
  transition={{ delay: 5, duration: 1.5, ease: "easeInOut",times: [0, 0.5, 1] }} // 2 sec wait, then 1 sec fade   
        >
     <div className="flex justify-center items-center">

  

<motion.div className="relative mx-auto p-2 w-[450px] max-w-[3600px]"
       {...blueglowAnimation}
        transition={{ ...blueglowAnimation.transition, delay: 0.5}} // more delay
        >
      {/* keep the car’s aspect ratio (your image is ~1350x390) */}
      <div className=" w-full" style={{ aspectRatio: "1450/390" }}>
        {/* ---- ROTATING WHEELS UNDERLAY ---- */}
        {/* Rear wheel */}
        <motion.img
          src="/frontwheel-removebg.png"
          alt="Rear wheel"
          className="absolute"
          style={{
            left: "11.8%",   // ⬅️ tune these % to match exactly
            top: "47.4%",
            transform: "translate(-50%, -50%)",
            width: "14%",  // wheel diameter as % of container width
            filter:
              "drop-shadow(0 0 18px rgba(0,0,0,0.45)) drop-shadow(0 8px 24px rgba(0,0,0,0.35))",
          }}
          {...spin}
          
        />

        {/* Front wheel */}
        <motion.img
          src="/frontwheel-removebg.png"
          alt="Front wheel"
          className="absolute"
          style={{
            left: "68.5%",   // ⬅️ tune these % to match exactly
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "14%",
            filter:
              "drop-shadow(0 0 18px rgba(0,0,0,0.45)) drop-shadow(0 8px 24px rgba(0,0,0,0.35))",
          }}
          {...spin}
        />

        {/* ---- CAR BODY OVERLAY (with holes where wheels are) ---- */}
        <svg className="inset-0 w-full h-full" viewBox="0 0 3000 650" preserveAspectRatio="xMidYMid slice">
          <defs>
            {/* White = visible, Black = hole */}
          <mask id="carMask">
  <rect width="180%" height="100%" fill="white" />
    {/* <circle cx="200" cy="140" r="70" fill="black" /> {/* Rear tyre hole */}
    {/* <circle cx="750" cy="140" r="70" fill="black" /> Front tyre hole */}
  </mask>
          </defs>

          {/* Car image with mask applied */}
          <image
            href="/FerariBlueNowheels.png"
            x="0"
            y="0"
            width="3000"   // pehle 1490 tha
            height="650"   // pehle 420 tha
            preserveAspectRatio="xMidYMid slice"
            mask="url(#carMask)"
            
          />
          
        </svg>
          {/* Bottom shadow */}
  <div
    className="absolute left-1/2 -translate-x-1/2 z-0"
    style={{
      bottom:"1%",
      width: "130%", // shadow ka spread
      height: "20px",
      background: "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.81) 38%, transparent 80%)",
      filter: "blur(8px)",
    }}
  />
      </div>
    </motion.div>
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
    transition={{ delay: 5, duration: 1.5, ease: "easeOut" }} // delay = car animation duration
  />
</div>
     
    </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={ref} className="bg-gray-800 text-white section-padding">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold"> {inView && <CountUp end={17} duration={3} />}+</div>
              <div className="mt-2 text-gray-300">Years of Experience</div>
            </div>
            <div>
              <div className="text-5xl font-bold"> {inView && <CountUp end={5000} duration={3} separator="," />}+</div>
              <div className="mt-2 text-gray-300">Happy Customers</div>
            </div>
            <div>
              <div className="flex items-center justify-center space-x-1">
                <span className="text-5xl font-bold">{inView && <CountUp end={5.0} duration={2} decimals={1} />}</span>
                <Star className="w-10 h-10 text-yellow-400 fill-current" />
              </div>
              <div className="mt-2 text-gray-300">Google Rating</div>
            </div>
            <div>
              <div className="text-5xl font-bold">ASE</div>
              <div className="mt-2 text-gray-300">Certified Technicians</div>
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
      <section className="section-padding section-bg">
        <div className="max-w-4xl mx-auto px-4 text-center bg-white p-12 rounded-2xl shadow-lg border border-gray-200"
        style={{
                boxShadow: 'inset 0 -3px 8px rgba(0, 0, 0, 0.08),inset 0 3px 6px rgba(0, 0, 0, 0.08), 0 3px 7px rgba(0, 0, 0, 0.11)'
              }}
        >
          <h2 className="text-3xl font-bold text-black mb-4">Ready to Experience the Difference?</h2>
          <p className="text-lg text-[var(--color-text-light)] mb-8">
            Join the thousands of satisfied customers who trust Everything Auto for all their vehicle needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="https://myalp.io/nqc45n" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="btn-primary hover:bg-blue-600 font-semi-bold hover:font-bold text-lg px-8 py-4">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule an Appointment
              </Button>
            </a>
            <a href="tel:516-775-9724">
              <Button size="lg" className="btn-accent hover:bg-red-500 font-semibold hover:font-bold text-lg px-8 py-4">
                <Phone className="w-5 h-5 mr-2" />
                CALL NOW
              </Button>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
