import * as React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "../ui/separator";

interface INavbarProps {
    name: string
}

const PortalNavbar: React.FunctionComponent<INavbarProps> = (props) => {
  return (
    <nav className="flex justify-between items-center px-4 md:px-20 py-4 shadow bg-white">
      <div className="flex items-center gap-2">
        <Image src="/invoiceku-logo.jpg" width={150} height={32} alt="InvoiceKu Logo" />
        <p className="text-primary font-bold">Payment Portal</p>
      </div>
      <h1 className="font-bold text-xl text-primary">{props.name}</h1>
    </nav>
  );
};

export default PortalNavbar;
