"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink } from 'lucide-react';
import { Tilt } from "react-tilt";
import { motion } from "framer-motion"
import { fadeIn } from '@/utils/motion';
const renderStars = (rating: any) => {
    return (
        <div className="flex">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
            ))}
        </div>
    );
};
type Review = {
    id: number;
    rating: number;
    review_text: string;
    customer_image:string;
    customer_name: string;
    review_date: string;
};
const LiveGoogleReviews = () => {
    const [reviews, setReviews] = useState<Review[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            setIsLoading(true);
            try {
                // Mock data for reviews
                const mockReviews = [
                    {
                        id: 1,
                        rating: 5,
                        review_text: "Amazing service! Everything Auto fixed my transmission issues quickly and professionally. Highly recommend!",
                        customer_image: '',
                        customer_name: "Sarah Johnson",
                        review_date: "2024-01-15"
                    },
                    {
                        id: 2,
                        rating: 5,
                        review_text: "Best auto repair shop in Franklin Square. Honest pricing and excellent work. Will definitely return.",
                        customer_image: '',
                        customer_name: "Mike Rodriguez",
                        review_date: "2024-01-10"
                    },
                    {
                        id: 3,
                        rating: 5,
                        review_text: "Professional, reliable, and fair pricing. Everything Auto has been my go-to for years.",
                        customer_image: '',
                        customer_name: "Jennifer Smith",
                        review_date: "2024-01-08"
                    },
                    {
                        id: 4,
                        rating: 5,
                        review_text: "Outstanding customer service and quality work. They diagnosed and fixed my electrical issues perfectly.",
                        customer_image: '',
                        customer_name: "David Chen",
                        review_date: "2024-01-05"
                    },

                    {
                        id: 5,
                        rating: 5,
                        review_text: "Trustworthy mechanics who really know their stuff. Fair prices and honest recommendations.",
                        customer_image: '',
                        customer_name: "Lisa Thompson",
                        review_date: "2024-01-03"
                    },
                    {
                        id: 6,
                        rating: 5,
                        review_text: "Excellent service from start to finish. Everything Auto is the only place I trust with my car.",
                        customer_image: '',
                        customer_name: "Robert Wilson",
                        review_date: "2024-01-01"
                    }
                ];
                setReviews(mockReviews);
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReviews();
    }, []);

    if (isLoading) {
        return <div className="text-center p-8 text-gray-800">Loading latest 5-star reviews...</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
<motion.div
  key={review.id}
  variants={fadeIn("up", "spring", index * 0.5, 0.75)}
>
  <div className="flex justify-center p-0 font-sans">
    <div className="flex flex-col max-w-sm md:max-w-md w-full">
      
      {/* Review Bubble Card (animated, center aligned) */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="relative bg-white hover:bg-gradient-to-b from-white via-gray-100 to-white p-8 rounded-2xl shadow-md hover:shadow-xl 
                   border border-gray-100 mb-4 w-full transition-all duration-300"
      >
        {/* Star Rating */}
        <div className="flex justify-center space-x-1 mb-3">
          {renderStars(review.rating)}
        </div>

        {/* Review Text */}
        <p className="text-center text-lg text-gray-700 leading-relaxed mb-4 italic">
          &quot;{review.review_text}&quot;
        </p>

        {/* Bubble Tail */}
        <div className="absolute left-8 -bottom-2 
                        w-4 h-4 bg-white rotate-45 border-r border-b border-gray-200">
        </div>
      </motion.div>

      {/* User Info Section (LEFT aligned, connected look) */}
      <div className="flex items-center space-x-3 ml-2 px-1">
        <img
          src={review?.customer_image || "/mypic.png"}
          alt={review.customer_name}
          className="w-12 h-12 rounded-full object-cover border border-gray-300 shadow-sm ring-2 ring-gray-100"
        />
        <div className="flex flex-col text-left">
          <span className="text-lg font-semibold text-gray-800">
            {review.customer_name}
          </span>
          <span className="text-sm text-gray-500">
            {new Date(review.review_date).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  </div>
</motion.div>




            ))}

        </div>

    );
};

