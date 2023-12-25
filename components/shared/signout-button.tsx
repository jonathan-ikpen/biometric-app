"use client";
import React from "react";
import { Button } from "../ui/button";
// import { useSignOut, useAuthState } from "";
import toast from "react-hot-toast";

const SignOutButton = () => {
  // const [signOut, loading, error] = useSignOut();

  const handleSignOut = async () => {
    // const success = await signOut();
    // if (success) {
    //   toast.success("You are signed out");
    // } else {
    //   toast.error("error: " + error);
    // }
  };

  return (
    <Button onClick={handleSignOut} className="bg-[#333]">
      Log Out
    </Button>
  );
};

export default SignOutButton;
