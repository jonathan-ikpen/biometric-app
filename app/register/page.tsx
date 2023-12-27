"use client"
import axios from "axios"
import { useRouter } from "next/navigation";

// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "@/lib/firebase";
// import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler  } from "react-hook-form";

import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import React, {useState} from "react";
import {fingerAuthClient, fingerRegClient} from "@/lib/fingerprint_client";

interface FingerRegResponse {
    registration: string;
    challenge: string;
    username: string;
}

type Data = {
    fname: string,
    lname: string,
    phone: string,
    email: string,
    state: string,
    city: string,
    lga: string,
    address: string,
    mat: string,
    department: string,
    yearOfStudy: string,
    yearOfGraduation: string,
    faceUpload: [File],
    registration: string,
    challenge: string,
}

const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const base64String = reader.result as string;
            resolve(base64String.split(",")[1] || ''); // Remove data:image/jpeg;base64, prefix
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
};



export default function RegisterForm() {
    // const [userAuth, loading] = useAuthState(auth);
    const [stage, setStage] = useState(1)
    const router = useRouter()
    const [faceUpload, setFaceUpload] = useState<string | null>(null);
    const [fingerData, setFingerData] = useState({
        registration: { },
        challenge: '',
        username: '',
        text: 'Upload your fingerprint',
    })

    const {
        register,
        getValues,
        handleSubmit,
        watch,
        formState: {errors},
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

    const handleFingerPrint = async () => {
        const [fname, lname] = getValues(["fname", "lname"])
        const username = fname+lname
        const { registration, challenge } = await fingerRegClient(username);
        const text = 'fingerprint uploaded'

        setFingerData({ registration, challenge, username, text })

    }


    const onSubmit: SubmitHandler<Data> = async (values) => {
        const faceUpload = await readFileAsBase64(values.faceUpload?.[0])

        try {
            //   logic here
            const data = {
                username: fingerData.username,
                fname: values.fname,
                lname: values.lname,
                phone: values.phone,
                email: values.email,
                state: values.state,
                city: values.city,
                lga: values.lga,
                address: values.address,
                mat: values.mat,
                department: values.department,
                yearOfStudy: values.yearOfStudy,
                yearOfGraduation: values.yearOfGraduation,
                faceUpload: faceUpload,
                registration: fingerData.registration,
                challenge: fingerData.challenge,
            }
            console.log(data)

            const res = await axios.post("/api/register", data);

            console.log(res);


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
        <form className=" flex flex-col mt-24 mb-20 px-10 text-[#333] max-w-7xl w-full fspace-y-8"
              onSubmit={handleSubmit(onSubmit)}>
            <h1 className=" text-center text-3xl font-bold pb-8">Register Here</h1>
            <div className={'text-lg grid grid-cols-2 gap-20'}>
                <div className={'flex flex-col gap-4'}>
                    <div className="flex flex-col gap-1">
                        <label className={'font-semibold'}>First Name</label>
                        <Input placeholder="John" {...register("fname", {required: true})} />
                        {errors.fname && <span className=" text-red-600 text-xs ">Invalid first name</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className={'font-semibold'}>Last Name</label>
                        <Input placeholder="Doe" {...register("lname", {required: true})} />
                        {errors.lname && <span className=" text-red-600 text-xs ">Invalid last name</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className={'font-semibold'}>Phone Number</label>
                        <Input placeholder="081 00 0123 45" {...register("phone", {required: true})} />
                        {errors.phone && <span className=" text-red-600 text-xs ">Invalid phone number</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className={'font-semibold'}>Email Address</label>
                        <Input placeholder="jay@pti.com" type={'email'} {...register("email", {required: true})} />
                        {errors.email && <span className=" text-red-600 text-xs ">Invalid Email</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className={'font-semibold'}>State</label>
                        <Input placeholder="Delta" {...register("state", {required: true})} />
                        {errors.state && <span className=" text-red-600 text-xs ">Invalid State</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className={'font-semibold'}>City</label>
                        <Input placeholder="Warri" {...register("city", {required: true})} />
                        {errors.city && <span className=" text-red-600 text-xs ">Invalid city</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className={'font-semibold'}>Local Government Area</label>
                        <Input placeholder="" {...register("lga", {required: true})} />
                        {errors.lga && <span className=" text-red-600 text-xs ">Invalid lga</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className={'font-semibold'}>Address</label>
                        <Input placeholder="" {...register("address", {required: true})} />
                        {errors.address && <span className=" text-red-600 text-xs ">Invalid address</span>}
                    </div>
                </div>
                <div className={'flex flex-col gap-4'}>
                    <div className="flex flex-col gap-1">
                        <label className={'font-semibold'}>Matriculation Number</label>
                        <Input placeholder="M.20 / ND / CSIT / 14533" {...register("mat", {required: true})} />
                        {errors.mat && <span className=" text-red-600 text-xs ">Invalid mat no</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className={'font-semibold'}>Department</label>
                        <Input placeholder="computer science" {...register("department", {required: true})} />
                        {errors.department && <span className=" text-red-600 text-xs ">Invalid department</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className={'font-semibold'}>Year of Study</label>
                        <Input placeholder="2020" {...register("yearOfStudy", {required: true})} />
                        {errors.yearOfStudy && <span className=" text-red-600 text-xs ">Invalid Year of Study</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className={'font-semibold'}>Year of Graduation</label>
                        <Input placeholder="2026" {...register("yearOfGraduation", {required: true})} />
                        {errors.yearOfGraduation &&
                            <span className=" text-red-600 text-xs ">Invalid Year of Graduation</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className={'font-semibold'}>Upload Picture</label>
                        <Input placeholder="Upload your picture" type={'file'} accept={"image/*"} className={'cursor-pointer'} {...register("faceUpload", { required: false })} />
                        {errors.faceUpload && <span className=" text-red-600 text-xs ">Invalid Picture Upload</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className={'font-semibold'}>Add Fingerprint</label>
                        <Input placeholder="Upload your fingerprint" type={'button'} value={fingerData.text} className={'cursor-pointer'} onClick={handleFingerPrint} />
                        {errors.registration && <span className=" text-red-600 text-xs ">Invalid Finger print</span>}
                    </div>

                    <Button className="w-full bg-[#222]">
                        Submit
                    </Button>
                </div>

            </div>

        </form>
    )
}

