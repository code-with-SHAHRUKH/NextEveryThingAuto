
'use client';

import { useJsApiLoader } from '@react-google-maps/api';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import Image from 'next/image';

export default function Mowing() {
  const router = useRouter();
  const [address, setAddress] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['drawing', 'places', 'geometry'],
  });

  useEffect(() => {
    if (!isLoaded || !inputRef.current) return;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      types: ['geocode'],
      componentRestrictions: { country: 'us' },
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      console.log("Place details →", place);

      if (place && place.formatted_address) {
        setAddress(place.formatted_address);
      } else {
        setAddress('');
      }
    });

    return () => {
      google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [isLoaded]);

  const handleContinue = () => {
    if (!address.trim()) {
      alert("Please enter your address first!");
      return;
    }
    router.push(`/map?address=${encodeURIComponent(address)}`);
  };

  // Clear lawnAreas from previous session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lawnAreas');
    }
  }, []);

  return (
    <div className="relative w-full h-[25rem] sm:h-[30rem] lg:h-[35rem] mb-0">
      <Image
        src="/Lawn41.jpg"
        alt="Background"
        fill
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center px-4 max-w-2xl w-full">
            <h1 className="text-3xl text-green-500 font-semibold mb-3">
           Get Easy Pricing
          </h1>
          <p className="text-white text-xl mb-6">
           Enter your address and book affordable lawn care for your home.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleContinue();
            }}
            className="bg-white rounded-md flex flex-col sm:flex-row items-center shadow-lg p-2"
          >
            <input
              type="text"
              ref={inputRef}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Property address"
              className="flex-grow border-none focus:ring-0 p-3 rounded-md w-full sm:w-auto"
            />

            <Button
              type="submit"
              disabled={!address.trim()}
              className={`${
                address.trim()
                  ? 'bg-orange-500 hover:bg-orange-600'
                  : 'bg-gray-600 cursor-not-allowed hover:bg-gray-900'
              } text-white font-bold py-3 px-6 mt-3 sm:mt-0 sm:ml-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 sm:w-[160px] md:w-[200px] lg:w-[148px]`}
            >
              Get My Price
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
