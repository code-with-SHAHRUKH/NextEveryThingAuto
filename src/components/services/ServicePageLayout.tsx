import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Calendar, CheckCircle, Shield, Wrench } from 'lucide-react';
import Link from 'next/link';
import { createPageUrl } from '@/utils/createPageUrl';
import FAQSection from '../common/FAQSection';

const otherServices = [
    { name: "Engine Repair", path: "EngineRepair" },
    { name: "Brake Service", path: "BrakeService" },
    { name: "Diagnostics", path: "Diagnostics" },
    { name: "Electrical Systems", path: "ElectricalSystems" },
    { name: "Oil Changes", path: "OilChanges" },
    { name: "Wheel & Tire", path: "WheelTire" },
    { name: "Transmission", path: "Transmission" },
    { name: "Air Conditioning", path: "AirConditioning" },
    { name: "Preventative Maintenance", path: "PreventativeMaintenance" },
    { name: "Battery Services", path: "BatteryServices" },
    { name: "NY State Inspection", path: "NYStateInspection" },
    { name: "Suspension & Steering", path: "SuspensionSteering" }
];
import { ReactNode } from "react";
interface ServicePageLayoutProps {
  title: string;
  description: string;
  imageUrl: string;
  children: ReactNode;
  serviceFAQ?: any; // yaha proper type daalna hoga agar pata ho
}
export default function ServicePageLayout({
  title,
  description,
  imageUrl,
  children,
  serviceFAQ,
}: ServicePageLayoutProps) {
    return (
        <div className="bg-[var(--color-background-offset)]">
            {/* Hero Section */}
            <section className="relative py-16 md:py-24 bg-cover bg-center text-white" style={{backgroundImage: `linear-gradient(rgba(13, 71, 161, 0.7), rgba(13, 71, 161, 0.7)), url(${imageUrl})`}}>
                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold mb-4">{title} in Franklin Square</h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">{description}</p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 section-padding">
                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 bg-white p-6 sm:p-8 lg:p-12 rounded-lg shadow-sm border border-[var(--color-border)]">
                        <article className="prose lg:prose-lg max-w-none text-[var(--color-text-light)] prose-h2:text-[var(--color-text)] prose-h3:text-[var(--color-text)] prose-strong:text-[var(--color-text)]">
                            {children}

                            <div className="mt-12 lg:mt-16 p-6 lg:p-8 bg-gray-100 rounded-lg text-center border-t-4 border-blue-600 not-prose">
                                <h3 className="text-xl lg:text-2xl font-bold mb-4 text-gray-800">Ready for Expert Service?</h3>
                                <p className="text-base lg:text-lg text-gray-600 mb-6">
                                    Schedule your appointment online or give us a call. Our team is ready to provide the 5-star service your vehicle deserves.
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                    <a href="https://myalp.io/nqc45n" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                                        <Button size="lg" className="btn-primary w-full font-bold">
                                            <Calendar className="w-5 h-5 mr-2" />
                                            Book Your Appointment
                                        </Button>
                                    </a>
                                    <a href="tel:516-775-9724" className="w-full sm:w-auto">
                                        <Button size="lg" className="btn-accent w-full font-bold">
                                            <Phone className="w-5 h-5 mr-2" />
                                            (516) 775-9724
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6 lg:space-y-8">
                        {/* CTA Card */}
                        <Card className="bg-[var(--color-primary)] text-white">
                            <CardHeader>
                                <CardTitle className="text-xl lg:text-2xl text-white">Schedule Your Service</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-blue-100">Get expert {title.toLowerCase()} from our ASE-certified technicians.</p>
                                <a href="https://myalp.io/nqc45n" target="_blank" rel="noopener noreferrer" className="block">
                                    <Button size="lg" className="w-full btn-accent font-bold text-base lg:text-lg">
                                        <Calendar className="w-5 h-5 mr-2" />
                                        Book Appointment
                                    </Button>
                                </a>
                                <a href="tel:516-775-9724" className="block">
                                    <Button size="lg" variant="outline" className="w-full bg-transparent border-white text-white hover:bg-white hover:text-[var(--color-primary)] font-bold text-base lg:text-lg">
                                        <Phone className="w-5 h-5 mr-2" />
                                        Call Us Now
                                    </Button>
                                </a>
                            </CardContent>
                        </Card>

                        {/* Why Choose Us Card */}
                        <Card className="bg-white border border-[var(--color-border)]">
                            <CardHeader>
                                <CardTitle className="text-xl lg:text-2xl text-[var(--color-text)]">Why Choose Us?</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Shield className="w-6 h-6 text-[var(--color-primary)] mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-[var(--color-text)]">ASE Certified Technicians</h4>
                                        <p className="text-sm text-[var(--color-text-light)]">Expertise you can trust for all makes and models.</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-[var(--color-text)]">Transparent Pricing</h4>
                                        <p className="text-sm text-[var(--color-text-light)]">No hidden fees, just honest assessments.</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Wrench className="w-6 h-6 text-[var(--color-accent)] mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-[var(--color-text)]">Advanced Diagnostics</h4>
                                        <p className="text-sm text-[var(--color-text-light)]">State-of-the-art equipment for accurate repairs.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        {/* Other Services */}
                        <Card className="bg-white border border-[var(--color-border)]">
                            <CardHeader>
                                <CardTitle className="text-lg lg:text-xl">Other Services</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {otherServices.filter(s => s.name !== title).slice(0, 5).map(service => (
                                        <li key={service.path}>
                                            <Link href={createPageUrl(service.path)} className="text-[var(--color-primary)] hover:underline font-semibold text-sm lg:text-base">
                                                {service.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </div>
            
            {/* Service-Specific FAQ */}
            {serviceFAQ && serviceFAQ}
            
            {/* General FAQ Section */}
            <FAQSection />
        </div>
    );
}