import React from 'react';

const featureCardsData = [
  {
    iconSrc: "/calendar-alert-icon.svg",
    iconAlt: "Calendar Alert Icon",
    title: "Automated Services",
    detail: "Work is automatically scheduled based on local seasonal weather conditions."
  },
  {
    iconSrc: "/card-icon.svg",
    iconAlt: "Card Icon",
    title: "No Price Haggling",
    detail: "Fair market rates ensure top-quality service from expert contractors at competitive prices."
  },
  {
    iconSrc: "/clipboard-icon.svg",
    iconAlt: "Clipboard Icon",
    title: "Quality Monitoring",
    detail: "Contractors take before-and-after pictures of every job, and our team manually verifies to ensure work is completed."
  },
  {
    iconSrc: "/cart-icon.svg",
    iconAlt: "Cart Icon",
    title: "Easy Ordering",
    detail: "Maintain services for your entire portfolio in one single app."
  },
  {
    iconSrc: "/calendar-icon.svg",
    iconAlt: "Calendar Icon",
    title: "Save Time",
    detail: "No need to search for and vet contractors - we've got you covered!"
  },
  {
    iconSrc: "/shield-icon.svg",
    iconAlt: "Shield Icon",
    title: "Reliable Contractors",
    detail: "All contractors are certified and insured and undergo a thorough vetting process."
  },
];

const FeaturesBenefitsSection = () => {
  return (
    <div className="bg-gradient-to-b from-gray-100 to-white py-16"> {/* prop-cards-background equivalent, a subtle gradient */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* prop-cards equivalent */}

        {/* Features & Benefits Details */}
        <div className="text-center mb-12"> {/* prop-cards-details equivalent */}
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
            Features &amp; Benefits of Mowed
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Property Maintenance made simple, convenient and efficient.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featureCardsData.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-md transition duration-300"> {/* card equivalent */}
              <div className="flex-shrink-0 mb-4"> {/* prop-icon equivalent */}
                <img
                  src={card.iconSrc}
                  alt={card.iconAlt}
                  className="w-16 h-16 object-contain" // Adjust icon size as needed
                />
              </div>
              <div>
                <label className="block text-2xl font-bold text-gray-800 mb-2"> {/* card-title equivalent */}
                  {card.title}
                </label>
                <p className="text-gray-600 text-base leading-relaxed"> {/* card-detail equivalent */}
                  {card.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Get a Quote Button */}
        {/* <div className="text-center">
          <button
            className="inline-block bg-yellow-400 text-blue-900 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-500 transition duration-300 cursor-pointer text-lg"
            id="getQuoteButton2"
          >
            GET A QUOTE TODAY
          </button>
        </div> */}

      </div>
    </div>
  );
};

export default FeaturesBenefitsSection;