import * as React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

interface INavbarProps {}

const LandingPageNavbar: React.FunctionComponent<INavbarProps> = (props) => {
  return (
    <nav className="flex justify-between backdrop-blur-2xl items-center bg-white/30 backdrop-saturate-150 absolute w-full z-10 px-4 md:px-20 py-3">
      <div className="relative w-26 h-6 md:w-36 md:h-8">
        <Link href={"/"}>
          <Image
            src="/invoiceku-logo.png"
            fill
            alt="InvoiceKu Logo"
          />
        </Link>
      </div>
      <div className="flex gap-1 md:gap-3">
        <Link href={"/auth/sign-in"}>
          <Button variant={"ghost"}>Sign In</Button>
        </Link>
        <Link href={"/auth/sign-up"}>
          <Button>Sign Up</Button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingPageNavbar;
