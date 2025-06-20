import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as React from "react";

interface IHeroSectionProps {}

const HeroSection: React.FunctionComponent<IHeroSectionProps> = (props) => {
  return (
    <div className="bg-[#F8FAFC] w-full px-20 py-40 flex items-center justify-center">
      <div className="flex flex-col gap-12 items-center">
        <div className="font-bold text-6xl text-center">
          <h1>Simplify Your</h1>
          <h1>Invoicing Process</h1>
        </div>

        <p className="text-xl text-center text-muted-foreground">
          Easily create, send, and track invoices — all in one place.
        </p>

        <div>
          <Link href={"/auth/sign-up"}>
            <Button size={"lg"}>Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
