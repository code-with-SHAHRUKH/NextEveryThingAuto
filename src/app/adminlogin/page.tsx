'use client';
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { googleAuth } from "@/http/api";
import { auth, provider } from "@/utils/Firebase";
import { signInWithPopup } from "firebase/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/http/api";
import useTokenStore from "@/store";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
const LoginPage = () => {
  const router = useRouter();
  const setToken = useTokenStore((state) => state.setToken);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      console.log("Response from Backend:", response.data.data.accessToken);
      setToken(response.data.data.accessToken);
      router.replace("/admin/orders");
      toast.success("Logged in successfully!");
    },
  });

  const handleLoginSubmit = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    console.log("data", { email, password });

    if (!email || !password) {
      return alert("Please enter username or email or password ");
    }

    mutation.mutate({ email, password });
  };


  const googleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      console.log("Response from Firebase:", res?.user?.email);

      if (res?.user?.email) {
        const result = await googleAuth({ email: res.user.email });
        setToken(result.data.data.accessToken);

        router.replace("/admin/orders");
        toast.success("Logged in successfully!");
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
            Enter your user name and password below to login to your account. <br />
            {mutation.isError && (
              <span className="text-red-500 text-sm">
                {"Something went wrong"}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">User Name</Label>
            <Input
              ref={emailRef}
              id="email"
              type="email"
              placeholder="m@gmail.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input ref={passwordRef} id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <Button
              onClick={handleLoginSubmit}
              className="w-full py-4"
              disabled={mutation.isPending}
            >
              {mutation.isPending && <LoaderCircle className="animate-spin" />}

              <span className="ml-2 font-medium text-base">Sign in</span>
            </Button>

            <div className="mt-5 text-center">
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
