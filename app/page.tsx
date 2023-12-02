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
    <main className="flex max-h-screen flex-col gap-40 items-center fjustify-between p-24">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-5xl font-bold mb-10">Fingerprint Authenticator</h1>

        <div className="text-center">
          <input
            type="text"
            className="w-96 bg-slate-50 p-4 rounded"
            placeholder="username"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <br />
          <br />
          <button
            onClick={handleSubmit}
            className=" p-2 bg-slate-300 text-xs rounded"
          >
            Register
          </button>
          <button
            className=" p-2 bg-slate-100 text-xs ml-6 rounded"
            onClick={handleAuth}
          >
            Authenticate
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col items-center">
        <Link className=" bg-[#333] text-white p-4 font-bold mb-10" href={'/facial'}>Facial Recognition</Link>

      </div>
    </main>
  );
}
