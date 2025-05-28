import Navbar from "@/components/core/navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

interface IVerifyPageProps {}

const VerifyPage: React.FunctionComponent<IVerifyPageProps> = (props) => {
  return (
    <div className="bg-[#FAFAFA] h-screen flex justify-center">
      {/* <Navbar /> */}
      <div className="p-8 shadow-lg w-1/3 m-auto border rounded-2xl text-center text-primary">
        <h1 className="text-2xl font-bold">Verify Account Success</h1>
        <p className="mt-4">Your account has been successfully verified</p>
        <p>Go back to website <Link className="text-blue-500 underline" href="/">here</Link></p>
        <div className="relative w-48 h-48 m-auto ">
            <Image src={"success_verify.svg"} alt="verify" fill  />
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
