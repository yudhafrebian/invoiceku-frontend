"use client";

import * as React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from "@react-hookz/web";
import { ModeToggle } from "./ThemeToogle";
import { useTheme } from "next-themes";

interface INavbarProps {}

const Navbar: React.FunctionComponent<INavbarProps> = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc =
    resolvedTheme === "dark"
      ? "/invoiceku-logo-light.png"
      : "/invoiceku-logo.png";

  return (
    <nav className="flex justify-between  items-center bg-background dark:border-b  z-10 px-4 md:px-20 py-3">
      <div className="relative w-[104px] h-6 md:w-36 md:h-8">
        <Link href={"/"}>
          {mounted && (
            <Image
              src={logoSrc}
              fill
              alt="InvoiceKu Logo"
            />
          )}
        </Link>
      </div>
      <div className="flex gap-1 md:gap-3">
        <ModeToggle />
        <Link href={"/auth/sign-in"}>
          <Button
            variant="ghost"
            size={isMobile ? "sm" : "default"}
          >
            Sign In
          </Button>
        </Link>
        <Link href={"/auth/sign-up"}>
          <Button size={isMobile ? "sm" : "default"}>Sign Up</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
