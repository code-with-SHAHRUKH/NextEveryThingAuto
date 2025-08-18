
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, ExternalLink } from 'lucide-react';

const videos = [
    {
        id: 1,
        title: "Customer Testimonial - Sarah's Experience",
        description: "Hear from Sarah about her experience with our brake service and how we saved her money.",
        youtubeId: "MvdLs6wmp-s",
        thumbnail: "https://img.youtube.com/vi/MvdLs6wmp-s/maxresdefault.jpg"
    },
    {
        id: 2,
        title: "Inside Everything Auto - Shop Tour",
        description: "Take a virtual tour of our state-of-the-art facility and meet our certified technicians.",
        youtubeId: "bfDpZval4uQ",
        thumbnail: "https://img.youtube.com/vi/bfDpZval4uQ/maxresdefault.jpg"
    },
    {
        id: 3,
        title: "Digital Vehicle Inspection Demo",
        description: "See how our digital inspections provide detailed photos and explanations of your vehicle's condition.",
        youtubeId: "example3",
        thumbnail: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=480&h=360&fit=crop"
    },
    {
        id: 4,
        title: "Engine Diagnostic Process",
        description: "Watch our expert technicians diagnose and solve complex engine problems using advanced tools.",
        youtubeId: "example4",
        thumbnail: "https://images.unsplash.com/photo-1543946207-639a6d96572e?w=480&h=360&fit=crop"
    },
    {
        id: 5,
        title: "Customer Success Stories",
        description: "Multiple customers share their positive experiences with Everything Auto's honest service.",
        youtubeId: "example5",
        thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=480&h=360&fit=crop"
    },
    {
        id: 6,
        title: "Why Choose Everything Auto",
        description: "Learn about our commitment to quality, transparency, and customer satisfaction.",
        youtubeId: "example6",
        thumbnail: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=480&h=360&fit=crop"
    }
];

export default function Videos() {
    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="py-24 bg-gray-800 text-white">
                <div className="max-w-screen-xl mx-auto px-4 text-center">
                    <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-white">Our Videos</h1>
                    <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                        Take a closer look at our shop, our team, and hear from our happy customers. Trusted since 2008 with over 5,000 satisfied customers and 17+ years of experience.
                    </p>
                </div>
            </section>

            {/* Videos Grid */}
            <section className="py-20">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {videos.map(video => (
                       <Card
  key={video.id}
  className="overflow-hidden border border-gray-200 rounded-xl shadow-md 
             hover:shadow-lg hover:border-blue-400 transition-all duration-300 
             transform hover:scale-[1.02] bg-white"
>
  {/* Thumbnail Section */}
  <div className="relative group cursor-pointer overflow-hidden">
    <img
      src={video.thumbnail}
      alt={video.title}
      className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
    />

    {/* Overlay with Play Icon */}
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <Play className="w-16 h-16 text-white transform group-hover:scale-110 transition-transform duration-300" />
    </div>

    {/* Clickable link */}
    <a
      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute inset-0"
    />
  </div>

  {/* Content Section */}
 <CardContent className="p-6 flex flex-col flex-grow">
    <div className="flex-grow min-h-[150px]">
  <h3 className="text-xl font-bold text-gray-900 mb-2">{video.title}</h3>
  <p className="text-gray-600 mb-4">{video.description}</p>
</div>
    {/* Button - always at bottom */}
    <a
      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-auto"
    >
      <Button className="btn-primary w-full hover:bg-blue-600 transition-colors duration-300">
        <ExternalLink className="w-4 h-4 mr-2" />
        Watch on YouTube
      </Button>
    </a>
  </CardContent>
</Card>

                        ))}
                    </div>
                </div>
            </section>

            {/* Subscribe Section */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Subscribe to our YouTube channel for the latest videos, tips, and customer stories.
                    </p>
                    <a href="https://www.youtube.com/@EverythingAutoNY" target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="btn-accent hover:bg-red-500 font-bold">
                            <ExternalLink className="w-5 h-5 mr-2" />
                            Subscribe to Our Channel
                        </Button>
                    </a>
                </div>
            </section>
        </div>
    );
}
