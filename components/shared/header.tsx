"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import LoginButton from "./login-button";
import logo from '../../public/assets/PTI-Logo.jpg'
import SignOutButton from "./signout-button";

import { Button } from "../ui/button";
// import { useAuthState } from "";

const Header = () => {
  // const [user, loading, error] = useAuthState();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white flex items-center justify-between px-6 py-4 border-b dark:border-zinc-800">
      <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt={'pti logo'} width={30} height={30}/>
          <span className="text-lg font-semibold">PTI Biometrics Database</span>
      </Link>

      {/*{user ? <SignOutButton /> : <LoginButton />}*/}
       <LoginButton />
    </header>
  );
};

export default Header;
