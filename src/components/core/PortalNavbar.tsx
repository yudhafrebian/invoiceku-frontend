import * as React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface INavbarProps {
    name: string
}

const PortalNavbar: React.FunctionComponent<INavbarProps> = (props) => {
  return (
    <nav className="flex justify-between items-center px-4 md:px-20 py-2 shadow bg-white">
      <div className="flex gap-2">
        <p>LOGO</p>
        <p className="text-primary font-bold">Payment Portal</p>
      </div>
      <h1 className="font-bold text-xl text-primary">{props.name}</h1>
    </nav>
  );
};

export default PortalNavbar;
