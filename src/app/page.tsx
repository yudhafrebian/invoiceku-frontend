import Navbar from "@/components/core/navbar";
import HeroSection from "@/view/components/landing/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className=" flex flex-col items-center justify-center z-0">
        <HeroSection />
      </main>
    </>
  );
}
