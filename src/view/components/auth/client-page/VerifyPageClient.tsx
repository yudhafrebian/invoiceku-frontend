"use client";

import Navbar from "@/components/core/TempNavbar";
import { apiCall } from "@/utils/apiHelper";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

const VerifyPageClient = () => {
  const router = useRouter();
  const queryParams = useSearchParams();
  const token = queryParams.get("tkn");

  React.useEffect(() => {
    if (!token) {
      router.replace("/unauthorized");
      return;
    }

    const verifyAccount = async () => {
      try {
        await apiCall.patch(`/auth/verify`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error(error);
      }
    };

    verifyAccount();
  }, [token, router]);

  return (
    <div className="bg-[#FAFAFA] h-screen">
      <Navbar />
      <div className="p-8 shadow-lg w-1/3 m-auto mt-24 border rounded-2xl text-center text-primary">
        <h1 className="text-2xl font-bold">Verify Account Success</h1>
        <p className="mt-4 text-muted-foreground">
          Your account has been successfully verified
        </p>
        <p className="text-muted-foreground">
          Go back to website{" "}
          <Link className="hover:text-primary underline" href="/">
            here
          </Link>
        </p>
        <div className="relative w-48 h-48 m-auto ">
          <Image src="/verified.svg" alt="verify" fill />
        </div>
      </div>
    </div>
  );
};

export default VerifyPageClient;
