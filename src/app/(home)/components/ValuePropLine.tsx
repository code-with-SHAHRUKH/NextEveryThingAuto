

import React from 'react';

const valueProps = [
  {
    iconSrc: "/CheckMarkCircle.png",
    alt: "Check Mark Circle",
    title: "Affordable Pricing"
  },
  {
    iconSrc: "/CheckMarkCircle.png",
    alt: "Check Mark Circle",
    title: "Fast Online Ordering"
  },
  {
    iconSrc: "/CheckMarkCircle.png",
    alt: "Check Mark Circle",
    title: "Satisfaction Guaranteed"
  }
];

const ValuePropLineSection = () => {
  return (
    <div className="bg-white"> {/* new-styles equivalent, assuming it just provides a context */}
      <div className="relative bg-gray-800 text-white py-6 md:py-4 flex items-center justify-center shadow-md"> {/* value-prop-line value-prop-line-black flex-v-center */}
        <div className="container max-w-7xl mx-auto px-4"> {/* container */}
          <div className="flex flex-col md:flex-row justify-around items-center space-y-4 md:space-y-0 md:space-x-8"> {/* row flex-v-center */}
            {valueProps.map((prop, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-center text-center sm:text-left col-xs-4-equivalent"> {/* col-xs-4 flex-v-center equivalent */}
                <img
                  src={prop.iconSrc}
                  alt={prop.alt}
                  className="w-8 h-8 mr-0 sm:mr-3 mb-2 sm:mb-0 flex-shrink-0" // Icon size and margin
                />
                <h4 className="text-lg sm:text-xl font-medium whitespace-nowrap">
                  {prop.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
        
       
      </div>
    </div>
  );
};

export default ValuePropLineSection;