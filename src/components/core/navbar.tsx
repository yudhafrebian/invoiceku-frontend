import * as React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface INavbarProps {}

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
  return (
    <nav className="flex justify-between items-center px-4 md:px-20 py-2">
      <div>
        <Link href={"/"}>
        <p>LOGO</p>
        </Link>
      </div>
      <div className="flex gap-1 md:gap-3">
        <Link href={"/auth/sign-in"}>
          <Button variant={"ghost"}>Sign In</Button>
        </Link>
        <Link href={"/auth/sign-up"}>
          <Button>Sign Up</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
