"use client";
import Navbar from "@/components/core/navbar";
import { apiCall } from "@/utils/apiHelper";
import Image from "next/image";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import * as React from "react";



const VerifyPage = () => {
  const queryParams = useSearchParams()
  const token = queryParams.get("tkn");
  if(!token){
    redirect("/unauthorized");
  }
  const verifyAccount = async () => {
    try {
      const response = await apiCall.patch(`/auth/verify`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    verifyAccount();
  }, []);
  return (
    <>
    <div className="bg-[#FAFAFA] h-screen">
    <Navbar />
      <div className="p-8 shadow-lg w-1/3 m-auto mt-24 border rounded-2xl text-center text-primary">
        <h1 className="text-2xl font-bold">Verify Account Success</h1>
        <p className="mt-4">Your account has been successfully verified</p>
        <p>Go back to website <Link className="text-blue-500 underline" href="/">here</Link></p>
        <div className="relative w-48 h-48 m-auto ">
            <Image src={"success_verify.svg"} alt="verify" fill  />
        </div>
      </div>
    </div>
    </>
  );
};

export default VerifyPage;
