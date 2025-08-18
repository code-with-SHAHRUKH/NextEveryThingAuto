"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useTokenStore from "@/store";
import { decodeToken } from "@/utils/decodeToken";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const queryClient = new QueryClient();

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const token = useTokenStore((state) => state.token);

  useEffect(() => {
    if (!token) return;
    try {
      const userData = decodeToken(token);
      const role = userData?.role;
      console.log("Decoded Role:", role);
 if (token && role === "superAdmin") {
    toast.success("You are registered as Admin!");
        router.replace("/admin/orders");
      
      }
      if (token && role === "user") {
          toast.success("Logged in successfully!");
        router.replace("/lawnmowing");
      }
    } catch (error) {
      console.error("Token decode error:", error);
    }
  }, [token, router]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
