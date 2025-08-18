'use client';
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { UsergoogleAuth } from "@/http/api";
import { auth, provider } from "@/utils/Firebase";
import { signInWithPopup } from "firebase/auth";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { login } from "@/http/api";
import useTokenStore from "@/store";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { useRouter } from "next/navigation";
const LoginPage = () => {
  const router = useRouter();
  const setToken = useTokenStore((state) => state.setToken);
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      console.log("Response from Backend:", response.data.data.accessToken);
      setToken(response.data.data.accessToken);
      router.replace("/user/orders");
      toast.success("Logged in successfully!");
    },
  });
  const googleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      console.log("Response from Firebase:", res?.user?.email);
      if (res?.user?.email) {
        const result = await UsergoogleAuth({ email: res.user.email });
        console.log("Token from backend:", result?.data?.data?.accessToken);
        setToken(result.data.data.accessToken);
      }
    } catch (e: any) {
      console.error("Google Login Error:", e);
      // Handle different types of errors
      if (e.response?.data?.message) {
        toast.error(e.response.data.message); // backend error message
      } else if (e.message) {
        toast.error(e.message); // generic JS error
      } else {
        toast.error("An unknown error occurred during Google Login.");
      }
    }
  };

  return (
    <section className="flex justify-center items-center h-[770px] lg:h-[630px]">
      <Card className="w-full max-w-sm shadow-xl border-none">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            You can Login through your Active Google Account. <br />
            {mutation.isError && (
              <span className="text-red-500 text-sm">
                {"Something went wrong"}
              </span>
            )}
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <div className="w-full">
            <div className="mt-0 text-center">
              <div className="flex justify-center w-full items-center min-h-[6vh]">
                <button
                  onClick={googleLogin}
                  className="flex items-center gap-3 px-12 w-full py-2 bg-white text-gray-700 border border-gray-100 rounded-md shadow-md hover:shadow-sm transition-all duration-200 bg-gradient-to-b from-white to-gray-50 hover:bg-gradient-to-b from-gray-50 to-white"
                >
                  <FcGoogle size={24} />
                  <span className="font-medium text-base">Sign in with Google</span>
                </button>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};
export default LoginPage;
