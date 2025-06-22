"use client";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel";
  import Image from "next/image";
  import Autoplay from "embla-carousel-autoplay";

const SignUpCarousel = () => {
  return (
    <div className="relative hidden md:block h-full w-1/2 bg-[#fafafa] dark:bg-card dark:border dark:border-muted rounded-2xl p-4 ">
    <Carousel
      opts={{ loop: true, align: "start" }}
      plugins={[Autoplay({ delay: 3000 })]}
    >
      <CarouselContent>
        <CarouselItem className="flex flex-col justify-center items-center">
          <Image
            src={"../invoice.svg"}
            width={400}
            height={400}
            alt=""
          />
          <div className="text-2xl font-semibold text-center">
            <p>Create your own invoice</p>
            <p>Easy, fast and secure</p>
          </div>
        </CarouselItem>
        <CarouselItem className="flex flex-col justify-center items-center">
          <Image src={"../payment.svg"} width={400} height={400} alt="" />
          <div className="text-2xl font-semibold text-center">
            <p>Easy Payment</p>
            <p>Pay Anywhere With Ease</p>
          </div>
        </CarouselItem>
        <CarouselItem className="flex flex-col justify-center items-center">
          <Image src={"../secure.svg"} width={400} height={400} alt="" />
          <div className="text-2xl font-semibold text-center">
            <p>100% Secure</p>
            <p>Your Data Is Safe With Us</p>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </div>
  )
};

export default SignUpCarousel;
