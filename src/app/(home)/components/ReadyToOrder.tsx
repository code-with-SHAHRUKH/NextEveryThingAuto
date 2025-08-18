import React from 'react';

const ReadyToOrderSection: React.FC = () => {
  return (
    <div className="py-16 text-center" id="anchor-step-4"> {/* new-styles text-center equivalent, adding padding */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Simple section container */}
        <h2 className="text-4xl sm:text-5xl font-medium text-orange-500 mb-8"> {/* h2 styling */}
          Ready to Order lawn care services?
        </h2>
        <a
          href="/lawnmowing"
          title="Lawn Mowing"
          className="inline-block bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-500 transition duration-300 text-lg" // btn btn-primary btn-lg equivalent, pull-down2 implied by mt-4
          data-type="MOWLAWN"
          data-list="Get Your Price Popover"
        >
          Get My Lawn Price <span className="ml-2">&#8594;</span> {/* fa fa-chevron-circle-right replaced with an arrow entity, ml-2 for spacing */}
         
        </a>
      </section>
    </div>
  );
};

export default ReadyToOrderSection;