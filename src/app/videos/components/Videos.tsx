'use client';
import React from 'react';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, ExternalLink, YoutubeIcon, Youtube, LucideYoutube } from 'lucide-react';
import VideoModal from './VideoModal';
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
        youtubeId: "MvdLs6wmp-s",
        thumbnail: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=480&h=360&fit=crop"
    },
    {
        id: 4,
        title: "Engine Diagnostic Process",
        description: "Watch our expert technicians diagnose and solve complex engine problems using advanced tools.",
        youtubeId: "MvdLs6wmp-s",
        thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=480&h=360&fit=crop"
    },
    // {
    //     id: 5,
    //     title: "Customer Success Stories",
    //     description: "Multiple customers share their positive experiences with Everything Auto's honest service.",
    //     youtubeId: "MvdLs6wmp-s",
    //     thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=480&h=360&fit=crop"
    // },
    {
        id: 6,
        title: "Why Choose Everything Auto",
        description: "Learn about our commitment to quality, transparency, and customer satisfaction.",
        youtubeId: "MvdLs6wmp-s",
        thumbnail: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=480&h=360&fit=crop"
    },
    {
        id: 7,
        title: "Customer Testimonial - Sarah's Experience",
        description: "Hear from Sarah about her experience with our brake service and how we saved her money.",
        youtubeId: "MvdLs6wmp-s",
        thumbnail: "https://img.youtube.com/vi/MvdLs6wmp-s/maxresdefault.jpg"
    },
    {
        id: 8,
        title: "Inside Everything Auto - Shop Tour",
        description: "Take a virtual tour of our state-of-the-art facility and meet our certified technicians.",
        youtubeId: "bfDpZval4uQ",
        thumbnail: "https://img.youtube.com/vi/bfDpZval4uQ/maxresdefault.jpg"
    },
    {
        id: 9,
        title: "Digital Vehicle Inspection Demo",
        description: "See how our digital inspections provide detailed photos and explanations of your vehicle's condition.",
        youtubeId: "MvdLs6wmp-s",
        thumbnail: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=480&h=360&fit=crop"
    },
    {
        id: 10,
        title: "Engine Diagnostic Process",
        description: "Watch our expert technicians diagnose and solve complex engine problems using advanced tools.",
        youtubeId: "MvdLs6wmp-s",
        thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=480&h=360&fit=crop"
    },
    {
        id: 11,
        title: "Customer Testimonial - Sarah's Experience",
        description: "Hear from Sarah about her experience with our brake service and how we saved her money.",
        youtubeId: "MvdLs6wmp-s",
        thumbnail: "https://img.youtube.com/vi/MvdLs6wmp-s/maxresdefault.jpg"
    },
    {
        id: 12,
        title: "Inside Everything Auto - Shop Tour",
        description: "Take a virtual tour of our state-of-the-art facility and meet our certified technicians.",
        youtubeId: "bfDpZval4uQ",
        thumbnail: "https://img.youtube.com/vi/bfDpZval4uQ/maxresdefault.jpg"
    },
    {
        id: 13,
        title: "Digital Vehicle Inspection Demo",
        description: "See how our digital inspections provide detailed photos and explanations of your vehicle's condition.",
        youtubeId: "MvdLs6wmp-s",
        thumbnail: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=480&h=360&fit=crop"
    },
    {
        id: 14,
        title: "Engine Diagnostic Process",
        description: "Watch our expert technicians diagnose and solve complex engine problems using advanced tools.",
        youtubeId: "MvdLs6wmp-s",
        thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=480&h=360&fit=crop"
    },
];

