"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { createPageUrl } from "@/utils/createPageUrl";
import { Button } from "@/components/ui/button";
import { 
  Wrench, 
  Disc3,
  Search, 
  Zap, 
  Droplet, 
  LifeBuoy,
  Cog, 
  CheckCircle2,
  ArrowRight,
  PenTool,
  TowerControlIcon,
  Server
} from "lucide-react";


import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";


gsap.registerPlugin(Observer);

const services = [
  { icon: '/car-engine.png', title: "Engine Repair", path: "EngineRepair", description: "Expert diagnostics and repair for engine troubles." },
  { icon: '/disc-brake.webp', title: "Brake Service", path: "BrakeService", description: "Ensuring your vehicle stops safely and reliably." },
  { icon: '/diagnostics.webp', title: "Diagnostics", path: "Diagnostics", description: "Pinpointing issues with check engine lights." },
  { icon: '/electric-system.webp', title: "Electrical Systems", path: "ElectricalSystems", description: "Fixing shorts, wiring, and battery issues." },
  { icon: 'oil-change.webp', title: "Oil Changes", path: "OilChanges", description: "Essential maintenance for engine longevity." },
  { icon: 'Tire-repairing.webp', title: "Wheel & Tire", path: "WheelTire", description: "Tire rotation, balancing, and replacement." },
  { icon: 'gear-Transmition.webp', title: "Transmission", path: "Transmission", description: "Smooth gear shifting and performance." },
  { icon: 'car-engine-diagnostic.webp', title: "NY State Inspection", path: "NYStateInspection", description: "Official vehicle safety and emissions testing." }
];



export default function ServicesOverview() {
  
//card 3d rotation
  const carouselRef = useRef<HTMLDivElement | null>(null);
const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  const progress = useRef({ value: 0 });
  const [radius, setRadius] = useState(326);
// Mobileradius=160;
useEffect(() => {
  // 👇 on mount, screen size check
  const updateRadius = () => {
    if (window.innerWidth < 640) {
      // mobile
      setRadius(145);
    } else {
      // tablet/laptop/desktop
      setRadius(326);
    }
  };

  updateRadius(); // initial
  window.addEventListener("resize", updateRadius);

  const carousel = carouselRef?.current;
  const images = imagesRef.current;

  Observer.create({
    target: carousel,
    type: "wheel,pointer",
    onPress: () => {
      if (carousel) carousel.style.cursor = "grabbing";
    },
    onRelease: () => {
      if (carousel) carousel.style.cursor = "grab";
    },
    onChange: (self) => {
      gsap.killTweensOf(progress.current);
      const p =
        self.event.type === "wheel"
          ? self.deltaY * -0.0005
          : self.deltaX * 0.05;
      gsap.to(progress.current, {
        duration: 2,
        ease: "power4.out",
        value: `+=${p}`,
      });
    },
  });

  const animate = () => {
    const images = imagesRef.current;
    if (!images) return;

    images.forEach((image, index) => {
      const theta = index / images.length - progress.current.value;
      const x = -Math.sin(theta * Math.PI * 2) * radius;
      const y = Math.cos(theta * Math.PI * 2) * radius;
      if (image) {
        image.style.transform = `translate3d(${x}px, 0px, ${y}px) rotateY(${
          360 * -theta
        }deg)`;
      }
    });
  };

  gsap.ticker.add(animate);

  return () => {
    gsap.ticker.remove(animate);
    window.removeEventListener("resize", updateRadius);
  };
}, [radius]); // radius dependency
  return (
    <section className="section-padding section-bg bg-[radial-gradient(circle_at_center,theme(colors.gray.300),theme(colors.white))] shadow-[0_8px_40px_rgba(0,0,0,0.95)]">
      <div className="max-w-screen-xl mx-auto px-4 ">
        <div className="text-center mb-0 slide-in-up">
          <p className="text-lg font-semibold text-[var(--color-primary)] uppercase tracking-wider">Our Expertise</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-black mt-2 mb-4">
            Comprehensive Auto Repair Services
          </h2>
          <p className="text-lg text-[var(--color-text-light)] max-w-3xl mx-auto">
            From routine maintenance to complex repairs, our ASE-certified technicians have the skills and equipment to handle all your automotive needs with our digital inspection technology.
          </p>
        </div>

<div
  ref={carouselRef}
  className="carousel flex justify-center items-center relative cursor-grab select-none"
  style={{
    width: "100%",
    height: "70vh",
    transform: "rotateX(-20deg) translateY(-70px)",
    transformStyle: "preserve-3d",
    perspective: "1200px",
  }}
>
{services.map((service, index) => (
  <div
    key={service.title}
    ref={(el) => {
      imagesRef.current[index] = el;
    }}
    className="
      mt-12
      mb-0
      md:mb-8
      sm:mb-6
      absolute
      w-[120px] h-[250px]        /* mobile */
      sm:w-[220px] sm:h-[260px]  /* tablet */
      md:w-[270px] md:h-[260px]  /* laptop/desktop (same height) */
    "
    style={{ transformOrigin: "50% 50%" }}
  >
    <Link
      href={createPageUrl(service.path)}
      className="block group h-full"
      aria-label={`Learn more about ${service.title}`}
    >
      <article
        className="
          bg-gradient-to-b from-white to-gray-50 
          p-4 rounded-md h-full
          border border-gray-200 shadow-xl 
          transition-all duration-500 hover:-translate-y-2 
          flex flex-col items-center text-center
        "
      >
        {/* Icon */}
        <div className="mb-3">
          <img
            src={service.icon}
            alt={service.title}
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
          />
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-md font-bold text-black mb-2 line-clamp-2">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[var(--color-text-light)] mb-4 line-clamp-3 sm:line-clamp-4">
          {service.description}
        </p>

        {/* Button */}
        <div className="mt-auto">
          <span
            className="text-xs sm:text-sm text-[var(--color-primary)]
                       flex items-center justify-center space-x-1 
                       transition-all duration-300 group-hover:translate-x-1"
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </article>
    </Link>
  </div>
))}

</div>


        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
  {services.map((service, index) => (
    <Link
      href={createPageUrl(service.path)}
      key={service.title}
      className="block group"
      aria-label={`Learn more about ${service.title}`}
    >
      <article
        className="bg-white p-8 rounded-xl h-full border border-gray-200 luxury-shadow transition-all duration-500 hover:-translate-y-2 fade-in-scale flex flex-col items-center text-center"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="mb-5">
          <img
            src={service.icon}
            alt={service.title}
            className="w-18 h-20 object-contain"
          />
        </div>

        <h3 className="text-xl font-bold text-black mb-2">
          {service.title}
        </h3>

        <p className="text-[var(--color-text-light)] mb-4 text-base">
          {service.description}
        </p>

        <span className="text-[var(--color-primary)] font-semibold flex items-center space-x-2 transition-all duration-300 group-hover:translate-x-1">
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4" />
        </span>
      </article>
    </Link>
  ))}
</div> */}


        <div className="text-center fade-in-scale mt-14">
          <Link href={createPageUrl("Services")} aria-label="View all auto repair services">
            <Button 
                                              style={{
        boxShadow:
          "inset 0 -2px 5px rgba(165, 208, 255, 0.61), inset 0 2px 5px rgba(19, 19, 19, 0.4), 0 8px 14px rgba(0, 0, 0, 0.25)",
      }}
            size="lg" className="bg-gradient-to-b from-blue-700 to-gray-100/10 rounded-lg font-semibold text-lg px-6 py-4 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
               <Wrench className="w-5 h-5 mr-2" />
              View All Our Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}