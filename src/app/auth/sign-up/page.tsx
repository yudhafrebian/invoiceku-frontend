"use client";
import Navbar from "@/components/core/navbar";
import Link from "next/link";
import SignUpForm from "@/view/components/auth/SignUpForm";
import SignUpCarousel from "@/view/components/auth/SignUpCarousel";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignUp = () => {
    const router = useRouter();
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        router.replace("/dashboard");
      }
    }, []);
  return (
    <div className="h-screen bg-[#fafafa] ">
      <Navbar />
      <div className="bg-white w-[90%] md:w-2/3 md:h-[35em] m-auto mt-16 rounded-2xl shadow-lg flex flex-col md:flex-row justify-center gap-0 md:gap-4 p-2 py-4 md:p-4 text-primary">

        <SignUpCarousel />

        <div className="md:w-1/2 px-4 md:px-8">
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link className="underline hover:text-primary" href="/auth/sign-in">
                Sign In
              </Link>
            </p>
          </div>

          <SignUpForm />
          
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              By signing up, you agree to our{" "}
              <Link className="underline hover:text-primary" href="/">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link className="underline hover:text-primary" href="/">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
