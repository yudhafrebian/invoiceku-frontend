"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface IHeroSectionProps {}

const HeroSection: React.FunctionComponent<IHeroSectionProps> = (props) => {
  return (
    <div className="relative w-full px-8 md:px-20 py-48 md:py-56 flex items-center justify-center">
      <Image
        src={"/hero-bg-1.jpg"}
        alt="hero"
        fill
        objectFit="cover"
        className="absolute z-0"
      />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col text-white gap-12 items-center relative z-10">
          <div className="font-bold text-4xl md:text-6xl text-center">
            <h1>Simplify Your</h1>
            <h1>Invoicing Process</h1>
          </div>

          <p className="text-sm md:text-xl text-center text-white">
            Easily create, send, and track invoices — all in one place.
          </p>

          <div>
            <Link href={"/auth/sign-up"}>
              <Button variant={"secondary"} size={"xl"}>Get Started</Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
