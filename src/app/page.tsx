import Navbar from "@/components/core/LandingPageNavbar";
import DashboardPreview from "@/view/components/landing/DashboardPreview/DashboardPreview";
import FrequentQuestions from "@/view/components/landing/FAQ";
import HeroSection from "@/view/components/landing/HeroSection";
import KeyFeatures from "@/view/components/landing/KeyFeatures";
import Testimonials from "@/view/components/landing/Testimonials";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className=" flex flex-col items-center justify-center scroll-smooth ">
        <HeroSection />
        <KeyFeatures />
        <DashboardPreview />
        <Testimonials />
        <FrequentQuestions />
      </main>
    </>
  );
}
