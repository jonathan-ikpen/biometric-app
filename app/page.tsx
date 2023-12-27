"use client";
import { useState, FormEvent } from "react";
import axios from "@/lib/axios";
import { fingerRegClient, fingerAuthClient } from "@/lib/fingerprint_client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link"

export default function Home() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = async () => {
    console.log(inputValue);
    const { registration, challenge } = await fingerRegClient(inputValue);

    try {
      const fetch = await axios.post("/register", {
        registration,
        challenge,
        username: inputValue,
      });

      console.log(fetch);

      if (fetch.statusText == "OK") {
        toast.success("Registration successful");
        // router.push("/profile");
      }
    } catch (error) {
      console.log("Client: ", error);
      toast.error("registration failed");
    }
  };

  const handleAuth = async () => {
    try {
      const { authentication, challenge } = await fingerAuthClient();
      const fetch = await axios.post("/authenticate", {
        authentication,
        challenge,
      });
      console.log(fetch);

      if (fetch.statusText == "OK") {
        toast.success("login successful!");
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
      toast.error("login failed");
    }
  };

  return (
          <div className="max-h-screen flex items-center justify-center text-[#333] px-10 md:px-40">
            <div className="text-center">
              <h1 className="text-4xl font-bold pb-10 border-b border-[#666]">Welcome to PTI Student Database System</h1>
              <div className="text-lg py-6 flex flex-col gap-4">
                <p className={'font-bold'}>🔒 Secure Authentication</p>
                <p className={'text-left'}> Experience enhanced security with facial recognition and fingerprint technology, ensuring accurate
                  and efficient student authentication.</p>
                <p className={'italic text-[#666]'}>Built by Project Group 7</p>
              </div>
              <Link href={'/register'} className="bg-[#333] text-white p-4 font-bold mt-10">
                Get Started
              </Link>
            </div>
          </div>
  );
}
