'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Star, ExternalLink } from 'lucide-react';

// Type for each review
type Review = {
  id: number;
  rating: number;
  review_text: string;
  customer_name: string;
};

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>([]); // Typed state

  useEffect(() => {
    const fetchReviews = async () => {
      // Mock featured reviews data
      const mockFeaturedReviews: Review[] = [
        {
          id: 1,
          rating: 5,
          review_text:
            "Everything Auto is the best! They fixed my transmission issues quickly and professionally. The digital inspection showed me exactly what was wrong with photos and explanations. Highly recommend!",
          customer_name: "Sarah Johnson",
        },
        {
          id: 2,
          rating: 5,
          review_text:
            "I've been coming here for years. Always honest, fair prices, and exceptional work. The digital vehicle inspection is amazing - they show you pictures of everything. Best shop in Nassau County!",
          customer_name: "Mike Rodriguez",
        },
        {
          id: 3,
          rating: 5,
          review_text:
            "Got my NY State Inspection done here. Fast, friendly, and efficient. The digital inspection report they provide is incredible - shows photos of every issue. Will definitely return!",
          customer_name: "Jennifer Smith",
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
  {reviews.map((review) => (
    <div
      key={review.id}
      className="relative bg-gradient-to-b from-white to-gray-50 p-3 rounded-t-lg rounded-b-2xl border border-gray-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Decorative Top Border Glow */}
      <style>
{`
  @keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradientFlow 1s ease infinite;
  }
`}
</style>
    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-3xl animate-gradient" />

      {/* Stars */}
  <div className="bg-white shadow-sm rounded-xl p-4 mb-6 min-h-[220px]">
  {/* Stars */}
  <div className="flex items-center space-x-2 mb-4">
    {renderStars(review.rating)}
  </div>

  {/* Review Text */}
  <p className="text-gray-700 italic leading-relaxed">
    &quot;{review.review_text}&quot;
  </p>
</div>



      {/* Customer Info */}
      <div className="flex items-center space-x-4 pl-4 pb-2">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
          {review.customer_name.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-900">
            {review.customer_name}
          </h3>
          <p className="text-sm text-gray-500">Google Review</p>
        </div>
      </div>
    </div>
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
          "inset 0 -2px 5px rgba(249, 195, 195, 0.42), inset 0 2px 5px rgba(19, 19, 19, 0.4), 0 8px 14px rgba(0, 0, 0, 0.22)",
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
