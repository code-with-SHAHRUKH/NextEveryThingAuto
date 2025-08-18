// export type Video = {
//     id:string
//   termArabic: string;
//   termRoman: string;
//   explanationEnglish: string;
//   explanationHindi: string;
//   explanationUrdu: string;
//   source: string;
//   reference: string;
//   videoLink: string;
//   otherReference: string;
//   owner: string;
//   quranReferences: string[];
//   createdAt: string;
//   updatedAt: string;
// };

// Type define karo
export interface Frequency {
  frequency: string;
  value: number;
}

export type Order = {
  _id: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  address: string;
  selectedCountry?: string;
  ZipCode?: string;
  additionalInstructions?: string;
  billingAddress?: string;
  billingCity?: string;
  selectedFrequency: Frequency;
  selectedPackage:string;
  selectedWeek: string[]; // Dates as ISO strings
  serviceStartOption:string;
  totalPerService: number;
  totalSize: number;
  cardholderName: string;
  cardNumber: string;
  expiryMonth: string;
  orderStatus:string;
  expiryYear: string;
  cvv: string;
  createdAt: string;
  updatedAt: string;
};

