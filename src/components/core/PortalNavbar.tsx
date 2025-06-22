import * as React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { useTheme } from "next-themes";

interface INavbarProps {
  name: any;
}

const PortalNavbar: React.FunctionComponent<INavbarProps> = (props) => {
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
    <nav className="flex justify-between items-center px-2 md:px-20 md:py-4 py-2 shadow bg-background dark:border-b-2">
      <div className="flex flex-col md:flex-row items-center gap-2">
        <div className="relative w-26 h-6 md:w-36 md:h-8">
          {mounted && (
            <Image
              src={logoSrc}
              fill
              alt="InvoiceKu Logo"
            />
          )}
        </div>
        <p className="text-primary md:text-base text-sm font-bold">Payment Portal</p>
      </div>
      <h1 className="font-bold text-sm md:text-xl text-primary">{props.name}</h1>
    </nav>
  );
};

export default PortalNavbar;
