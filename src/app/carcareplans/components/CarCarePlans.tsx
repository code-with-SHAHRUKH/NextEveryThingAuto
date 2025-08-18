"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  Shield,
  Car,
  Wrench,
  Crown,
  Star,
  Award,
  Gem,
  Phone,
  Zap,
  TrendingUp,
  Users,
  Download,
  Loader2
} from "lucide-react";
import {Tilt} from "react-tilt";
import { motion } from "framer-motion"
import  {fadeIn}  from '@/utils/motion';
type Plan = {
  id: number;
  name: string;
  monthly_price: number;
  yearly_price: number;
  is_popular:boolean;
  description: string;
  features: string[];
};
interface PlanCardProps {
  plan: Plan;
  index: number;
}
export default function CarCarePlans() {
 const [plans, setPlans] = useState<Plan[]>([]);
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        // Mock data for car care plans
        const mockPlans = [
          {
            id: 1,
            name: "Essential",
            monthly_price: 29.99,
            yearly_price: 299.99,
            description: "Basic maintenance coverage for budget-conscious drivers",
            is_popular:false,
            features: [
              "Oil changes every 3,000 miles",
              "Tire rotation",
              "Multi-point inspection",
              "10% discount on parts"
            ]
          },
          {
            id: 2,
            name: "Basic",
            monthly_price: 49.99,
            yearly_price: 499.99,
            description: "Comprehensive coverage for daily drivers",
            is_popular:false,
            features: [
              "All Essential features",
              "Brake inspection & service",
              "Battery testing & replacement",
              "15% discount on parts",
              "Priority scheduling"
            ]
          },
          {
            id: 3,
            name: "Bronze",
            monthly_price: 79.99,
            yearly_price: 799.99,
            description: "Enhanced protection for family vehicles",
            is_popular:true,
            features: [
              "All Basic features",
              "Transmission service",
              "Cooling system maintenance",
              "20% discount on parts",
              "Free towing (up to 25 miles)"
            ]
          },
          {
            id: 4,
            name: "Silver",
            monthly_price: 119.99,
            yearly_price: 1199.99,
            description: "Premium coverage for luxury vehicles",
            is_popular:false,
            features: [
              "All Bronze features",
              "Electrical system diagnostics",
              "Suspension & steering service",
              "25% discount on parts",
              "Free loaner car (when available)"
            ]
          },
          {
            id: 5,
            name: "Gold",
            monthly_price: 159.99,
            yearly_price: 1599.99,
              description: "Ultimate protection for high-performance vehicles",
              is_popular:false,
            features: [
              "All Silver features",
              "Engine diagnostics & tuning",
              "Performance upgrades consultation",
              "30% discount on parts",
              "VIP customer service"
            ]
          },
          {
            id: 6,
            name: "VIP",
            monthly_price: 199.99,
            yearly_price: 1999.99,
            description: "Exclusive coverage for premium vehicles",
            is_popular:false,
            features: [
              "All Gold features",
              "Concierge service",
              "Mobile service available",
              "35% discount on parts",
              "Lifetime warranty on labor"
            ]
          }
        ];
        setPlans(mockPlans);
      } catch (err) {
        console.error('Failed to load plans:', err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const handleDownloadBrochure = async () => {
    setIsDownloading(true);
    try {
        // Simulate brochure download
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert('Brochure download feature is currently being updated. Please contact us for more information about our car care plans.');
    } catch (error) {
        console.error("Failed to download brochure:", error);
    } finally {
        setIsDownloading(false);
    }
  };

  const  PlanCard: React.FC<PlanCardProps> = ({ plan, index }) =>  {
    const getIcon = (planName: any) => {
        switch(planName) {
            case 'Essential': return <Shield className="w-8 h-8 text-white"/>;
            case 'Basic': return <Wrench className="w-8 h-8 text-white"/>;
            case 'Bronze': return <Shield className="w-8 h-8 text-white"/>;
            case 'Silver': return <Star className="w-8 h-8 text-white"/>;
            case 'Gold': return <Award className="w-8 h-8 text-white"/>;
            case 'VIP': return <Gem className="w-8 h-8 text-white"/>;
            default: return <Car className="w-8 h-8 text-white"/>;
        }
    };

    const getPlanColors = (planName:any) => {
        switch(planName) {
            case 'Essential': return {
                gradient: 'from-green-500 to-emerald-600',
                accent: 'bg-green-500',
                text: 'text-green-800',
                border: 'border-green-400'
            };
            case 'Basic': return {
                gradient: 'from-blue-500 to-blue-600',
                accent: 'bg-blue-500',
                text: 'text-blue-800',
                border: 'border-blue-400'
            };
            case 'Bronze': return {
                gradient: 'from-orange-500 to-amber-600',
                accent: 'bg-orange-500',
                text: 'text-orange-800',
                border: 'border-orange-400'
            };
            case 'Silver': return {
                gradient: 'from-gray-500 to-slate-600',
                accent: 'bg-gray-500',
                text: 'text-gray-800',
                border: 'border-gray-400'
            };
            case 'Gold': return {
                gradient: 'from-yellow-500 to-amber-500',
                accent: 'bg-yellow-500',
                text: 'text-yellow-800',
                border: 'border-yellow-400'
            };
            case 'VIP': return {
                gradient: 'from-purple-600 to-indigo-700',
                accent: 'bg-purple-600',
                text: 'text-purple-800',
                border: 'border-purple-400'
            };
            default: return {
                gradient: 'from-blue-500 to-blue-600',
                accent: 'bg-blue-500',
                text: 'text-blue-800',
                border: 'border-blue-400'
            };
        }
    };

    const isEssential = plan.name === 'Essential';
    const isVIP = plan.name === 'VIP';
    const colors = getPlanColors(plan.name);
    // Ensure monthly_price is not zero to prevent division by zero
    const yearlyDiscount = plan.monthly_price > 0 
        ? Math.round(((plan.monthly_price * 12 - plan.yearly_price) / (plan.monthly_price * 12)) * 100)
        : 0;

    return (
       <div 
  className={`transform transition-all duration-700 hover:scale-10 hover:-translate-y-2 flex flex-col`}
 
>
    
  <Card className={`relative overflow-hidden m-4 border-2 bg-gradient-to-b from-white via-gray-100 to-gray-50 shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col ${colors.border} ${isVIP ? 'ring-2 ring-purple-300' : ''} ${isEssential ? 'ring-2 ring-green-300' : ''}`}
   
  >

    {/* Gradient Header with Shine Animation */}
    <div className={`bg-gradient-to-r ${colors.gradient} text-white p-8 text-center relative overflow-hidden`}>
      {/* Overlay Shine Effect */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 bg-[length:200%_100%] animate-[shine_3s_linear_infinite]" />
      
      <div className="relative z-10">
        <div className="border-2 w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm shadow-inner">
          {getIcon(plan.name)}
        </div>
        <h3 className="text-3xl font-bold mb-2 drop-shadow-sm text-gray-700">{plan.name} Plan</h3>
        <p className="text-white/90 text-lg h-10">{plan.description}</p>
      </div>
    </div>

    <CardContent className="p-8 flex flex-col flex-grow">
      
      {/* Popular / Essential Badge */}
      {plan?.is_popular && (
        <div className="mb-6 text-center">
          <Badge className={`${colors.accent} text-white px-6 py-2 text-sm font-bold shadow-lg animate-bounce`}>
            {isEssential ? 'ONLINE EXCLUSIVE' : 'MOST POPULAR'}
          </Badge>
        </div>
      )}

      {/* VIP Highlight */}
      {isVIP && (
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-100 to-indigo-100 border-2 border-purple-300 rounded-xl shadow-inner">
          <div className="text-center">
            <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 text-sm font-bold mb-3 animate-pulse">
              🌟 PREMIUM COVERAGE 🌟
            </Badge>
            <p className="text-purple-900 font-bold text-lg leading-tight">
              <span className="bg-yellow-300 px-2 py-1 rounded shadow">FULL VEHICLE COVERAGE</span>
            </p>
            <p className="text-purple-800 text-sm mt-2 font-semibold">
              Everything excluding catalytic converters, paint, body panels, and/or anything attached to the exterior of the vehicle
            </p>
          </div>
        </div>
      )}

      {/* Pricing */}
      <div className="text-center mb-8">
        <div className="flex items-baseline justify-center mb-2">
          <span className="text-3xl font-bold text-gray-900">
            ${billingPeriod === 'monthly' ? plan.monthly_price : plan.yearly_price}
          </span>
          <span className="text-3xl text-gray-600 ml-2">
            /{billingPeriod === 'monthly' ? 'month' : 'year'}
          </span>
        </div>

        {billingPeriod === 'yearly' && yearlyDiscount > 0 && (
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Badge variant="outline" className="text-green-600 border-green-600">
              Save {yearlyDiscount}%
            </Badge>
            <span className="text-sm text-gray-500 line-through">
              ${plan.monthly_price * 12}/year
            </span>
          </div>
        )}
        
        {isEssential && (
          <Badge className="bg-green-100 text-green-800 font-semibold shadow-sm">
            Cancel Anytime!
          </Badge>
        )}
      </div>

      {/* Features List with Glow */}
      <ul className="space-y-2 mb-8 flex-grow h-44 max-h-48 md:max-h-64 overflow-y-auto">
        {Array.isArray(plan.features) && plan.features.map((feature:any, i:any) => (
          <li key={i} className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0 animate-pulse" />
            <span className={`text-gray-700 ${feature.includes('🚨') ? 'font-semibold text-orange-600' : ''}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <div className="space-y-3 mt-auto">
        <a href="tel:516-775-9724" className="block">
          <Button
            className={`w-full py-4 text-md font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl bg-gradient-to-r ${colors.gradient} text-white border-0 ${isEssential ? 'animate-pulse hover:animate-none' : ''}`}
          >
            <Phone className="w-5 h-5 mr-2" />
            {isEssential ? 'JOIN ONLINE EXCLUSIVE' : 'ENROLL NOW'}
          </Button>
        </a>
        <p className="text-center text-sm text-gray-500">
          Call (516) 775-9724 to get started
        </p>
      </div>
    </CardContent>

    {/* Decorative Bubbles */}
    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
  </Card>

  {/* Keyframes for Shine Effect
  <style jsx>{`
    @keyframes shine {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `}</style> */}
</div>

    );
  };

  if (loading) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Loading our amazing car care plans...</p>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
            <div className="mb-6">
              <Badge className="bg-white/20 text-white px-4 py-2 text-base font-semibold backdrop-blur-sm">
                💎 Premium Auto Care Plans Franklin Square NY
              </Badge>
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent">
              Choose Your Perfect Car Care Plan in Franklin Square
            </h1>
            <p className="text-xl lg:text-2xl text-white max-w-4xl mx-auto leading-relaxed mb-8">
              Join thousands of smart drivers who save time and money with our comprehensive maintenance plans. 
              Trusted by Franklin Square and Nassau County since 2008. Starting at just $5/month!
            </p>
            
            {/* Social Proof */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-white">
              <div className="flex items-center space-x-2">
                <Users className="w-6 h-6" />
                <span className="font-semibold">5,000+ Happy Customers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-6 h-6 text-yellow-400" />
                <span className="font-semibold">5.0 Google Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6" />
                <span className="font-semibold">17+ Years Experience</span>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full translate-x-48 translate-y-48"></div>
        </section>

        {/* Billing Toggle */}
        <section className="py-16">
          <div className="mx-auto px-0">
            <div className="text-center mb-12">
              <Tabs value={billingPeriod} onValueChange={setBillingPeriod} className="inline-block">
                <TabsList className="bg-gray-50 backdrop-blur-sm p-0 rounded-3xl shadow-lg border border-gray-300">
                  <TabsTrigger 
                    value="monthly" 
                    className="px-3 py-3 font-semibold data-[state=active]:bg-gray-400 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-3xl transition-all duration-300"
                  >
                    Monthly Plans
                  </TabsTrigger>
                  <TabsTrigger 
                    value="yearly" 
                    className="px-2 py-3 pl-3 font-semibold data-[state=active]:bg-gray-400 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-3xl transition-all duration-300"
                  >
                    <span className="flex items-center space-x-1">
                      <span>Yearly Plans</span>
                      <Badge className="bg-green-500 text-white text-xs animate-pulse">Save up to 20%</Badge>
                    </span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Plans Grid - Now 2 columns max for better visibility */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-2 mb-16 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <PlanCard key={plan.id} plan={plan} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Why Do You Need A Car Care Plan?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Protect your investment and save money with preventive maintenance
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-4">
              <div className="text-center group transform transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-md p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-gray-200 animate-fadeIn">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <TrendingUp className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Increase Reliability</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Well-maintained vehicles can exceed 200,000 miles, while poorly maintained ones have a much shorter lifespan. Regular care keeps you on the road longer.
                </p>
              </div>
              
              <div className="text-center group transform transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-md p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-gray-200 animate-fadeIn">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Shield className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Ensure Safety</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Nearly 40% of car crashes are due to preventable mechanical failures. Our comprehensive inspections and maintenance keep you and your family safe.
                </p>
              </div>
              
              <div className="text-center group transform transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-md p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-gray-200 animate-fadeIn">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Zap className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Decrease Costs</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Neglecting routine maintenance can lead to repairs that cost 4x more than regular upkeep. Prevention is always cheaper than repair.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Brochure Download Section */}
        <section className="py-20 shadow-lg bg-gradient-to-r from-gray-50 to-blue-100">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <div className="bg-white rounded-2xl p-12 shadow-xl" style={{
                boxShadow: 'inset 0 -3px 8px rgba(0, 0, 0, 0.08),inset 0 3px 6px rgba(0, 0, 0, 0.08), 0 3px 7px rgba(0, 0, 0, 0.11)'
              }}>
                    <Download className="w-16 h-16 mx-auto text-blue-600 mb-6" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Download Our Car Care Brochure</h2>
                    <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                        Get a detailed, print-friendly overview of all our car care plans to review at your convenience.
                    </p>
                    {/* <Button
                        size="lg"
                        className="btn-primary font-bold text-lg px-8 py-4"
                        onClick={handleDownloadBrochure}
                        disabled={isDownloading}
                    >
                        {isDownloading ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Downloading...
                            </>
                        ) : (
                            <>
                                <Download className="w-5 h-5 mr-2" />
                                Download Brochure (PDF)
                            </>
                        )}
                    </Button> */}
                </div>
            </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20 bg-gradient-to-r from-blue-100 to-gray-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="bg-white rounded-2xl p-12"  style={{
                boxShadow: 'inset 0 -3px 8px rgba(0, 0, 0, 0.08),inset 0 3px 6px rgba(0, 0, 0, 0.08), 0 3px 7px rgba(0, 0, 0, 0.11)'
              }}>
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-2xl lg:text-3xl font-medium text-gray-900 mb-8 italic">
                &quot;Everything Auto&apos;s car care plan has saved me thousands of dollars in unexpected repairs. The digital inspections show me exactly what&apos;s happening with my car. Best investment I&apos;ve made!&quot;
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">SM</span>
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900">Sarah Martinez</p>
                  <p className="text-gray-600">Franklin Square Resident, 3-Year Member</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Protect Your Investment?
            </h2>
            <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Everything Auto for their vehicle care. Call now to enroll in the perfect plan for your needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="tel:516-775-9724">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 font-bold text-xl px-12 py-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <Phone className="w-6 h-6 mr-3" />
                  Call (516) 775-9724 Now
                </Button>
              </a>
              <div className="text-blue-100">
                <p className="font-semibold text-blue-200">Mon-Sat: 8AM-6PM</p>
                <p className="text-sm text-blue-200">Quick enrollment in under 5 minutes</p>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}
