"use client";
import Navbar from "@/components/core/Navbar";
import ResetPasswordForm from "@/view/components/auth/ResetPasswordForm";
import { redirect, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const ResetPasswordPage = () => {
  const queryParams = useSearchParams();
  const token = queryParams.get("tkn");
  if (!token) {
    redirect("/unauthorized");
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="h-screen bg-[#fafafa]">
        <Navbar />
        <div className="bg-white w-[90%] md:w-1/3 m-auto mt-24 rounded-2xl shadow-lg gap-4 p-4 pb-8 text-primary">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-semibold mb-2">Reset Password</h1>
            <p className="text-sm text-muted-foreground">
              Please Enter your new password
            </p>
          </div>
          <ResetPasswordForm />
        </div>
      </div>
    </Suspense>
  );
};

export default ResetPasswordPage;
