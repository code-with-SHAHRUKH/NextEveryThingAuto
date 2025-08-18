"use client";
import useTokenStore from '@/store';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { decodeToken } from '@/utils/decodeToken';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const queryClient = new QueryClient();
  const token = useTokenStore(state => state.token);
  const userData = decodeToken(token);
  const role = userData?.role;
  useEffect(() => {
    if (!token && role !== 'superAdmin') {
      router.replace("/userlogin");
      return;
    }
    if (token && role == 'superAdmin') {
      router.replace("/admin/orders");
    }
  }, [token, router,role]);
  return <QueryClientProvider client={queryClient}> {children}</QueryClientProvider>;//yeh child asal me users folder he
}
