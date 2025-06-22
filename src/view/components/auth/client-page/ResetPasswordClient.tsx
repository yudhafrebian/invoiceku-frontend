"use client";

import Navbar from "@/components/core/Navbar";
import ResetPasswordForm from "@/view/components/auth/ResetPasswordForm";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ResetPasswordClient() {
  const router = useRouter();
  const queryParams = useSearchParams();
  const token = queryParams.get("tkn");

  useEffect(() => {
    if (!token) {
      router.replace("/unauthorized");
    }
  }, [token, router]);

  return (
    <div className="h-screen bg-[#fafafa] dark:bg-background">
      <Navbar />
      <div className="bg-card w-[90%] md:w-1/3 m-auto mt-24 rounded-2xl shadow-lg gap-4 p-4 pb-8 text-primary">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold mb-2">Reset Password</h1>
          <p className="text-sm text-muted-foreground">
            Please Enter your new password
          </p>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
