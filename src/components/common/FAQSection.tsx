import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const faqs = [
    {
        question: "How long does an auto repair take at Everything Auto in Franklin Square?",
        answer: "Most routine services like oil changes and inspections take 15-30 minutes. Brake repairs typically take 1-2 hours, while engine diagnostics can take 1-3 hours depending on complexity. We always provide accurate time estimates upfront and keep you informed throughout the process."
    },
    {
        question: "Do you work on all car makes and models?",
        answer: "Yes! Our ASE-certified technicians are trained to work on all makes and models, including domestic, import, luxury, hybrid, and electric vehicles. From Honda and Toyota to BMW and Mercedes-Benz, we have the expertise and equipment to service your vehicle properly."
    },
    {
        question: "What makes Everything Auto different from other auto repair shops in Nassau County?",
        answer: "We're a family-owned shop with 17+ years of experience serving Franklin Square and Nassau County. We offer transparent pricing, digital vehicle inspections with photos, same-day service for most repairs, and we're an official NYS inspection station. Our 5-star Google rating reflects our commitment to honest, quality service."
    },
    {
        question: "Do you offer warranties on your auto repair work?",
        answer: "Absolutely! We stand behind our work with comprehensive warranties. Parts and labor warranties vary by service type, but we always guarantee our workmanship. We'll explain warranty coverage before any work begins so you have complete peace of mind."
    },
    {
        question: "Can I get a quote for my car repair before bringing my vehicle in?",
        answer: "We're happy to provide estimates over the phone for common services like oil changes, brake pads, and inspections. For complex repairs, we recommend bringing your vehicle in for our FREE diagnostic service to provide the most accurate quote possible."
    },
    {
        question: "Do you accept walk-ins or do I need an appointment?",
        answer: "We welcome both! Walk-ins are accepted for NY State inspections and quick services. For major repairs or during busy periods, scheduling an appointment ensures faster service. You can book online at myalp.io/nqc45n or call (516) 775-9724."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept cash, all major credit cards (Visa, MasterCard, American Express, Discover), and debit cards. We also offer financing options for larger repairs to help make quality auto care affordable for everyone."
    },
    {
        question: "How often should I get my car serviced?",
        answer: "We recommend following your vehicle manufacturer's maintenance schedule, typically every 3,000-7,500 miles for oil changes depending on your driving conditions. Annual NY State inspections are required by law. Our digital inspections help identify potential issues early, saving you money on major repairs."
    },
    {
        question: "Do you offer emergency auto repair services?",
        answer: "While we don't offer 24/7 emergency service, we prioritize urgent repairs during business hours (Mon-Sat 8am-6pm). For breakdowns, call us first - we often can provide same-day service for critical safety issues like brake problems or engine troubles."
    },
    {
        question: "What areas do you serve besides Franklin Square?",
        answer: "We proudly serve Franklin Square and surrounding Nassau County communities including Hempstead, West Hempstead, Garden City, Elmont, Valley Stream, Mineola, Floral Park, Uniondale, and beyond. Many customers drive from across Long Island for our honest service and digital inspections."
    }
];

export default function FAQSection({ showSearch = false, title = "Frequently Asked Questions" }) {
    const [openIndex, setOpenIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFAQs = useMemo(() => {
        if (!searchTerm.trim()) return faqs;
        return faqs.filter(faq => 
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const toggleFAQ = (index:any) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-4">
                        {title}
                    </h2>
                    <p className="text-lg text-[var(--color-text-light)] max-w-2xl mx-auto">
                        Get answers to the most common questions about our auto repair services in Franklin Square, NY.
                    </p>
                </div>

                {showSearch && (
                    <div className="mb-8">
                        <div className="relative max-w-md mx-auto">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                type="text"
                                placeholder="Search FAQs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 py-3 text-lg rounded-xl border-2 focus:border-blue-500"
                            />
                        </div>
                        {searchTerm && (
                            <p className="text-center text-gray-600 mt-2">
                                {filteredFAQs.length} result(s) found for &quot;{searchTerm}&quot;
                            </p>
                        )}
                    </div>
                )}

                <div className="space-y-4">
                    {filteredFAQs.length > 0 ? filteredFAQs.map((faq, index) => (
                        <Card key={index} className="border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden">
                            <CardContent className="p-0">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full p-6 text-left flex items-center justify-between bg-gradient-to-b from-white to-gray-50 hover:bg-gray-50 transition-colors duration-200 group"
                                >
                                    <h3 className="text-lg font-semibold text-[var(--color-text)] pr-4 transition-colors">
                                        {faq.question}
                                    </h3>
                                    <div className="flex-shrink-0">
                                        {openIndex === index ? (
                                            <ChevronUp className="w-5 h-5 text-blue-600 transition-transform duration-200" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-blue-600 transition-colors duration-200" />
                                        )}
                                    </div>
                                </button>
                                {openIndex === index && (
                                    <div className="bg-gray-50 px-6 pb-6 animate-fadeIn">
                                        <div className="border-gray-100 pt-4">
                                            <p className="text-[var(--color-text-light)] leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No FAQs found matching your search.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}