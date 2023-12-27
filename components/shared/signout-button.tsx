"use client";
import React from "react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useAuth } from "@/utils/contextfile";

const SignOutButton = () => {
  const { isAuthenticated, user, login, logout } = useAuth();

  const handleSignOut = async () => {
    try {
      logout();
      toast.success("You are signed out");
    } catch(error) {
      toast.error("error: " + error);
    }
  };

  return (
    <Button onClick={handleSignOut} className="bg-[#333]">
      Log Out
    </Button>
  );
};

export default SignOutButton;
