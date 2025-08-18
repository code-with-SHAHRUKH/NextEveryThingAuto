"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useTokenStore from "@/store";
const queryClient = new QueryClient();
import { decodeToken } from '@/utils/decodeToken';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const token = useTokenStore((state) => state.token);
  const userData = decodeToken(token);
  const role = userData?.role;

  useEffect(() => {
    if (token && role === 'superAdmin') {
      router.replace("/admin/orders");
    }
  }, [token, router,role]);
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
