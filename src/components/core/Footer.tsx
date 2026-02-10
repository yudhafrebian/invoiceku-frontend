import { Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";

const Footer = () => {
  return (
    <footer className="md:px-20 md:py-12 px-8 py-4 bg-[#111827] ">
      <div className="flex flex-col md:flex-row gap-4 justify-around">
        <div className="flex flex-col gap-4">
          <Image
            src="/invoiceku-logo-light.png"
            width={150}
            height={32}
            alt={"InvoiceKu Logo"}
          />
          <p className="text-[#9CA3AF] md:text-base text-sm">
            Simplifying invoice management for businesses worldwide.
          </p>
          <div className="flex gap-4 ">
            <Instagram aria-label="Instagram" className="text-[#9CA3AF] hover:text-white/40 w-4 h-4 md:w-6 md:h-6" />
            <Twitter aria-label="Twitter" className="text-[#9CA3AF] hover:text-white/40 w-4 h-4 md:w-6 md:h-6" />
            <Linkedin aria-label="Linkedin" className="text-[#9CA3AF] hover:text-white/40 w-4 h-4 md:w-6 md:h-6" />
          </div>
        </div>
        <div className="md:text-base text-sm">
          <p className="text-white font-semibold mb-2 md:mb-4">Product</p>
          <ul className="text-[#9CA3AF] flex flex-col gap-2">
            <li>
              <Link href="#" className="hover:text-white/40">
                Features
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white/40">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white/40">
                Integrations
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:text-base text-sm">
          <p className="text-white font-semibold mb-2 md:mb-4">Support</p>
          <ul className="text-[#9CA3AF] flex flex-col gap-2">
            <li>
              <Link href="#" className="hover:text-white/40">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white/40">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white/40">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Separator className="my-2 md:my-4 bg-[#1F2937]" />
      <p className="text-[#9CA3AF] text-center md:text-base text-xs">
        © 2025 InvoiceKu. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
