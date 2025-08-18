"use client";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import React, { useEffect } from "react";
import { BASE_URL } from "@/utils/apiConfig";
import { useRouter } from "next/navigation";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Check, Info, X } from 'lucide-react'; // Importing icons from lucide-react

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getVideos, deleteVideo, updateVideo, getUserOrders } from "@/http/api";
import { Order, Frequency } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";
import useTokenStore from "@/store";
interface PackageData {
  type: string;
  name: string;
  price: number;
  features: string[];
}
export interface LawnArea {
  id: string;
  path: google.maps.LatLngLiteral[];
  sizeSqFt: number;
  budgetCost: number;
  premiumCost: number;
}
// import { decodeToken } from '@/utils/decodeToken';
const getDaysInMonth = (year: number, month: number) => { // Added type annotations for clarity
  return new Date(year, month + 1, 0).getDate();
};
// Helper to get the first day of the month (0 for Sunday, 6 for Saturday)
const getFirstDayOfMonth = (year: number, month: number) => { // Added type annotations for clarity
  return new Date(year, month, 1).getDay();
};

function getWeekDates(date: any) {
  const dayOfWeek = date.getDay(); // 0 (Sun) to 6 (Sat)
  const weekStart = new Date(date);
  weekStart.setDate(date.getDate() - dayOfWeek); // Start of week (Sunday)

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });
}
const Orders = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  let [totalSize, setTotalSize] = useState<number | null>(null);
  let [totalBudgetCost, settotalBudgetCost] = useState<number | null>(null);
  let [totalPremiumCost, setTotalPremiumCost] = useState<number | null>(null);
  const queryClient = useQueryClient(); // React Query ka cache update karne ke liye
  const [loadingId, setLoadingId] = useState<string | null>(null); // Track loading state for a specific video
  const [ratesLoaded, setRatesLoaded] = useState(false);
  const [rates, setRates] = useState({
    budgetRate: 0.0023,
    premiumRate: 0.004,
    weeklyMowing: 1,
    biweeklyMowing: 1.5,
    oneTimeMowing: 2
  });
  console.log("Rates from State:", rates);
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/v1/rates/getRates`);
        const data = await res.json();
        if (data?.data) {
          console.log("Rates from server on Update page:", data.data);
          setRates({
            budgetRate: data.data.budgetRate,
            premiumRate: data.data.premiumRate,
            weeklyMowing: data.data.weeklyMowing,
            biweeklyMowing: data.data.biweeklyMowing,
            oneTimeMowing: data.data.oneTimeMowing
          });
          setRatesLoaded(true);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchRates();
  }, [activeStep]);

  console.log("Active step:", activeStep)
  const { token } = useTokenStore((state) => state);

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getUserOrders,
    staleTime: 10000,
  });

  const videos = response?.data?.data
  // let totalSize;
  const deleteMutation = useMutation({
    mutationFn: async (orderId: string) => {
      // API call ke liye videoId pass karna zaroori hai
      return deleteVideo(orderId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] }); // UI update karega
      setLoadingId(null); // Reset loading state
    },
    onError: () => {
      setLoadingId(null); // Reset loading state in case of error
    },
  });
  const handleDelete = (orderId: string) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setLoadingId(orderId); // Start loading for this video
      deleteMutation.mutate(orderId);
    }
  };

  const router = useRouter();
  const [status, setStatus] = useState<string>('pending');
  function handlefulfill() {
    setStatus('fulfill');
    setActiveStep(3);
  }

  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const handleContinue = async (orderId: string) => {
    setActiveStep(2);
    console.log("is order ko update krna he...", orderId);
    setEditingOrderId(orderId);
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/orders/single-Order/${orderId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const order: Order = response.data.data; // adjust path if your ApiResponse shape differs
      console.log("selected Order:", order);
      // Populate states from fetched order
      setSelectedFrequency(order.selectedFrequency);
      setSelectedPackage(order.selectedPackage);
      setServiceStartOption(order.serviceStartOption || "now");

      if (order.selectedWeek && Array.isArray(order.selectedWeek)) {
        // Convert to Date objects if they are stringified
        const weekDates = order.selectedWeek.map((d: string | Date) => new Date(d));
        setSelectedWeek(weekDates);
      } else {
        setSelectedWeek([]);
      }

      setAdditionalInstructions(order.additionalInstructions || "");
      setFullName(order.fullName || "");
      setEmailAddress(order.emailAddress || "");
      setPhoneNumber(order.phoneNumber || "");
      setbillingAddress(order.billingAddress || "");
      setCardholderName(order.cardholderName || "");
      setcity(order.billingCity || "");
      setSelectedCountry(order.selectedCountry || "United States");
      const areaInSqFeet = order.totalSize || 0;
      console.log("Update k time total area", areaInSqFeet);
      let budgetCost = areaInSqFeet * rates.budgetRate;
      let premiumCost = areaInSqFeet * rates.premiumRate;
      console.log('budgetCost:', budgetCost, 'budgetRate:', rates.budgetRate);
      console.log('premiumCost:', premiumCost, 'premiumRate:', rates.premiumRate);
      if (!ratesLoaded) {
        console.warn("Rates not loaded yet; will initialize costs after rates arrive");
        return;
      }
      // populate the derived totals
      settotalBudgetCost(null)
      setTotalPremiumCost(null)
      setTimeout(() => {
        setTotalSize(areaInSqFeet);
        settotalBudgetCost(budgetCost);
        setTotalPremiumCost(premiumCost);
      }, 0);
      if (order.fullName !== "") {
        setUseDifferentBillingAddress(true);
      }
      // Recompute totals if needed (your existing derived values will update if they're based on selectedPackage)
    } catch (err) {
      console.error("Failed to load order:", err);
      toast.error("Could not load order details.");
    }

  };
  const handleBack = () => {
    setStatus('pending');
    setActiveStep(1);
  };

  const BacktoEdit = () => {
    setStatus('in-progress');
    setActiveStep(2);
  };
  // ------------------->Code for Step 2 (selected mowing plan)<----------------------
  // State to manage the selected mowing frequency
  const [selectedFrequency, setSelectedFrequency] = useState<Frequency>({ frequency: 'weekly', value: 0 }); // Default to 'weekly'
  // Jab backend se rates aajayein to selectedFrequency ko update karo
  useEffect(() => {
    if (ratesLoaded) {
      setSelectedFrequency({ frequency: 'weekly', value: rates.weeklyMowing });
    }
  }, [ratesLoaded, rates.weeklyMowing]);

  console.log("selected frequency:--->", selectedFrequency);
  // State to manage the selected mowing package
  const [selectedPackage, setSelectedPackage] = useState('budget'); // Default to 'budget'
  console.log("selected package:--->", selectedPackage);
  // State for the new UI elements from the lower part
  const [serviceStartOption, setServiceStartOption] = useState('now'); // 'now' or 'later'
  const [selectedWeek, setSelectedWeek] = useState<Date[]>([]);
  console.log("Selected date is:", selectedWeek);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  console.log("Month is:", currentMonth);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  console.log("Year is:", currentYear);
  const [additionalInstructions, setAdditionalInstructions] = useState('');
  console.log("Additional Instructions:", additionalInstructions);
  const [modalData, setModalData] = useState<PackageData | null>(null);

  function safeRound(value: number) {
    return Math.round(value + Number.EPSILON);
  }
  function computePrice(amount: number | null | undefined, freq: number | null | undefined) {
    const raw = (Number(amount ?? 0) * Number(freq ?? 1));
    return safeRound(raw);
  }


  const packages = [
    {
      type: 'budget',
      price: computePrice(Math.round(totalBudgetCost || 0), selectedFrequency?.value),
      name: 'Budget',
      features: [
        'Mowing, mulching and blowing*',
        'Grass trimming',
        'The contractor will evenly cut up to 3-6 inches of lawn growth to a seasonally appropriate height.',
        'All residual grass clippings will be cleaned off of your driveway, curb, and other reasonable areas with a blower and/or broom.',
        'Grass clippings will either be mulched, or bagged and carried away, depending on the regulations and standard practices for disposal in your area.',
        'The lawn growing up against fences, structures, trees and edges of the lawn will be trimmed to give your lawn the professionally manicured look.',

      ],
    },
    {
      type: 'premium',
      price: computePrice(totalPremiumCost, selectedFrequency?.value),

      name: 'Premium',
      features: [
        'Mowing, mulching and blowing*',
        'Grass trimming',
        'The contractor will trim shrubs and decorative bushes on your property that are less than 6 feet tall.',
        'The contractor will evenly cut up to 3-6 inches of lawn growth to a seasonally appropriate height.',
        'Pavement edging',
        'Bush and shrub trimming',
        'Weeding of flowerbeds',

        'Grass clippings will either be mulched, or bagged and carried away, depending on the regulations and standard practices for disposal in your area.',
        'The lawn growing up against fences, structures, trees and edges of the lawn will be trimmed to give your lawn the professionally manicured look.',
        'All residual grass clippings will be cleaned off of your driveway, curb, and other reasonable areas with a blower and/or broom.',
        'The contractor will clean up ALREADY WELL MAINTAINED flower beds and gardens immediately surrounding the lawn area. Pick up should include LIGHT removal of lawn trimmings, twigs, and general lawn debris. This may include light weeding or pruning (depending on the condition of the weeds and bushes). This does not include adding materials (dirt, compost, plants, etc.), nor does it include any landscaping projects. If your flower beds and gardens require additional work, the contractor will provide you with an estimate before proceeding.',
        'The contractor will edge your property, creating a defined grass border along sidewalks and driveways.',

      ],
    },
  ];
  // Calculate total per service
  const calculateTotalPerService = () => {
    const pkg = packages.find(p => p.type === selectedPackage);
    if (pkg) {
      return pkg.price;
    }
    return 0;
  };

  const totalPerService = calculateTotalPerService();

  console.log("Selected Total per service:", totalPerService);
  const selectedPackageDetails = packages.find(p => p.type === selectedPackage);
  const selectedFrequencyLabel = selectedFrequency.frequency === 'weekly' ? 'Weekly' : selectedFrequency.frequency === 'bi-weekly' ? 'Bi-Weekly' : 'One Time';

  // Calendar rendering logic
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayIndex = getFirstDayOfMonth(currentYear, currentMonth);
  const blanks = Array(firstDayIndex).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const allCalendarDays = [...blanks, ...days];

  const handlePrevMonth = () => {
    setCurrentMonth(prev => (prev === 0 ? 11 : prev - 1));
    setCurrentYear(prev => (currentMonth === 0 ? prev - 1 : prev));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => (prev === 11 ? 0 : prev + 1));
    setCurrentYear(prev => (currentMonth === 11 ? prev + 1 : prev));
  };

  const isDateSelectable = (day: number) => {
    if (!day) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to start of day
    const dateToCheck = new Date(currentYear, currentMonth, day);
    dateToCheck.setHours(0, 0, 0, 0); // Normalize date to check to start of day
    return dateToCheck >= today; // Only allow selecting today or future dates
  };

  // ----------------->Code for Step 3 (Secure Checkout)<-------------------
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [billingAddress, setbillingAddress] = useState(''); // Pre-filled as in image
  const [useDifferentBillingAddress, setUseDifferentBillingAddress] = useState(false);
  const [cardholderName, setCardholderName] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [city, setcity] = useState('');
  console.log("billing city is:-->", city);
  const [selectedCountry, setSelectedCountry] = useState("United States");
  console.log("selected Country is:-->", selectedCountry);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFieldempty, setIsFieldempty] = useState(false);
  const countries = [
    "United States",
    "El Salvador",
    "Guatemala",
  ];
  const stripe = useStripe();
  const elements = useElements();
  const handleUpdateOrder = async () => {
    console.log("Order is Updating  ...");
    setIsFieldempty(false);
    setIsProcessing(true);
    if (!stripe || !elements) {
      toast.error("Stripe not initialized.");
      setIsProcessing(false);
      return;
    }
    let datesToSend;
    if (serviceStartOption === 'now') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      datesToSend = [today];
    } else {
      datesToSend = selectedWeek;
    }
    const cardElement = elements?.getElement(CardElement);
    if (!cardElement) {
      console.error("CardElement not found.");
      return;
    }
    // Create Payment Method
    const { error, paymentMethod } = await stripe?.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: cardholderName,
        email: emailAddress,
        phone: phoneNumber,
      },
    });
    if (error) {
      console.error(error.message);
    } else {
      console.log("PaymentMethod created:", paymentMethod);
    }
    // console.log("PaymentMethod created:", paymentMethod);
    // Validate required string fields
    const stringFields = [
      emailAddress,
      phoneNumber,
      billingAddress,
      cardholderName,
      selectedFrequency.frequency,
      selectedPackage,
    ];

    if (useDifferentBillingAddress) {
      stringFields.push(city, selectedCountry, fullName);
    }

    const emptyString = stringFields.find(
      (field) => typeof field !== "string" || field.trim() === ""
    );
    console.log("emptyString data:", emptyString);
    if (emptyString !== undefined) {
      setIsFieldempty(true);
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!paymentMethod?.id) {
      setIsFieldempty(true);
      toast.error("Payment method is missing.");
      return;
    }
    // Validate numbers
    if (
      totalPerService == null ||
      totalSize == null ||
      isNaN(totalPerService) ||
      isNaN(totalSize)
    ) {
      setIsFieldempty(true);
      toast.error("Total per service and total size are required numbers.");
      return;
    }
    let data;
    if (useDifferentBillingAddress) {
      data = {
        fullName,
        emailAddress,
        phoneNumber,
        selectedWeek: datesToSend,
        serviceStartOption,
        cardholderName,
        selectedFrequency,
        selectedPackage,
        totalPerService,
        totalSize,
        additionalInstructions,
        billingCity: city,
        selectedCountry,
        billingAddress,
        paymentMethodId: paymentMethod?.id,
      };
    } else {
      data = {
        emailAddress,
        phoneNumber,
        billingAddress,
        selectedWeek: datesToSend,
        serviceStartOption,
        cardholderName,
        selectedFrequency,
        selectedPackage,
        totalPerService,
        totalSize,
        additionalInstructions,
        paymentMethodId: paymentMethod?.id,
      };
    }
    try {
      const response = await fetch(
        // `http://localhost:3001/api/v1/orders/update-Order/${editingOrderId}`,
        // `https://task-easy-backend-olive.vercel.app/orders/update-Order/${editingOrderId}`,
        `${BASE_URL}/api/v1/orders/update-Order/${editingOrderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token here
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update order");
      }
      toast.success("Order Updated!");
      setTimeout(() => {
        router.push(`/`);
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update order.");
    }
    finally {
      setIsProcessing(false);
    }
  };



  return (

    <div>


      <Card className="mt-6 mb-8 ml-2 mr-2">
        <div className="w-full flex justify-center items-center bg-gradient-to-b from-green-200 to-green-50 py-3 shadow px-4 rounded-t-md"> {/* Added px-4 for padding */}
          <div className="flex flex-wrap justify-center sm:justify-around items-center gap-y-2 space-x-4 sm:space-x-6 md:space-x-8">
            {/* Step 1 */}
            <div className="flex items-center space-x-2"
            //   onClick={handlePending}
            >
              <div className={`w-6 h-6 rounded-full text-white text-xs flex items-center justify-center ${activeStep > 1 ? 'bg-gray-400' : 'bg-green-700'
                }`}>
                1
              </div>
              <span className={`${activeStep > 1 ? 'text-gray-400' : 'text-green-700 font-medium'} text-sm sm:text-base`}> {/* Adjusted text size */}
                Orders
              </span>
            </div>

            <div className="hidden sm:block w-4 h-0.5 bg-gray-300" /> {/* Hidden on very small screens */}
            {/* Step 2 */}
            <div className="flex items-center space-x-2"
            //   onClick={handleinprogress}
            >
              <div className={`w-6 h-6 rounded-full text-white text-xs flex items-center justify-center ${activeStep > 2 ? 'bg-gray-400' : (activeStep === 2 ? 'bg-green-700' : 'bg-gray-400')
                }`}>
                2
              </div>
              <span className={`${activeStep === 2 ? 'text-green-700 font-medium' : 'text-gray-400'} text-sm sm:text-base`}> {/* Adjusted text size */}
                Edit Plan
              </span>
            </div>

            <div className="hidden sm:block w-4 h-0.5 bg-gray-300" /> {/* Hidden on very small screens */}

            {/* Step 3 */}
            <div className="flex items-center space-x-2r"
            //   onClick={handlefulfill}
            >
              <div className={`w-6 h-6 rounded-full text-white text-xs flex items-center justify-center ${activeStep === 3 ? 'bg-green-700' : 'bg-gray-400'
                }`}>
                3
              </div>
              <span className={`${activeStep === 3 ? 'text-green-700 font-medium' : 'text-gray-400'} text-sm sm:text-base pl-2`}> {/* Adjusted text size */}
                Edit Payment Info
              </span>
            </div>
          </div>
        </div>
        {activeStep === 1 && (
          <div> <CardHeader>
            <CardTitle>Your Orders</CardTitle>
            <CardDescription>You can see all your orders here.</CardDescription>
          </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-6">
                  <LoaderCircle className="animate-spin h-6 w-6 text-primary" />
                </div>
              ) : isError ? (
                <div className="text-red-500 text-md text-center">
                  {"Something went wrong. Please try again."}
                </div>
              ) : videos?.length === 0 ? (
                <div className="text-gray-500 text-md text-center">
                  No Orders found.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Charges</TableHead>
                      <TableHead>Lawn Size</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {videos.map((video: Order) => (
                      <TableRow key={video._id}>
                        <TableCell>{video.fullName || video.cardholderName}</TableCell>
                        <TableCell>{video.emailAddress}</TableCell>
                        <TableCell>{video.phoneNumber}</TableCell>
                        <TableCell>{video.totalPerService}$</TableCell>
                        <TableCell>{video.totalSize} Sqft</TableCell>
                        <TableCell><span className="inline-block rounded-full border border-gray-300 px-2 shadow-sm font-semibold bg-gradient-to-b from-white to-gray-200 hover:bg-gradient-to-b from-gray-50 to-white py-1 text-sm"> {video.orderStatus == "fulfill" ? "completed" : video.orderStatus}
                        </span>
                        </TableCell>

                        <TableCell className="md:table-cell w-[150px]">
                          {video?.serviceStartOption === 'now' ? <div style={{ textAlign: "center", fontWeight: "bold" }}>
                            {new Date(video?.selectedWeek[0]).toLocaleString("en-US", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })}
                          </div> :
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <span
                                  className="inline-block rounded-full flex text-center justify-center border border-gray-300 px-2 shadow-sm font-semibold bg-gradient-to-b from-white to-gray-200 hover:bg-gradient-to-b from-gray-50 to-white py-1 text-sm cursor-pointer"
                                >
                                  {video.serviceStartOption}
                                  <ChevronDownIcon className="w-5 h-5 text-gray-500 pl-1" />
                                </span>

                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                {video?.selectedWeek?.map((statusOption) => (
                                  <DropdownMenuItem
                                    key={statusOption}
                                    className="text-sky-600 font-bold"
                                  >
                                    {
                                      new Date(statusOption).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                      })
                                    }
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>

                            </DropdownMenu>}

                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            {loadingId === video._id && (
                              <LoaderCircle className="animate-spin" />
                            )}
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => handleDelete(video._id)}
                              >
                                Delete
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleContinue(video._id)}>
                                Update
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent></div>
        )}


        {/*2nd Sub page */}
        {activeStep === 2 && (
          <div className="min-h-screen flex items-start justify-center font-inter">
            <div className="bg-white mt-2 p-2 sm:p-8 lg:p-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: Plan Selection and Calendar */}
              <div className="lg:col-span-2 col-span-1 ">
                {/* Header */}
                <h1 className="text-2xl sm:text-3xl font-semibold text-green-700 mb-6 sm:mb-3 text-center lg:text-left">
                  Select a Plan
                </h1>
                <hr className="mb-3"></hr>

                {/* Mowing Frequency Section */}
                <div className="mb-8">
                  <h2 className="text-lg sm:text-xl font-medium text-gray-700 mb-4">
                    Choose Mowing Frequency:
                  </h2>
                  <div className="flex flex-wrap gap-2 sm:gap-4">
                    {/* Frequency buttons */}
                    <button
                      onClick={() => setSelectedFrequency({ frequency: 'weekly', value: rates.weeklyMowing })}
                      className={`px-7 py-2 rounded-full text-base sm:text-lg font-medium transition-all duration-200 ease-in-out
                        ${selectedFrequency.frequency === 'weekly' ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                      `}
                    >
                      Weekly Mowing
                    </button>
                    <button
                      onClick={() => setSelectedFrequency({ frequency: 'bi-weekly', value: rates.biweeklyMowing })}
                      className={`px-5 py-2 rounded-full text-base sm:text-lg font-medium transition-all duration-200 ease-in-out
                        ${selectedFrequency.frequency === 'bi-weekly' ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                      `}
                    >
                      Bi-Weekly Mowing
                    </button>
                    <button
                      onClick={() => setSelectedFrequency({ frequency: 'one-time', value: rates.oneTimeMowing })}
                      className={`px-5 py-2 rounded-full text-base sm:text-lg font-medium transition-all duration-200 ease-in-out
                        ${selectedFrequency.frequency === 'one-time' ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                      `}
                    >
                      One Time Mowing
                    </button>
                  </div>
                </div>

                {/* Mowing Package Section */}
                <div className="mb-8">
                  <h2 className="text-lg sm:text-xl font-medium text-gray-700 mb-4">
                    Choose a Mowing Package:
                  </h2>
                  <div className="flex flex-col md:flex-row gap-6 justify-center">
                    {/* Map through packages to render package cards */}

                    {packages.map((pkg) => {
                      const visibleFeatures = pkg.features.slice(0, 4);
                      const hasMore = pkg.features.length > 4;

                      return (
                        <div
                          key={pkg.type}
                          className={`flex-1 min-w-[280px] border-2 rounded-xl p-6 shadow-lg flex flex-col justify-between cursor-pointer transition-all duration-200 ease-in-out
                ${selectedPackage === pkg.type
                              ? "border-orange-500 shadow-orange-200"
                              : "border-gray-200 hover:border-gray-300"
                            }
              `}
                          onClick={() => setSelectedPackage(pkg.type)}
                        >
                          <div>
                            {/* Title and price */}
                            <div className="flex items-baseline justify-between mb-4">
                              <h3
                                className={`text-2xl font-bold ${selectedPackage === pkg.type
                                  ? "text-orange-600"
                                  : "text-gray-800"
                                  }`}
                              >
                                {pkg.name}
                              </h3>
                              <span
                                className={`text-xl font-semibold ${selectedPackage === pkg.type
                                  ? "text-orange-500"
                                  : "text-gray-600"
                                  }`}
                              >
                                ${pkg.price}/service
                              </span>
                            </div>

                            {/* Features List */}
                            <ul className="list-none p-0 mb-4">
                              {visibleFeatures.map((feature, index) => (
                                <li
                                  key={index}
                                  className="flex items-start text-gray-700 text-base mb-2"
                                >
                                  <Check className="text-green-500 w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>

                            {/* More Details link */}
                            {hasMore && (
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setModalData(pkg);
                                }}
                                className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer mb-4 ml-7 flex items-center"
                              >
                                More Details
                                <svg
                                  className="w-4 h-4 ml-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                  ></path>
                                </svg>
                              </div>
                            )}
                          </div>

                          {/* Select Package checkbox */}
                          <div className="flex items-center mt-auto">
                            <input
                              type="checkbox"
                              id={`select-${pkg.type}`}
                              name="select-package"
                              checked={selectedPackage === pkg.type}
                              onChange={() => setSelectedPackage(pkg.type)}
                              className="form-checkbox h-5 w-5 text-orange-600 rounded focus:ring-orange-500 border-gray-300 transition-colors duration-200 ease-in-out cursor-pointer"
                            />
                            <label
                              htmlFor={`select-${pkg.type}`}
                              className="ml-2 text-gray-700 text-lg cursor-pointer"
                            >
                              Select this package
                            </label>
                          </div>
                        </div>
                      );
                    })}


                    {/* MODAL */}
                    {modalData && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
                        <div className="bg-white max-w-8xl w-full max-h-full overflow-y-auto rounded-lg p-8 relative">
                          <button
                            onClick={() => setModalData(null)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                          >
                            <X className="w-6 h-6" />
                          </button>

                          <h2 className="text-2xl font-bold text-green-700 mb-4">
                            {modalData.name} Package - Full Features
                          </h2>

                          <ul className="list-none p-0 space-y-2">
                            {modalData.features.map((feature: any, idx: any) => (
                              <li key={idx} className="flex items-start text-gray-700 text-base">
                                <Check className="text-green-500 w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="lg:col-span-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-md mt-6">
                    <p>
                      *This pricing assumes that your lawn is not overgrown beyond 6&quot;, that obstacles (ex: large objects, cars, dogs), and debris (ex: children&apos;s toys, trash,
                      dog poop) have been removed from the lawn, and that overall the lawn is in acceptable condition to complete the selected scope of work. If the
                      lawn is overgrown it will require additional cost, which could delay the service. Please include any additional instructions for your property in the
                      box below.
                    </p>
                  </div>
                </div>

                {/* When do you want your service to begin? */}
                <div className="mb-8">
                  <h2 className="text-lg sm:text-xl font-medium text-gray-700 mb-4">
                    When do you want your service to begin?
                  </h2>
                  <div className="flex gap-4 mb-4">
                    <button
                      onClick={() => setServiceStartOption('now')}
                      className={`flex-1 px-5 py-2 rounded-full text-base sm:text-lg font-medium transition-all duration-200 ease-in-out
                        ${serviceStartOption === 'now' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}
                      `}
                    >
                      Now
                    </button>
                    <button
                      onClick={() => setServiceStartOption('later')}
                      className={`flex-1 px-5 py-2 rounded-full text-base sm:text-lg font-medium transition-all duration-200 ease-in-out
                        ${serviceStartOption === 'later' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}
                      `}
                    >
                      Later
                    </button>
                  </div>
                  {serviceStartOption === 'now' && (
                    <p className="text-sm text-gray-500 mb-4 ml-2 flex items-center">
                      <Info className="w-4 h-4 mr-1 text-blue-500" />
                      Tasks are typically assigned to a contractor within 3 days and serviced within 7.
                    </p>
                  )}

                  {serviceStartOption === 'later' && (
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                      <h3 className="text-lg sm:text-xl font-medium text-gray-700 mb-4">
                        Select the week you want to begin service:
                      </h3>
                      {/* Calendar */}
                      <div className="w-full max-w-sm mx-auto">
                        <div className="flex justify-between items-center mb-4">
                          <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-200">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                          </button>
                          <span className="text-lg font-semibold text-gray-800">
                            {new Date(currentYear, currentMonth).toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                          </span>
                          <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-200">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                          </button>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center text-sm">
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="font-medium text-gray-500 py-2">
                              {day}
                            </div>
                          ))}
                          {allCalendarDays.map((day, index) => {
                            // Helper: Check if a date is in the past
                            const isPastDate = (day: number) => {
                              const today = new Date();
                              const date = new Date(currentYear, currentMonth, day);
                              today.setHours(0, 0, 0, 0);
                              date.setHours(0, 0, 0, 0);
                              return date < today;
                            };

                            // Is this day in the selectedWeek?
                            const isInSelectedWeek =
                              day !== null &&
                              selectedWeek.some(
                                (d) =>
                                  d.getDate() === day &&
                                  d.getMonth() === currentMonth &&
                                  d.getFullYear() === currentYear
                              );

                            const isPast = day !== null && isPastDate(day);

                            return (
                              <div
                                key={index}
                                onClick={() => {
                                  if (day && isDateSelectable(day)) {
                                    const selectedDate = new Date(currentYear, currentMonth, day);

                                    // ✅ Generate week and exclude past dates
                                    const getFilteredWeekDates = (date: Date): Date[] => {
                                      const today = new Date();
                                      today.setHours(0, 0, 0, 0);

                                      const dayOfWeek = date.getDay(); // Sunday = 0
                                      const weekStart = new Date(date);
                                      weekStart.setDate(date.getDate() - dayOfWeek);

                                      return Array.from({ length: 7 }, (_, i) => {
                                        const d = new Date(weekStart);
                                        d.setDate(weekStart.getDate() + i);
                                        d.setHours(0, 0, 0, 0);
                                        return d >= today ? d : null;
                                      }).filter(Boolean) as Date[];
                                    };

                                    const weekDates = getFilteredWeekDates(selectedDate);
                                    setSelectedWeek(weekDates);
                                  }
                                }}
                                className={`py-2 rounded-md transition-colors duration-200 ease-in-out cursor-pointer text-center
        ${day === null ? 'bg-transparent' : ''}
        ${day !== null && isDateSelectable(day) ? 'hover:bg-gray-200' : 'text-gray-400 cursor-not-allowed'}
        ${isInSelectedWeek && !isPast ? 'bg-green-500 text-white font-bold shadow-md' : ''}
        ${isInSelectedWeek && isPast ? 'bg-green-200 text-white font-semibold' : ''}
        ${day !== null && !isDateSelectable(day) ? 'text-gray-400' : ''}
      `}
                              >
                                {day}
                              </div>
                            );
                          })}

                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Additional Instructions and Summary */}
              <div className="lg:col-span-2 col-span-1">
                {/* Additional Instructions for your Property */}
                <div className="mb-8">
                  <h2 className="text-lg sm:text-xl font-medium text-gray-700 mb-4">
                    Additional Instructions for your Property:
                  </h2>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Is your lawn overgrown or are there any gates, pets, sensitive flower beds, or time-sensitive issues your contractor needs to know about?"
                    value={additionalInstructions}
                    onChange={(e) => setAdditionalInstructions(e.target.value)}
                  ></textarea>
                </div>

                {/* Information Section */}
                <div className="mb-8 space-y-4">
                  <div className="flex items-start bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <Info className="w-5 h-5 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                    <p className="text-sm text-blue-800">
                      Please use the Additional Instructions field to tell us about any pets you may
                      have, or any other concerns or requests. Please see our Frequently Asked
                      Questions for example subjects.
                    </p>
                  </div>

                </div>

                {/* Summary and Action Buttons */}
                <div className="bg-gray-50 p-6 rounded-xl shadow-md" style={{
                  boxShadow: 'inset 0 -3px 8px rgba(0, 0, 0, 0.08),inset 0 3px 6px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.07)'
                }}>
                  <div className="flex items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Lawn Mowing</h3>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">
                      {selectedPackageDetails?.name}: {selectedFrequencyLabel}
                    </span>
                    <span className="font-semibold text-gray-800">
                      ${selectedPackageDetails?.price}.00
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-4">
                    <span className="text-xl font-bold text-gray-800">Total Per Service:</span>
                    <span className="text-xl font-bold text-green-600">
                      ${totalPerService}.00
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <button className="flex-1 px-6 py-3 rounded-full border border-gray-400 text-gray-700 font-semibold hover:bg-gray-200 transition-colors duration-200">
                      Save this for later
                    </button>
                    <button
                      onClick={handlefulfill}
                      className="flex-1 px-6 py-3 rounded-full bg-orange-500 text-white font-semibold flex items-center justify-center hover:bg-orange-600 transition-colors duration-200 shadow-md">
                      Continue
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Disclaimer/Notes Section */}

              <button
                className="flex items-center justify-center mt-4 px-6 py-3 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition-colors duration-200 shadow-md col-span-1 lg:col-span-2"
                onClick={handleBack}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Go Back
              </button>

            </div>
          </div>
        )}
        {/*3rd Sub page */}
        {activeStep === 3 && (
          <div className="min-h-screen bg-white flex items-start justify-center p-4 sm:p-6 lg:p-8 font-inter w-full">
            <div className="border rounded-lg shadow-md p-3 sm:p-8 lg:p-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Payment & Contact Information */}
              <div className="lg:col-span-2">
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 flex items-center">
                  Payment
                </h1>


                <div className="mb-8">
                  <h2 className="text-lg sm:text-xl font-medium text-gray-700 mb-4">
                    Payment Information
                  </h2>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="useDifferentBillingAddress"
                      className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      checked={useDifferentBillingAddress}
                      onChange={(e) => setUseDifferentBillingAddress(e.target.checked)}
                    />
                    <label htmlFor="useDifferentBillingAddress" className="ml-2 text-sm text-gray-700">My billing address is different from the service address</label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700">EMAIL ADDRESS</label>
                      <input
                        type="email"
                        id="emailAddress"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="johndoe@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">PHONE NUMBER</label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="(718) 664-3907"
                      />
                    </div>
                    <div>
                      <label htmlFor="BillingAddress" className="block text-sm font-medium text-gray-700">BILLING ADDRESS</label>
                      <input
                        type="text"
                        id="BillingAddress"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                        value={billingAddress}
                        onChange={(e) => setbillingAddress(e.target.value)}
                        readOnly={!useDifferentBillingAddress}
                      />
                    </div>
                    <div className="">
                      <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700">CARDHOLDER NAME</label>
                      <input
                        type="text"
                        id="cardholderName"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        placeholder="John Doe"
                      />
                    </div>
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: "17px",
                            color: "#131313ff",

                          },
                        }

                      }} />
                  </div>
                </div>
                {useDifferentBillingAddress &&
                  <div className="mb-8">
                    <h2 className="text-lg sm:text-xl font-medium text-gray-700 mb-4">
                      Contact information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">FULL NAME</label>
                        <input
                          type="text"
                          id="fullName"
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="City" className="block text-sm font-medium text-gray-700">City</label>
                        <input
                          type="text"
                          id="City"
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm "
                          value={city}
                          onChange={(e) => setcity(e.target.value)}
                        // readOnly // As it's usually pre-filled
                        />
                      </div>

                      <div className="w-full max-w-md">
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                          COUNTRY
                        </label>
                        <select
                          value={selectedCountry}
                          onChange={(e) => setSelectedCountry(e.target.value)}
                          className="block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {countries.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                }
              </div>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg shadow-md sticky top-4" style={{
                  boxShadow: 'inset 0 -3px 8px rgba(0, 0, 0, 0.08),inset 0 3px 6px rgba(0, 0, 0, 0.08), 0 3px 7px rgba(0, 0, 0, 0.11)'
                }}>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Lawn Mowing/ {selectedPackage}
                  </h2>
                  <div className="flex justify-between items-center mb-2 text-gray-700">
                    <span>Frequency: {selectedFrequency.frequency}</span>
                    <span>${totalPerService}.00</span>
                  </div>
                  <div className="mb-4 text-gray-700">
                    <span>Lawn Size: {totalSize}sq ft</span>
                  </div>
                  <div className="mb-4 text-gray-700">
                    <span>Additional instructions:</span> <span className="font-medium">{additionalInstructions || 'None'}</span>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <input
                      type="text"
                      id="couponCode"
                      className="flex-1 min-w-0 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="COUPON CODE"
                    />
                    <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200">
                      Apply
                    </button>
                  </div>

                  <div className="flex justify-between items-center mb-2 text-gray-700">
                    <span>Sub Total:</span>
                    <span className="font-semibold">${totalPerService}.00</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-4 mb-3">
                    <span className="text-xl font-bold text-gray-800">Total Per Service:</span>
                    <span className="text-xl font-bold text-green-600">
                      ${totalPerService}.00
                    </span>
                  </div>

                  <button
                    className={`w-full px-6 py-3 mt-6 rounded-full ${(isProcessing && isFieldempty == false) ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
                      } text-white font-semibold flex items-center justify-center transition-colors duration-200 shadow-md`}
                    onClick={handleUpdateOrder}
                    disabled={(isProcessing && isFieldempty == false)}
                  >
                    {isProcessing && isFieldempty === false ? (
                      <>
                        Order Updating...
                        {/* <LoaderCircle className="animate-spin font-bold inline-block ml-1" strokeWidth={3}  /> */}
                      </>
                    ) : (
                      "Update Order"
                    )}


                  </button>


                  <p className="text-xs text-gray-500 mt-2 text-center">
                    By clicking this button, you agree to our <a href="#" className="text-blue-600 hover:underline">Conditions of Use</a>.
                  </p>
                </div>
              </div>

              {/* Back button for Step 3 */}
              <button
                className="flex items-center justify-center mt-4 px-6 py-3 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition-colors duration-200 shadow-md col-span-full"
                onClick={BacktoEdit}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Go Back
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Orders;
