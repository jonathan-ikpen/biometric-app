"use client"
import Lottie from "lottie-react"
import loading from "@/lib/loading.json"

export const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Lottie animationData={loading} />
        </div>
    )
}