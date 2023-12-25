"use client"
import { useRouter } from "next/navigation";

// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "@/lib/firebase";


import axios from "axios"

import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler  } from "react-hook-form";

import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import React, {useState} from "react";


type Data = {
    fname: string,
    lname: string,
    phone: string,
    email: string,
    state: string,
    city: string,
    lga: string,
    mat: string,
    department: string,
    yearOfStudy: string,
    yearOfGraduation: string,
    faceUpload: string,
    fingerPrint: string,
}

export default function OboardingForm() {
    // const [userAuth, loading] = useAuthState(auth);
    const router = useRouter()
    const [faceUpload, setFaceUpload] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Data>()

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setFaceUpload(base64String.split(",")[1] || ''); // Remove data:image/jpeg;base64, prefix
            };
            reader.readAsDataURL(file);
        }
    };


    const onSubmit: SubmitHandler<Data> = async (values) => {
        // console.log(values)

        try {
            //   logic here
            const data = {
                fname: values.fname,
                lname: values.lname,
                phone: values.phone,
                email: values.email,
                state: values.state,
                city: values.city,
                lga: values.lga,
                mat: values.mat,
                department: values.department,
                yearOfStudy: values.yearOfStudy,
                yearOfGraduation: values.yearOfGraduation,
                faceUpload: values.faceUpload,
                fingerPrint: values.fingerPrint,
            }
            console.log(data)
            const res = await axios.post('https://codehashira.pythonanywhere.com/register', data)

            console.log(res)
            toast.success("account created");

            if (res.statusText == "OK") {
                  router.push("/profile");
            }
        } catch (error) {
            console.log(error);
            toast.error("error: " + error);
        }
    }



    return (
        <form className="min-h-screen flex flex-col mt-60 px-24 text-[#333] w-full fspace-y-8" onSubmit={handleSubmit(onSubmit)}>
            <p className=" text-center text-xl font-bold">Tell us more about you</p>
            <div className="flex flex-col gap-1">
                <label>First name</label>
                <Input placeholder="John" {...register("fname", { required: true })} />
                {errors.fname && <span className=" text-red-600 text-xs ">Invalid first name</span>}
            </div>
            <div className="flex flex-col gap-1">
                <label>Last name</label>
                <Input placeholder="Doe" {...register("lname", { required: true })} />
                {errors.lname && <span className=" text-red-600 text-xs ">Invalid last name</span>}
            </div>
            <div className="flex flex-col gap-1">
                <label>Phone number</label>
                <Input placeholder="081 00 0123 45" {...register("phone", { required: true })} />
                {errors.phone && <span className=" text-red-600 text-xs ">Invalid phone number</span>}
            </div>
            <div className="flex flex-col gap-1">
                <label>Email</label>
                <Input placeholder="jay@pti.com" type={'email'} {...register("email", { required: true })} />
                {errors.email && <span className=" text-red-600 text-xs ">Invalid Email</span>}
            </div>
            <div className="flex flex-col gap-1">
                <label>State</label>
                <Input placeholder="Delta" {...register("state", { required: true })} />
                {errors.state && <span className=" text-red-600 text-xs ">Invalid State</span>}
            </div>
            <div className="flex flex-col gap-1">
                <label>City</label>
                <Input placeholder="Warri" {...register("city", { required: true })} />
                {errors.city && <span className=" text-red-600 text-xs ">Invalid city</span>}
            </div>
            <div className="flex flex-col gap-1">
                <label>Local Government Area</label>
                <Input placeholder="lga" {...register("lga", { required: true })} />
                {errors.lga && <span className=" text-red-600 text-xs ">Invalid lga</span>}
            </div>
            <div className="flex flex-col gap-1">
                <label>Matriculation Number</label>
                <Input placeholder="M.20 / ND / CSIT / 14533" {...register("mat", { required: true })} />
                {errors.mat && <span className=" text-red-600 text-xs ">Invalid mat no</span>}
            </div>
            <div className="flex flex-col gap-1">
                <label>Department</label>
                <Input placeholder="computer science" {...register("department", { required: true })} />
                {errors.department && <span className=" text-red-600 text-xs ">Invalid department</span>}
            </div>
            <div className="flex flex-col gap-1">
                <label>Year of Study</label>
                <Input placeholder="2020" {...register("yearOfStudy", { required: true })} />
                {errors.yearOfStudy && <span className=" text-red-600 text-xs ">Invalid Year of Study</span>}
            </div>
            <div className="flex flex-col gap-1">
                <label>Year of Graduation</label>
                <Input placeholder="2026" {...register("yearOfGraduation", { required: true })} />
                {errors.yearOfGraduation && <span className=" text-red-600 text-xs ">Invalid Year of Graduation</span>}
            </div>

            <div className="flex flex-col gap-1">
                <label>Upload Picture</label>
                {/*<Input placeholder="Upload your picture" type={'file'} accept={"image/*"} onChange={handleImageUpload} {...register("faceUpload", { required: true })} />*/}
                {errors.faceUpload && <span className=" text-red-600 text-xs ">Invalid Picture Upload</span>}
            </div>

            <Button type="submit" className="w-full bg-prim hover:bg-[#222]">
                Submit
            </Button>
        </form>
    )
}