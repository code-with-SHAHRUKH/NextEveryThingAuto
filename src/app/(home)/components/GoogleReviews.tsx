'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Star, ExternalLink } from 'lucide-react';
import Image from "next/image";
// Type for each review
type Review = {
  id: number;
  rating: number;
  review_text: string;
  customer_image:string;
  customer_name: string;
  review_date:string;
};
import { motion } from "framer-motion"
import { fadeIn } from '@/utils/motion';
export default function GoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>([]); // Typed state

  useEffect(() => {
    const fetchReviews = async () => {
      // Mock featured reviews data
      const mockFeaturedReviews: Review[] = [
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
      ];
      setReviews(mockFeaturedReviews);
    };
    fetchReviews();
  }, []);

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="section-padding bg-white">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-lg font-semibold text-[var(--color-primary)] uppercase tracking-wider">
            Testimonials
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-black mt-2 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-[var(--color-text-light)] max-w-3xl mx-auto">
            We&apos;re proud of our 5-star rating on Google. Here&apos;s what our satisfied customers have to say about their experience.
          </p>
        </div>

        {reviews.length > 0 && (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
  {reviews.map((review,index) => (
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
        className="relative bg-gradient-to-b from-white via-gray-100 to-gray-50 p-8 rounded-2xl shadow-md hover:shadow-2xl 
                   border border-gray-100 mb-5 w-full transition-all duration-300"
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
                        w-4 h-4 bg-gray-50 rotate-45 border-r border-b border-gray-200">
        </div>
      </motion.div>

      {/* User Info Section (LEFT aligned, connected look) */}
      <div className="flex items-center space-x-3 ml-2 px-1">
        <Image
  src={review?.customer_image || "/mypic.png"}
  alt={review.customer_name}
  width={48}  // w-12 = 48px
  height={48} // h-12 = 48px
  className="rounded-full object-cover border border-gray-300 shadow-sm ring-2 ring-gray-100"
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

        )}

        <div className="text-center">
          <a
            href="https://www.google.com/search?q=everything+auto+franklin+square+reviews"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button 
                                       style={{
        boxShadow:
          "inset 0 -2px 5px rgba(249, 195, 195, 0.57), inset 0 2px 5px rgba(19, 19, 19, 0.4), 0 8px 14px rgba(0, 0, 0, 0.22)",
      }}
            size="lg" className="bg-gradient-to-b from-red-600 to-gray-100/10 rounded-lg font-semibold text-lg px-8 py-4 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <ExternalLink className="w-5 h-5 mr-2" />
              Read More Reviews
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
