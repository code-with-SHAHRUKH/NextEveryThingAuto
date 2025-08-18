import React from 'react';

const HeroBannerSection = () => {
  return (
    <div className="relative text-white overflow-hidden ">
      {/* Background image can be added here if there was one implied by 'new-hero-banner' but not in HTML */}
      For example:
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/Lawn31.jpg')" }}></div>
      <div className="absolute inset-0 bg-black opacity-50"></div> 
      

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:py-20 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-12">
          {/* Banner Left Side - Contains Tabs and Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Tabs Section */}
            <div className="flex space-x-3 mb-5">
              <div className="tab">
               
                  <img
                    src="commercial-tab.png"
                    alt="Commercial Tab"
                    className="w-[200px] h-auto" // Adjust size as needed
                  />
                
              </div>
              <div className="tab">
               
                  <img
                    src="residential-tab.png"
                    alt="Residential Tab"
                    className="w-[199px] h-auto" // Adjust size as needed
                  />
               
              </div>
              <div className="tab">
             
                  <img
                    className="w-[199px] h-auto" // Adjust size as needed
                    src="consumer-tab.png"
                    alt="Consumer Tab"
                    
                  />
             
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-5">
              Property Maintenance <br /> from Sourcing <br /> to Completion
            </h1>

            {/* Description Paragraph */}
            <p className="text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
              Effortless Nationwide Property Maintenance, Efficient Solutions, Superior Results
            </p>

            {/* Call to Action Button */}
            {/* <div
              className="inline-block bg-yellow-400 text-blue-900 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-500 transition duration-300 cursor-pointer"
              id="getQuoteButton1"
            >
              GET A QUOTE TODAY
            </div> */}
          </div>

          {/* Right Side - Implied by the layout, often contains an image or graphic */}
          {/* Placeholder for potential right-side content, e.g., a hero image */}
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0 flex justify-center items-center">
           </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full" style={{ zIndex: 20 }}> {/* Increased z-index to ensure it's above the content and background */}
        <svg id="wave-svg" className="w-full h-auto" viewBox="2 0 2158 147" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path id="Wave" fillRule="evenodd" clipRule="evenodd" d="M 2161.871 148.407 L 1.247 147.783 L 0 0 C 360 80 720 120 1080 120 C 1440 120 1800 80 2160 0 L 2161.871 148.407 Z" fill="white"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroBannerSection;