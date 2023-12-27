'use client'
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import toast from 'react-hot-toast';
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/contextfile";

const comparePics = async (webCamImage: string, uploadedImage: string) => {
    try {
        // Ensure both images are valid base64-encoded strings
        // const base64Regex = /^data:image\/[a-zA-Z]+;base64,/;
        //
        // if (!base64Regex.test(webCamImage) || !base64Regex.test(uploadedImage)) {
        //     throw new Error('Invalid base64-encoded image format');
        // }

        const data = {
            gallery: [uploadedImage],
            probe: [webCamImage],
            search_mode: 'ACCURATE',
        };

        const response = await fetch(`https://eu.opencv.fr/compare`, {
            method: 'POST',
            headers: {
                'X-API-Key': `${process.env.NEXT_PUBLIC_OPENCV_KEY}`,
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
            body: JSON.stringify(data),
        });

        return response.json();
    } catch (error) {
        console.error('Error during face recognition:', error);
        throw error;
    }
};

const FaceRegOpencv = () => {
    const router = useRouter();
    const { isAuthenticated, user, login, logout } = useAuth();
    const webcamRef = useRef<Webcam>(null);
    const [isMatch, setIsMatch] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('')
    const [usernameAdded, setUsernameAdded] = useState(false)
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setUploadedImage(base64String.split(",")[1] || ''); // Remove data:image/jpeg;base64, prefix
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUsername = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            console.log('Enter key pressed!');
            setUsername(e.currentTarget.value);
            setUsernameAdded(true)
        }
    }

    const recognizeFace2 = async () => {
        if (webcamRef.current && uploadedImage) {
            setLoading(true);

            try {
                // Ensure webCamImage is a valid base64-encoded string
                const webCamImage = webcamRef.current.getScreenshot() || '';

                // Convert webcam image to base64-encoded string
                const webCamBase64 = webCamImage.split(",")[1] || '';
                console.log(webCamBase64, uploadedImage)


                // Perform face recognition
                // const response = await comparePics(webCamBase64, webCamBase64);
                const response = await comparePics(webCamBase64, uploadedImage);

                console.log(response);

                if(response.score > 0.5) toast.success('Logged In Successfully!')
                if(response.score < 0.5) toast.error('Face Not Found')

                // Handle the response as needed
            } catch (error) {
                console.error('Error during face recognition:', error);
                toast.error('Error during face recognition');
            } finally {
                setLoading(false);
            }
        }
    };

    const recognizeFace = async () => {
        if (webcamRef.current && usernameAdded) {
            setLoading(true);

            try {
                // Ensure webCamImage is a valid base64-encoded string
                const webCamImage = webcamRef.current.getScreenshot() || '';

                // Convert webcam image to base64-encoded string
                const webCamBase64 = webCamImage.split(",")[1] || '';
                // console.log(webCamBase64, username)

                const response = await axios.post("/authenticate/facial", {
                    webCamBase64,
                    username
                });

                // if (fetch.statusText == "OK") {
                //     toast.success("login successful!");
                //     router.push("/profile");
                // }

                // Perform face recognition
                // const response = await comparePics(webCamBase64, webCamBase64);
                // const response = await comparePics(webCamBase64, uploadedImage);

                console.log(response.data);

                if(response.data.data.score > 0.5) {
                    console.log(response.data.user)
                    login(response.data.user)
                    toast.success('Login Successful!')
                    router.push('/profile')
                }
                if(response.data.data.score < 0.5) toast.error('Face Not Found')

                // Handle the response as needed
            } catch (error) {
                console.error('Error during face recognition:', error);
                toast.error('Error during face recognition');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="flex flex-col px-10 items-center mt-24">
            {/*<input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />*/}
            {!usernameAdded && (
                <div className={'flex flex-col gap-2'}>
                    <label className={'text-2xl font-bold text-[#333]'}>What's your username?</label>
                    <span
                        className={'text-lg'}>It's usually a combination of your firstname and lastname ex. jonathanikpen</span>
                    <input type="text" onKeyDown={handleUsername}
                           className="mb-4 text-2xl w-full h-20 border-b-2 border-slate-600 active:border-none active:outline-0 outline-0"/>
                </div>
            )}
            {usernameAdded && <Webcam ref={webcamRef} className="mb-4"/>}
            {isMatch !== null && (
                <div className={`text-xl font-semibold ${isMatch ? 'text-green-500' : 'text-red-500'}`}>
                    {isMatch ? 'Face Matched!' : 'Face Not Matched!'}
                </div>
            )}
            {usernameAdded && (
                <button className="bg-[#333] p-4 text-white" onClick={recognizeFace} disabled={loading}>
                    {loading ? 'Recognizing...' : 'Capture'}
                </button>
            )}
        </div>
    );
};

export default FaceRegOpencv;
