"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink } from 'lucide-react';
import {Tilt} from "react-tilt";
import { motion } from "framer-motion"
import  {fadeIn}  from '@/utils/motion';
const renderStars = (rating) => {
    return (
        <div className="flex">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
            ))}
        </div>
    );
};

const LiveGoogleReviews = () => {
    const [reviews, setReviews] = useState([]);
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
                        customer_name: "Sarah Johnson",
                        review_date: "2024-01-15"
                    },
                    {
                        id: 2,
                        rating: 5,
                        review_text: "Best auto repair shop in Franklin Square. Honest pricing and excellent work. Will definitely return.",
                        customer_name: "Mike Rodriguez",
                        review_date: "2024-01-10"
                    },
                    {
                        id: 3,
                        rating: 5,
                        review_text: "Professional, reliable, and fair pricing. Everything Auto has been my go-to for years.",
                        customer_name: "Jennifer Smith",
                        review_date: "2024-01-08"
                    },
                    {
                        id: 4,
                        rating: 5,
                        review_text: "Outstanding customer service and quality work. They diagnosed and fixed my electrical issues perfectly.",
                        customer_name: "David Chen",
                        review_date: "2024-01-05"
                    },
                    {
                        id: 5,
                        rating: 5,
                        review_text: "Trustworthy mechanics who really know their stuff. Fair prices and honest recommendations.",
                        customer_name: "Lisa Thompson",
                        review_date: "2024-01-03"
                    },
                    {
                        id: 6,
                        rating: 5,
                        review_text: "Excellent service from start to finish. Everything Auto is the only place I trust with my car.",
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
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {reviews.map((review, index) => (
            <motion.div key={review.id} variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
          <Tilt
            options={{
              max: 45,
              scale: 1,
              speed: 450,
            }}
            // className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
          >
    <Card
      className="flex flex-col border border-gray-200 rounded-xl shadow-md 
                
                 transition-all duration-300 transform hover:scale-[1.02] bg-gradient-to-b from-white via-gray-100 to-gray-50"
    >
      <CardContent className="p-6 flex-grow">
        {/* Rating stars */}
        <div className="flex items-center mb-3">
          {renderStars(review.rating)}
        </div>

        {/* Review text */}
        <p className="text-gray-700 italic mb-4 leading-relaxed">
          &quot;{review.review_text}&quot;
        </p>
      </CardContent>

      {/* Footer with name & date */}
      <div className="bg-white p-4 border-t border-gray-200 rounded-b-xl">
        <p className="font-bold text-black">{review.customer_name}</p>
        <p className="text-sm text-gray-500">
          {new Date(review.review_date).toLocaleDateString()}
        </p>
      </div>
    </Card>
    </Tilt>
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
                  <p className="text-2xl text-gray-200 max-w-2xl mx-auto">
  See why over <strong className="font-bold text-white">5,000</strong> customers have trusted us with their vehicles since <strong className="font-bold text-white">2008</strong>. 
  With <strong className="font-bold text-white">17+</strong> years of experience, we&apos;re proud of our <strong className="font-bold text-white">5-star</strong> rating on Google.
</p>
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
                        <h2 className="text-4xl font-bold text-black mb-4">Our 5-Star Google Reviews</h2>
                        <p className="text-lg text-gray-600 mb-6">Here&apos;s what our customers are saying right now on Google.</p>
                        <a href="https://www.google.com/search?q=everything+auto+franklin+square+reviews" target="_blank" rel="noopener noreferrer">
                            <Button size="lg" className="btn-primary hover:bg-blue-600">
                                <ExternalLink className="w-5 h-5 mr-1" />
                                See All Google Reviews
                            </Button>
                        </a>
                    </div>
                    <LiveGoogleReviews />
                </div>
            </section>
        </div>
    );
}
