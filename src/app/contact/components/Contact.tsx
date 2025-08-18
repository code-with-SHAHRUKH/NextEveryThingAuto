"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock, Star, Users, Award, Shield } from 'lucide-react';
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
export default function Contact() {
        const { ref, inView } = useInView({ triggerOnce: true });
    const [formData, setFormData] = useState({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        service_type: '',
        message: '',
    });
    const [formStatus, setFormStatus] = useState({ message: '', type: '' });

    const handleInputChange = (e:any) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (value:any) => {
        setFormData(prev => ({ ...prev, service_type: value }));
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setFormStatus({ message: 'Sending...', type: 'info' });
        
        // Simulate form submission
        setTimeout(() => {
            setFormStatus({ message: 'Thank you! This is a demo site. In a real application, your message would be sent to our team.', type: 'success' });
            setFormData({ customer_name: '', customer_email: '', customer_phone: '', service_type: '', message: '' });
        }, 2000);
    };

    return (
        <div className="bg-[var(--bg-light)]">
            {/* SEO Hero Section */}
            <section className="py-20 bg-gradient-to-br from-[var(--primary-navy)] to-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                        Contact Everything Auto - Franklin Square&apos;s Premier Auto Repair Shop
                    </h1>
                    <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
                        Get in touch with Franklin Square&apos;s most trusted auto repair experts. With 17+ years of experience 
                        and over 5,000 satisfied customers since 2008, we&apos;re here to keep your vehicle running smoothly. 
                        Located at 980 Washington St, we serve Franklin Square, Hempstead, Garden City, and all of Nassau County.
                    </p>
                </div>
            </section>

            {/* Trust Indicators */}
            <section ref={ref} className="py-12 bg-gradient-to-r from-yellow-50 via-blue-50 to-green-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                       
                        <div className="flex flex-col items-center">
                            <Star className="w-12 h-12 text-yellow-500 mb-3" />
                            <div className="text-3xl font-bold text-[var(--text-primary)]">{inView && <CountUp end={5.0} duration={2} decimals={1} />}</div>
                            <div className="text-[var(--text-secondary)]">Google Rating</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <Award className="w-12 h-12 text-blue-600 mb-3" />
                            <div className="text-3xl font-bold text-[var(--text-primary)]">{inView && <CountUp end={17} duration={3} />}+</div>
                            <div className="text-[var(--text-secondary)]">Years Experience</div>
                        </div>
                         <div className="flex flex-col items-center">
                            <Users className="w-12 h-12 text-blue-600 mb-3" />
                            <div className="text-3xl font-bold text-[var(--text-primary)]"> {inView && <CountUp end={5000} duration={3} separator="," />}+</div>
                            <div className="text-[var(--text-secondary)]">Happy Customers</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <Shield className="w-12 h-12 text-green-600 mb-3" />
                            <div className="text-3xl font-bold text-[var(--text-primary)]">Licensed</div>
                            <div className="text-[var(--text-secondary)]">& Insured</div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Contact Form */}
                    <div>
                        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
                            Schedule Your Auto Repair Service in Franklin Square, NY
                        </h2>
                        <p className="text-[var(--text-secondary)] mb-8 text-lg">
                            Ready to experience the difference that 17+ years of automotive expertise makes? 
                            Fill out our form below or call us directly at (516) 775-9724. We provide honest estimates, 
                            quality repairs, and exceptional customer service for all makes and models.
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <Input 
                                    id="customer_name" 
                                    placeholder="Your Full Name" 
                                    value={formData.customer_name} 
                                    onChange={handleInputChange} 
                                    required 
                                    className="text-lg py-3"
                                />
                                <Input 
                                    id="customer_phone" 
                                    type="tel" 
                                    placeholder="Phone Number" 
                                    value={formData.customer_phone} 
                                    onChange={handleInputChange} 
                                    required 
                                    className="text-lg py-3"
                                />
                            </div>
                            <Input 
                                id="customer_email" 
                                type="email" 
                                placeholder="Email Address" 
                                value={formData.customer_email} 
                                onChange={handleInputChange} 
                                required 
                                className="text-lg py-3"
                            />
                            <Select onValueChange={handleSelectChange} value={formData.service_type}>
                                <SelectTrigger className="text-lg py-3">
                                    <SelectValue placeholder="What automotive service do you need?" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="general-inquiry">General Inquiry</SelectItem>
                                    <SelectItem value="engine-repair">Engine Repair & Diagnostics</SelectItem>
                                    <SelectItem value="brake-service">Brake Service & Repair</SelectItem>
                                    <SelectItem value="diagnostics">Check Engine Light Diagnostics</SelectItem>
                                    <SelectItem value="oil-change">Oil Change Service</SelectItem>
                                    <SelectItem value="transmission">Transmission Repair</SelectItem>
                                    <SelectItem value="electrical">Electrical System Repair</SelectItem>
                                    <SelectItem value="ny-inspection">NY State Inspection</SelectItem>
                                    <SelectItem value="other">Other Auto Repair Service</SelectItem>
                                </SelectContent>
                            </Select>
                            <Textarea 
                                id="message" 
                                placeholder="Tell us about your vehicle's issue or what service you need..." 
                                rows={5} 
                                value={formData.message} 
                                onChange={handleInputChange} 
                                required 
                                className="text-lg"
                            />
                            <Button type="submit" size="lg" className="w-full btn-primary font-bold text-lg py-4">
                                Get Your Free Estimate Today
                            </Button>
                            {formStatus.message && (
                                <p className={`text-center font-medium text-lg ${
                                    formStatus.type === 'success' ? 'text-green-600' : 
                                    formStatus.type === 'error' ? 'text-red-600' : 'text-gray-600'
                                }`}>
                                    {formStatus.message}
                                </p>
                            )}
                        </form>
                    </div>

                    {/* Contact Info & Map */}
                  

                    
                    {/* Contact Info & Map */}
                    <div className="space-y-8">
                      <Card
  style={{
    boxShadow:
      "inset 0 -3px 8px rgba(0, 0, 0, 0.08), inset 0 3px 6px rgba(0, 0, 0, 0.08), 0 3px 7px rgba(0, 0, 0, 0.11)",
  }}
>
  <CardContent className="p-4 sm:p-6 lg:p-8">
    <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-4 sm:mb-6">
      Visit Franklin Square&apos;s Most Trusted Auto Shop
    </h3>
    <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg">
      <li className="flex items-start sm:items-center space-x-3 sm:space-x-4">
        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
        <a
          href="https://www.google.com/maps/place/980+Washington+St,+Franklin+Square,+NY+11010"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-blue-600 break-words"
        >
          980 Washington St, Franklin Square, NY 11010
        </a>
      </li>

      <li className="flex items-start sm:items-center space-x-3 sm:space-x-4">
        <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
        <a
          href="tel:516-775-9724"
          className="text-gray-700 hover:text-blue-600 font-semibold break-words"
        >
          (516) 775-9724 - Call Now for Same-Day Service
        </a>
      </li>

      <li className="flex items-start sm:items-center space-x-3 sm:space-x-4">
        <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
        <a
          href="mailto:everythingautonewyork@gmail.com"
          className="text-gray-700 hover:text-blue-600 break-words"
        >
          everythingautonewyork@gmail.com
        </a>
      </li>

      <li className="flex items-start sm:items-center space-x-3 sm:space-x-4">
        <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
        <div>
          <div className="font-semibold text-gray-700">
            Monday - Saturday: 8:00 AM - 6:00 PM
          </div>
          <div className="text-gray-600">Sunday: Closed</div>
        </div>
      </li>
    </ul>
  </CardContent>
</Card>

                        
                        {/* Google Map */}
                        <div className="luxury-shadow rounded-lg overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.532393390715!2d-73.68369498459516!3d40.70613397933256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2627e1f6aa39b%3A0x889b9a3f2c168c7e!2s980%20Washington%20St%2C%20Franklin%20Square%2C%20NY%2011010%2C%20USA!5e0!3m2!1sen!2s!4v1678886655443!5m2!1sen!2s"
                                width="100%"
                                height="400"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Everything Auto Location - 980 Washington St, Franklin Square, NY"
                            ></iframe>
                        </div>

                        {/* Service Areas */}
                        <Card
  style={{
    boxShadow:
      "inset 0 -3px 8px rgba(0, 0, 0, 0.08), inset 0 3px 6px rgba(0, 0, 0, 0.08), 0 3px 7px rgba(0, 0, 0, 0.11)",
  }}
>
  <CardContent className="p-4 sm:p-6 lg:p-8">
    <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-3 sm:mb-4">
      Serving Long Island Communities
    </h3>

    <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-3 sm:mb-4">
      We proudly serve customers throughout Nassau County including:
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base">
      <span>• Franklin Square</span>
      <span>• Hempstead</span>
      <span>• Garden City</span>
      <span>• Elmont</span>
      <span>• West Hempstead</span>
      <span>• Uniondale</span>
      <span>• Mineola</span>
      <span>• Floral Park</span>
    </div>
  </CardContent>
</Card>

                                            </div>
                </div>
            </div>
        </div>
    );
}
