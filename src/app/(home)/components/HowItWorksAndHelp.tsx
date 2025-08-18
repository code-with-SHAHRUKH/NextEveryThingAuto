import React from 'react';

// 1. Define Interfaces for your data structures
interface HowItWorksItem {
  imageSrc: string;
  alt: string;
  title: string;
  description: string;
  imageClass?: string; // imageClass is optional for CardItemProps
}

interface HelpItem { // This interface can be used for both customers and contractors data
  imageSrc: string;
  alt: string;
  title: string;
  description: string;
}

// Data for "How TaskEasy works" section - now explicitly typed
const howItWorksData: HowItWorksItem[] = [
  {
    imageSrc: "/mowlawn_click.png",
    alt: "Ordering with Mowed is easy.",
    title: "Click",
    description: "Simply answer a few questions about your home and task to see your instant price."
  },
  {
    imageSrc: "/mowlawn_book.png",
    alt: "Book your service with the Mowed app or online.",
    title: "Book",
    description: "No bidding, haggling, or waiting for calls. Buy your service instantly just like shopping online."
  },
  {
    imageSrc: "/mowlawn_relax.png",
    alt: "Mowed is an expert in lawn care and lawn mowing.",
    title: "Relax",
    description: "Mowed arranges for your service and ensures your satisfaction with our 100% money back guarantee."
  },
];

// Data for "How TaskEasy helps customers" section - now explicitly typed
const howCustomersHelpData: HelpItem[] = [
  {
    imageSrc: "/calendar.png",
    alt: "Mowed Calendar.",
    title: "Weekly & Bi-Weekly Plans",
    description: "Choose the service frequency that meets your budget and lawn care needs."
  },
  {
    imageSrc: "/price.png",
    alt: "Prices at Mowed are fair and fixed.",
    title: "No Price Haggling",
    description: "No need to haggle over bids. You'll get a fair, set price based on market demands."
  },
  {
    imageSrc: "/guaranteed.png",
    alt: "Mowed lawn care services are guaranteed.",
    title: "Guaranteed Service",
    description: "If you aren't completely satisfied, we'll make it right or refund your money."
  },
  {
    imageSrc: "/easy.png",
    alt: "Placing an order with Mowed is easy.",
    title: "Easy Online Ordering",
    description: "Buy a variety of tasks easily on one site, just like shopping online."
  },
  {
    imageSrc: "/save-time.png",
    alt: "Save time using Mowed.",
    title: "Save Time",
    description: "Finding and managing a contractor wastes time. We've done the busy work for you!"
  },
  {
    imageSrc: "/licensed.png",
    alt: "Mowed is licensed and insured.",
    title: "Licensed & Insured",
    description: "Each Mowed contractor must pass a screening and carry insurance."
  },
];

// 2. Define Interfaces for component props
interface SectionHeaderProps {
  title: string;
}

interface CardItemProps {
  imageSrc: string;
  alt: string;
  title: string;
  description: string;
  imageClass?: string; // Optional prop
}

const HowItWorksAndHelpSection: React.FC = () => { // Use React.FC for the main component
  const commonCaretImage: string = "/caretline-grey.png";

  // Use React.FC for sub-components and explicitly type their props
  const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => (
    <div className=''>
      <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
        {title}
      </h2>
      <div className="flex justify-center mb-12 max-w-9xl">
        <img src={commonCaretImage} alt="Decorative line" className="w-auto h-4" />
      </div>
    </div>
  );

  const CardItem: React.FC<CardItemProps> = ({ imageSrc, alt, title, description, imageClass = "" }) => (
    <div className="flex flex-col items-center text-center p-6 shadow-md hover:shadow-sm rounded-lg bg-gradient-to-b from-gray-50 to-white transition duration-300 ">
      <img
        src={imageSrc}
        alt={alt}
        className={`w-24 h-24 object-contain mb-4 ${imageClass}`}
      />
      <h4 className="text-xl sm:text-2xl font-bold text-orange-500 mb-3">
        {title}
      </h4>
      <p className="text-base text-green-600 leading-relaxed">
        {description}
      </p>
    </div>
  );

  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* How TaskEasy works section */}
        <section className="text-center mb-20" id="anchor-step-0">
          <SectionHeader title="How Mowed works" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Explicitly type 'item' and 'index' in map functions */}
            {howItWorksData.map((item: HowItWorksItem, index: number) => (
              <CardItem key={index} {...item} imageClass="to-landing" />
            ))}
          </div>
        </section>

        {/* How TaskEasy helps customers section */}
        <section className="text-center mb-20" id="anchor-step-1">
          <SectionHeader title="How Mowed helps customers" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Explicitly type 'item' and 'index' in map functions */}
            {howCustomersHelpData.map((item: HelpItem, index: number) => (
              <CardItem key={index} {...item} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default HowItWorksAndHelpSection;