"use client";
import { useState, FormEvent } from "react";
import axios from "@/lib/axios";
import { fingerRegClient, fingerAuthClient } from "@/lib/fingerprint_client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/contextfile"
import Link from "next/link"

export default function Fingerprint() {
  const router = useRouter();
  const { isAuthenticated, user, login, logout } = useAuth();
  const [inputValue, setInputValue] = useState<string>("");
  const [color, setColor] = useState("#f7f7f7")
  const [loading, setLoading] = useState(false);


  const handleAuth = async () => {
    setLoading(true)
    try {
      const { authentication, challenge } = await fingerAuthClient();
      setColor('#0000FF')
      const fetch = await axios.post("/authenticate/fingerprint", {
        authentication,
        challenge,
      });
      console.log(fetch.data.user);
      setColor('#00ff04')


      setTimeout(() => {
        if (fetch.statusText == "OK" || fetch.data.success) {
          login(fetch.data.user)
          toast.success("login successful!");
          router.push("/profile");
        }
      }, 1000)

    } catch (error) {
      setColor('#ff003b')
      console.log(error);
      toast.error("login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
      <main className="flex max-h-screen flex-col gap-40 fitems-center fjustify-between px-24">
        <div className="w-full flex flex-col items-center">

          <div className={'border-2 border-[#333] rounded-lg flex flex-col gap-2 justify-center items-center p-2'}
          >
            <div className="">
              <div className="">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    style={{color: color, fill: color}}
                >
                  <path
                      fill="currentColor"
                      d="M3.25 9.65q-.175-.125-.213-.313t.113-.387q1.55-2.125 3.888-3.3t4.987-1.175q2.65 0 5 1.138T20.95 8.9q.175.225.113.4t-.213.3q-.15.125-.35.113t-.35-.213q-1.375-1.95-3.537-2.987t-4.588-1.038q-2.425 0-4.55 1.038T3.95 9.5q-.15.225-.35.25t-.35-.1Zm11.6 12.325q-2.6-.65-4.25-2.588T8.95 14.65q0-1.25.9-2.1t2.175-.85q1.275 0 2.175.85t.9 2.1q0 .825.625 1.388t1.475.562q.85 0 1.45-.563t.6-1.387q0-2.9-2.125-4.875T12.05 7.8q-2.95 0-5.075 1.975t-2.125 4.85q0 .6.113 1.5t.537 2.1q.075.225-.012.4t-.288.25q-.2.075-.388-.013t-.262-.287q-.375-.975-.537-1.938T3.85 14.65q0-3.325 2.413-5.575t5.762-2.25q3.375 0 5.8 2.25t2.425 5.575q0 1.25-.887 2.087t-2.163.838q-1.275 0-2.188-.838T14.1 14.65q0-.825-.612-1.388t-1.463-.562q-.85 0-1.463.563T9.95 14.65q0 2.425 1.438 4.05t3.712 2.275q.225.075.3.25t.025.375q-.05.175-.2.3t-.375.075ZM6.5 4.425q-.2.125-.4.063t-.3-.263q-.1-.2-.05-.362T6 3.575q1.4-.75 2.925-1.15t3.1-.4q1.6 0 3.125.388t2.95 1.112q.225.125.263.3t-.038.35q-.075.175-.25.275t-.425-.025q-1.325-.675-2.738-1.038t-2.887-.362q-1.45 0-2.85.338T6.5 4.425Zm2.95 17.2q-1.475-1.55-2.263-3.163T6.4 14.65q0-2.275 1.65-3.838t3.975-1.562q2.325 0 4 1.563T17.7 14.65q0 .225-.138.363t-.362.137q-.2 0-.35-.138t-.15-.362q0-1.875-1.388-3.138t-3.287-1.262q-1.9 0-3.263 1.263T7.4 14.65q0 2.025.7 3.438t2.05 2.837q.15.15.15.35t-.15.35q-.15.15-.35.15t-.35-.15Zm7.55-1.7q-2.225 0-3.863-1.5T11.5 14.65q0-.2.138-.35t.362-.15q.225 0 .363.15t.137.35q0 1.875 1.35 3.075t3.15 1.2q.15 0 .425-.025t.575-.075q.225-.05.388.063t.212.337q.05.2-.075.35t-.325.2q-.45.125-.787.138t-.413.012Z"
                  />
                </svg>
              </div>
            </div>
            <div className="">
              <button
                  className=" p-4 bg-slate-100 text-xs ml-6 rounded"
                  onClick={handleAuth}
                  disabled={loading}
              >
                {loading ? 'Checking...' : 'Authenticate' }
              </button>
            </div>
          </div>
        </div>
      </main>
  );
}