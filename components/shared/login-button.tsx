import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

function LoginButton() {
  return (
    <Link href={"/login"}>
      <Button className="bg-[#333] hover:bg-[#222]">Log In</Button>
    </Link>
  );
}

export default LoginButton;