export default function Videos() {
  // State to track how many videos to show. Starts with 5.

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  const [videosToShow, setVideosToShow] = useState(5);
   // Function to load more videos
  const handleLoadMore = () => {
    setVideosToShow(prevCount => prevCount + 5); // Add 5 more videos
  };


    const handleCardClick = (videoId: string) => {
    setSelectedVideoId(videoId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideoId(null);
  };
  const hasMoreVideos = videosToShow < videos.length;
    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="py-24 bg-gray-800 text-white">
                <div className="max-w-screen-xl mx-auto px-4 text-center">
                    <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-white">Our Videos</h1>
                  <p className="text-xl text-gray-200 max-w-3xl mx-auto">
  Take a closer look at our shop, our team, and hear from our happy customers. 
  Trusted since <span className="font-bold text-white">2008</span> with over 
  <span className="font-bold text-white"> 5,000 </span> satisfied customers and 
  <span className="font-bold text-white"> 17+ years </span> of experience.
</p>
                </div>
            </section>

            {/* Videos Grid */}
              <section className="py-20">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
          {/* Use .slice() to display only a portion of the videos array */}
          {videos.slice(0, videosToShow).map(video => (
         <Card

  key={video.id}
  className="overflow-hidden border border-gray-200 rounded-xl shadow-md 
             hover:shadow-lg hover:border-blue-400 transition-all duration-300 
             transform hover:scale-[1.02] bg-white flex flex-col"
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
      <Play   onClick={() => handleCardClick(video.youtubeId)} className="w-16 h-16 text-white transform group-hover:scale-110 transition-transform duration-300" />
    </div>
    {/* Clickable link */}
    {/* <a
      // href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute inset-0"
    /> */}
  </div>
  {/* Content Section - now a flex container */}
  <CardContent className="p-4 flex flex-col flex-grow">
    {/* This div grows to fill the available space */}
    <div className="flex-grow">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{video.title}</h3>
      <p className="text-gray-600 mb-4">{video.description}</p>
    </div>
    {/* Button - pushed to the bottom */}
    <a
      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-auto"
    >
      <Button
      
                      style={{
        boxShadow:
          "inset 0 -2px 5px rgba(138, 193, 252, 0.57), inset 0 2px 5px rgba(19, 19, 19, 0.4), 0 2px 5px rgba(0, 0, 0, 0.11)",
      }}
      className="bg-gradient-to-b from-blue-700 to-gray-100/10 w-full transition-colors duration-300 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <ExternalLink className="w-4 h-4 mr-2" />
        Watch on YouTube
      </Button>
    </a>
  </CardContent>
</Card>
          ))}
        </div>
        {/* 'Load More' Button Section */}
        {hasMoreVideos && (
          <div className="flex justify-center mt-8">
            <Button
             style={{
                        boxShadow:
                          "inset 0 -2px 5px rgba(249, 195, 195, 0.65), inset 0 2px 5px rgba(19, 19, 19, 0.4), 0 2px 5px rgba(0, 0, 0, 0.11)",
                      }}
              onClick={handleLoadMore}
              className="px-6 py-3 text-lg font-semibold bg-gradient-to-b from-red-600 to-gray-100/10 text-white rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl "
            >
              
              Load More Videos
            </Button>
          </div>
        )}
      </div>

         <VideoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        videoId={selectedVideoId}
      />
    </section>

            {/* Subscribe Section */}
            <section className="py-20 bg-gradient-to-b from-blue-900 to-gray-900">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
                    <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                        Subscribe to our YouTube channel for the latest videos, tips, and customer stories.
                    </p>
                   

                          <a href="https://www.youtube.com/@EverythingAutoNY" target="_blank" rel="noopener noreferrer">
              <Button
                                                 style={{
        boxShadow:
          "inset 0 -2px 5px rgba(249, 195, 195, 0.85), inset 0 2px 5px rgba(19, 19, 19, 0.61), 0 8px 14px rgba(0, 0, 0, 0.22)",
      }}
              size="lg" className="bg-gradient-to-b from-red-600 to-gray-100/10 rounded-lg font-semibold text-lg sm:text-xl 
                 px-6 sm:px-8 py-4 sm:py-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <LucideYoutube className="w-5 h-5 mr-2" />
                Subscribe to Our Channel
              </Button>
            </a>
                </div>
            </section>
        </div>
    );
}