export default function ReviewsPage() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="py-24 bg-gray-800 text-white">
                <div className="max-w-screen-xl mx-auto px-4 text-center">
                    <h1 className="text-3xl lg:text-6xl font-semibold mb-4 text-white">Customer Testimonials</h1>
                    {/* <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "40rem" }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-1 bg-gradient-to-b from-blue-800 to-gray-800 mx-auto mb-6 rounded-full"
                        /> */}
                    <p className="text-2xl text-gray-300 max-w-2xl mx-auto text-center">
                        See why over <strong className="font-bold text-white">5,000</strong> customers have trusted us with their vehicles since <strong className="font-bold text-white">2008</strong>.
                        With <strong className="font-bold text-white">17+</strong> years of experience, we&apos;re proud of our <strong className="font-bold text-white">5-star</strong> rating on Google.
                    </p>

                    <div className="flex justify-center mt-4 space-x-2">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ color: "#b8870b3f" }} // dark golden
                                animate={{ color: "#ffd700" }} // bright golden
                                transition={{
                                    duration: 0.8,
                                    delay: i * 0.3, // har star k liye delay left-to-right
                                    ease: "easeInOut",
                                }}
                            >
                                <Star className="w-6 h-6" fill="currentColor" stroke="currentColor" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Testimonial - With Sound */}
            <section className="py-20 bg-white">
                <div className="max-w-screen-xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-black mb-12">Hear From a Happy Customer</h2>
                    <div className="w-full max-w-5xl mx-auto aspect-video rounded-xl overflow-hidden shadow-2xl">
                        <iframe
                            src="https://www.youtube.com/embed/MvdLs6wmp-s?autoplay=1&rel=0&modestbranding=1"
                            title="Customer Testimonial Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* Live Google Reviews */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <div className="flex justify-center items-center w-full mb-6">
                            <div className="h-[3.5px] w-14 bg-gradient-to-b from-blue-800 to-gray-700 rounded-full"></div>
                            <h2 className="text-xl font-bold text-black mx-4">Reviews</h2>
                            <div className="h-[3.5px] w-14 bg-gradient-to-b from-blue-800 to-gray-700 rounded-full"></div>
                        </div>
                        <p className="text-4xl font-bold text-gray-800 mb-6">Here&apos;s what our customers are saying right now on Google.</p>
                        {/* <a href="https://www.google.com/search?q=everything+auto+franklin+square+reviews" target="_blank" rel="noopener noreferrer">
                            <Button size="lg" className="btn-primary hover:bg-blue-600">
                                <ExternalLink className="w-5 h-5 mr-1" />
                                See All Google Reviews
                            </Button>
                        </a> */}
                        <div className="">
                            {/* Card Container */}
                            <div className="bg-white p-6 md:p-4 rounded-2xl shadow-md border border-gray-100 w-full max-w-3xl md:max-w-7xl">
                                {/* Google Reviews Header */}
                                <div className="flex items-center space-x-2 mb-4">
                                    {/* Google Logo-like text with colors */}
                                    <span className="text-3xl font-semibold">
                                        <span className="text-blue-500">G</span>
                                        <span className="text-red-500">o</span>
                                        <span className="text-yellow-500">o</span>
                                        <span className="text-blue-500">g</span>
                                        <span className="text-green-500">l</span>
                                        <span className="text-red-500">e</span>
                                    </span>
                                    {/* Reviews Text */}
                                    <span className="text-xl font-normal text-gray-800">Reviews</span>
                                </div>

                                {/* Rating and Stars Section */}
                                <div className="flex items-center justify-between flex-wrap gap-4 mb-0">
                                    {/* Rating and Star Icons */}
                                    <div className="flex items-center space-x-3">
                                        <span className="text-3xl font-bold text-gray-800">4.8</span>
                                        <div className="flex">
                                            {/* Star Icons as SVGs */}
                                            <Star
                                                className="w-5 h-5 text-[#ffd700]"
                                                fill="currentColor"
                                                stroke="currentColor"
                                            />
                                            <Star
                                                className="w-5 h-5 text-[#ffd700]"
                                                fill="currentColor"
                                                stroke="currentColor"
                                            />
                                            <Star
                                                className="w-5 h-5 text-[#ffd700]"
                                                fill="currentColor"
                                                stroke="currentColor"
                                            />
                                            <Star
                                                className="w-5 h-5 text-[#ffd700]"
                                                fill="currentColor"
                                                stroke="currentColor"
                                            />
                                            <Star
                                                className="w-5 h-5 text-[#ffd700]"
                                                fill="currentColor"
                                                stroke="currentColor"
                                            />
                                        </div>
                                        <span className="text-lg text-gray-500 font-light">(982)</span>
                                    </div>

                                    {/* "Review us" Button */}
                                    <a href="https://www.google.com/search?q=everything+auto+franklin+square+reviews" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-md transition duration-300 transform hover:scale-105">
                                        Review us on Google
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <LiveGoogleReviews />
                </div>
            </section>
        </div>
    );
}
