"use client";
import React from "react";
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
  ArrowRight
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
  const carouselRef = useRef();
  const imagesRef = useRef([]);
  const progress = useRef({ value: 0 });
  const radius = 325;

  useEffect(() => {
    const carousel = carouselRef.current;
    const images = imagesRef.current;

    Observer.create({
      target: carousel,
      type: "wheel,pointer",
      onPress: () => {
        carousel.style.cursor = "grabbing";
      },
      onRelease: () => {
        carousel.style.cursor = "grab";
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
      images.forEach((image, index) => {
        const theta = index / images.length - progress.current.value;
        const x = -Math.sin(theta * Math.PI * 2) * radius;
        const y = Math.cos(theta * Math.PI * 2) * radius;
        image.style.transform = `translate3d(${x}px, 0px, ${y}px) rotateY(${
          360 * -theta
        }deg)`;
        const c = Math.floor((index / images.length) * 360);
        // image.style.background = `hsla(${c}, 90%, 50%, .5)`;
      });
    };

    gsap.ticker.add(animate);

    return () => {
      gsap.ticker.remove(animate);
    };
  }, []);
  return (
    <section className="section-padding section-bg">
      <div className="max-w-screen-xl mx-auto px-4">
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
      className="carousel"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "75vh",
        transform: "rotateX(-20deg) translateY(-70px)",
        transformStyle: "preserve-3d",
        perspective: "1000px",
        userSelect: "none",
        cursor: "grab",
        position: "relative", // for absolute children
      }}
    >
       {services.map((service, index) => (
        <div
          key={service.title}
          ref={(el) => (imagesRef.current[index] = el)}
          className="absolute w-[270px] h-[320px]"
          style={{
            transformOrigin: "50% 50%",
          }}
        >
          <Link
            href={createPageUrl(service.path)}
            className="block group"
            aria-label={`Learn more about ${service.title}`}
          >
            <article className="bg-white p-3 pl-12 pr-12 rounded-md h-full border border-gray-200 shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center">
              <div className="mb-4">
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-18 h-20 object-contain"
                />
              </div>

              <h3 className="text-md font-bold text-black mb-2">
                {service.title}
              </h3>

              <p className="text-[var(--color-text-light)] mb-4 text-sm">
                {service.description}
              </p>

              <span className="text-sm text-[var(--color-primary)] font-semibold flex items-center justify-center space-x-2 transition-all duration-300 group-hover:translate-x-1">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </span>
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


        <div className="text-center fade-in-scale">
          <Link href={createPageUrl("Services")} aria-label="View all auto repair services">
            <Button size="lg" className="btn-primary hover:bg-blue-600 font-semibold text-lg px-10 py-4 luxury-shadow">
              View All Our Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}