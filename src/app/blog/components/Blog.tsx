"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createPageUrl } from '@/utils/createPageUrl';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  publish_date: string;
  category: string;
  featured_image: string;
};

export default function Blog() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            // Mock blog posts data
            const mockPosts = [
              
                {
                    id: 1,
                    title: "Essential Car Maintenance Tips for Long Island Drivers",
                    slug: "essential-car-maintenance-tips",
                    excerpt: "Learn the essential maintenance tips to keep your vehicle running smoothly in Long Island's unique driving conditions.",
                    publish_date: "2024-01-15",
                    category: "maintenance-tips",
                    featured_image: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=600&h=400&fit=crop"
                },
                {
                    id: 2,
                    title: "How to Choose the Right Oil for Your Vehicle",
                    slug: "choose-right-oil-vehicle",
                    excerpt: "Understanding the different types of motor oil and how to select the best one for your specific vehicle and driving conditions.",
                    publish_date: "2024-01-10",
                    category: "oil-changes",
                    featured_image: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=600&h=400&fit=crop"
                },
                {
                    id: 3,
                    title: "Signs Your Brakes Need Attention",
                    slug: "brake-warning-signs",
                    excerpt: "Recognize the warning signs that indicate your brakes need professional inspection and service.",
                    publish_date: "2024-01-05",
                    category: "brake-service",
                    featured_image: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=600&h=400&fit=crop"
                },
                {
                    id: 4,
                    title: "Winter Driving Safety Checklist",
                    slug: "winter-driving-checklist",
                    excerpt: "Prepare your vehicle for Long Island's winter weather with our comprehensive safety checklist.",
                    publish_date: "2024-01-01",
                    category: "seasonal-maintenance",
                    featured_image: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=600&h=400&fit=crop"
                },
                {
                    id: 5,
                    title: "Understanding Your Vehicle's Electrical System",
                    slug: "vehicle-electrical-system",
                    excerpt: "A comprehensive guide to your car's electrical components and common issues to watch for.",
                    publish_date: "2023-12-28",
                    category: "electrical-systems",
                    featured_image: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=600&h=400&fit=crop"
                },
                {
                    id: 6,
                    title: "The Importance of Regular Tire Maintenance",
                    slug: "tire-maintenance-importance",
                    excerpt: "Why proper tire care is crucial for safety, performance, and fuel efficiency on Long Island roads.",
                    publish_date: "2023-12-25",
                    category: "tire-service",
                    featured_image: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=600&h=400&fit=crop"
                }
            ];
            setPosts(mockPosts);
            setIsLoading(false);
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <div className="py-24 bg-gray-800 text-white">
                <div className="max-w-screen-xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold text-white">Our Auto Care Blog</h1>
                     <p className="text-xl text-gray-200 max-w-3xl mx-auto mt-4">
                        Expert tips, advice, and news from the technicians at Everything Auto.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-3 gap-5">
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, index) => (
                            <Card key={index} className="animate-pulse">
                                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                                <CardContent className="p-6 space-y-4">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                    <div className="h-10 bg-gray-200 rounded w-1/3 mt-4"></div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        posts.map(post => (
                      <Card
  key={post.id}
  className="overflow-hidden group transition-shadow duration-300 shadow-md hover:shadow-lg flex flex-col bg-white"
>
  <Link href={createPageUrl(`BlogPost?slug=${post.slug}`)} className="block overflow-hidden">
    <img
      src={post.featured_image}
      alt={post.title}
      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
    />
  </Link>

  <CardContent className="p-6 flex flex-col flex-grow">
    {/* Date & Category */}
    <div className="flex items-center flex-wrap gap-4 text-sm text-gray-500 mb-3">
      <div className="flex items-center space-x-1">
        <Calendar className="w-4 h-4" />
        <span>{new Date(post.publish_date).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Tag className="w-4 h-4" />
        <span className="capitalize">{post.category.replace('-', ' ')}</span>
      </div>
    </div>

    {/* Title */}
    <h3 className="text-xl font-bold text-[var(--dark-blue)] mb-2 line-clamp-2">
      <Link
        href={createPageUrl(`BlogPost?slug=${post.slug}`)}
        className="hover:text-blue-600 transition-colors"
      >
        {post.title}
      </Link>
    </h3>

    {/* Excerpt */}
    <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">
      {post.excerpt}
    </p>

    {/* Read More Button Fixed at Bottom */}
    <div className="mt-auto">
      <Link href={createPageUrl(`BlogPost?slug=${post.slug}`)}>
        <Button
          variant="link"
          className="p-0 text-blue-600 font-semibold group-hover:underline"
        >
          Read More <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </Link>
    </div>
  </CardContent>
</Card>

                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
