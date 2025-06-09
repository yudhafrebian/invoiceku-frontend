import Navbar from "@/components/core/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className=" flex flex-col items-center justify-center">
        <Image src={"under-construction.svg"} width={500} height={500} alt="under-construction" />
        <h1 className="text-3xl font-bold text-primary">Landing Page is under construction</h1>
      </div>
    </>
  );
}
