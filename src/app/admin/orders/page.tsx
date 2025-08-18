"use client";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
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
import { LoaderCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getVideos, deleteVideo, updateVideo } from "@/http/api";
import { Order } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";

const VideosPage = () => {
  const queryClient = useQueryClient(); // React Query ka cache update karne ke liye
  const [loadingId, setLoadingId] = useState<string | null>(null); // Track loading state for a specific video
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getVideos,
    staleTime: 10000,
  });
  const orders = response?.data?.data
  // console.log("All Orders:", videos);
  const UpdateMutation = useMutation({
    mutationFn: async ({ orderId, updatedData }: { orderId: string; updatedData: Order }) => {
      if (!orderId) throw new Error("Video ID is missing");
      // console.log("Updated Data:", updatedData);
      return updateVideo(orderId, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] }); // UI update karega
      setLoadingId(null); // Reset loading state
    },
    onError: () => {
      setLoadingId(null); // Reset loading state in case of error
    },
  });
  const handleStatusChange = (orderId: string, status: string) => {
    // Order dhoondo
    const foundOrder = orders?.find((order: Order) => order._id === orderId);
    if (!foundOrder) {
      console.error("Order not found!");
      return;
    }
    // New updated object banao
    const updatedData = {
      ...foundOrder,
      orderStatus: status,
    };
    // Mutation call karo
    setLoadingId(orderId);
    UpdateMutation.mutate({ orderId, updatedData });
  };
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
  const [activeStep, setActiveStep] = useState<number>(1);
  const [status, setStatus] = useState<string>('pending');

  function handlePending() {
    setStatus('pending');
    setActiveStep(1);
  }

  function handleinprogress() {
    setStatus('in-progress');
    setActiveStep(2);
  }

  function handlefulfill() {
    setStatus('fulfill');
    setActiveStep(3);
  }
  //filtering th Aroders according to status 
  const filteredOrders = orders?.filter(
    (video: Order) => video.orderStatus === status
  );
  console.log("Filtered:", filteredOrders)

  return (
    <div>
      <Card className="mt-6 mb-8 ml-2 mr-2">
        <div className="w-full flex justify-center items-center bg-gradient-to-b from-green-200 to-green-50 py-3 shadow px-4 rounded-t-md"> {/* Added px-4 for padding */}
          <div className="flex flex-wrap justify-center sm:justify-around items-center gap-y-2 space-x-4 sm:space-x-6 md:space-x-8">
            {/* Step 1 */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={handlePending}>
              <div className={`w-6 h-6 rounded-full text-white text-xs flex items-center justify-center ${activeStep > 1 ? 'bg-gray-400' : 'bg-green-700'
                }`}>
                1
              </div>
              <span className={`${activeStep > 1 ? 'text-gray-400' : 'text-green-700 font-medium'} text-sm sm:text-base`}> {/* Adjusted text size */}
                Pending
              </span>
            </div>
            <div className="hidden sm:block w-4 h-0.5 bg-gray-300" /> {/* Hidden on very small screens */}
            {/* Step 2 */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={handleinprogress}>
              <div className={`w-6 h-6 rounded-full text-white text-xs flex items-center justify-center ${activeStep > 2 ? 'bg-gray-400' : (activeStep === 2 ? 'bg-green-700' : 'bg-gray-400')
                }`}>
                2
              </div>
              <span className={`${activeStep === 2 ? 'text-green-700 font-medium' : 'text-gray-400'} text-sm sm:text-base`}> {/* Adjusted text size */}
                In Progress
              </span>
            </div>
            <div className="hidden sm:block w-4 h-0.5 bg-gray-300" /> {/* Hidden on very small screens */}
            {/* Step 3 */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={handlefulfill}>
              <div className={`w-6 h-6 rounded-full text-white text-xs flex items-center justify-center ${activeStep === 3 ? 'bg-green-700' : 'bg-gray-400'
                }`}>
                3
              </div>
              <span className={`${activeStep === 3 ? 'text-green-700 font-medium' : 'text-gray-400'} text-sm sm:text-base`}> {/* Adjusted text size */}
                completed
              </span>
            </div>
          </div>
        </div>
        <CardHeader>
          <CardTitle>Mowing Orders</CardTitle>
          <CardDescription>You can see your Orders  here.</CardDescription>
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
          ) : orders?.length === 0 ? (
            <div className="text-gray-500 text-md text-center">
              No Orders found.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  {/* <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Thumbnail</span>
                  </TableHead> */}
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Service Charges</TableHead>
                  <TableHead>Selected Package</TableHead>
                  <TableHead>Mowing Frequency</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Lawn Size</TableHead>
                  <TableHead>Address</TableHead>
                  {/* <TableHead className="hidden md:table-cell">
                    Service Option
                  </TableHead> */}
                  <TableHead>
                    Selected Service Date
                  </TableHead>
                  <TableHead>
                    <span className="">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders?.length > 0 ? (
                  filteredOrders.map((video: Order) => (
                    <TableRow key={video._id}>
                      <TableCell className="font-medium">{video.fullName || video.cardholderName}</TableCell>
                      <TableCell className="font-medium">{video.emailAddress}</TableCell>
                      <TableCell className="text-md text-gray-700">
                        {video.phoneNumber}
                      </TableCell>
                      <TableCell className="font-medium">{video.totalPerService}$</TableCell>
                      <TableCell className="font-medium"><span className="inline-block rounded-full border border-gray-300 px-2 shadow-sm font-semibold bg-gradient-to-b from-white to-gray-200 hover:bg-gradient-to-b from-gray-50 to-white py-1 text-sm">
                        {video.selectedPackage}</span></TableCell>
                      <TableCell className="font-medium">
                        <span className="inline-block rounded-full border border-gray-300 px-2 shadow-sm font-semibold bg-gradient-to-b from-white to-gray-200 hover:bg-gradient-to-b from-gray-50 to-white py-1 text-sm">
                          {video.selectedFrequency.frequency}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium w-[150px]" >
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <span
                              className="inline-block rounded-full flex text-center justify-around border border-gray-300 px-2 shadow-sm font-semibold bg-gradient-to-b from-white to-gray-200 hover:bg-gradient-to-b from-gray-50 to-white py-1 text-sm cursor-pointer"
                            >
                              {video.orderStatus == "fulfill" ? "completed" : video.orderStatus}
                              <ChevronDownIcon className="w-4 h-5 text-gray-500" />
                            </span>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {["pending", "in-progress", "fulfill"].map((statusOption) => (
                              <DropdownMenuItem
                                key={statusOption}
                                onClick={() => handleStatusChange(video._id, statusOption)}
                                disabled={video.orderStatus === statusOption}
                                className={
                                  video.orderStatus === statusOption
                                    ? "text-sky-600 font-bold"
                                    : ""
                                }
                              >
                                {statusOption == "fulfill" ? "completed" : statusOption}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                      <TableCell className="font-medium">{video.totalSize} Sqf</TableCell>
                      <TableCell className="text-md text-gray-700">
                        {video.billingAddress}
                      </TableCell >
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
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center text-gray-700 py-4">
                      No data found for status: <strong>{status}</strong>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VideosPage;
