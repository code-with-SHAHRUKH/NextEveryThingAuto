"use client";
import useTokenStore from '@/store';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { decodeToken } from '@/utils/decodeToken';
export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<null | boolean>(null);
  const queryClient = new QueryClient();
  const token = useTokenStore(state => state.token);
  // console.log("Token from store:",token)
  const userData = decodeToken(token);
  const role = userData?.role;
  useEffect(() => {
    if (!token && role !== 'user') {
      router.replace("/userlogin");
      return;
    }
    if (token && role == 'user') {
      router.replace("/user/orders");
    }
  }, [token, router,role]);
  return <QueryClientProvider client={queryClient}> {children}</QueryClientProvider>;//yeh child asal me users folder he
}
