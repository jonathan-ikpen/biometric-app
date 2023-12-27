"use client"
import Camera from "@/app/facial/components/camera";
import * as faceapi from '../../face-api.min.js';
import { useEffect, useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast"
import { detectFace, loadFaceRecognition, matchFaces, matchFaceWithSsd } from '@/lib/faceRecognition';

// Import the pre-built browser-compatible bundle
import '../../face-api.min.js'
// import '/face-api.min.js'


const Home: React.FC = () => {
    const [referenceImage, setReferenceImage] = useState<string | null>(null);
    const [isMatch, setIsMatch] = useState<boolean | null>(null);
    const [isLoading, setLoading] = useState(false)
    const [isModelLoading, setModelLoading] = useState(true)

    useEffect(() => {
        loadFaceRecognition(setModelLoading);
    });

    const handleCapture = async (imageSrc: string) => {
        setLoading(true);

        try {
            // if (referenceImage) {
            //     const [referenceImageElement, capturedImageElement] = await Promise.all([
            //         faceapi?.fetchImage(referenceImage),
            //         faceapi?.fetchImage(imageSrc)
            //     ]);
            //
            //     console.log(referenceImageElement, capturedImageElement);
            //
            //
            //     const [referenceDetection, capturedDetection] = await Promise.all([
            //         faceapi.detectSingleFace(referenceImageElement, new faceapi.SsdMobilenetv1Options()).withFaceLandmarks().withFaceDescriptor(),
            //         faceapi.detectSingleFace(capturedImageElement, new faceapi.SsdMobilenetv1Options()).withFaceLandmarks().withFaceDescriptor()
            //     ]);
            //
            //     console.log("Reference Detection:", referenceDetection);
            //     console.log("Captured Detection:", capturedDetection);
            //
            //
            //     if (referenceDetection && capturedDetection) {
            //         console.log("Comparing Images...");
            //         const isMatched = matchFaces(
            //             referenceDetection.descriptor,
            //             capturedDetection.descriptor
            //         );
            //
            //         setIsMatch(isMatched);
            //         isMatched && toast.success('Face Matched');
            //         !isMatched && toast.error("Does Not Match");
            //     } else {
            //         console.log("Couldn't capture: (ref, cap)", referenceDetection, capturedDetection);
            //     }
            // }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };



    const handleCapture2 = async (imageSrc: string) => {
        setLoading(true);

        console.log(referenceImage, imageSrc)

        try {
            if (referenceImage) {

                const response = await axios.post('/api/facial', {
                    referenceImage,
                    capturedImage: imageSrc
                })

                if (response.status == 200) {
                    console.log(response)
                    const { isMatched } = response.data;

                    setIsMatch(isMatched);
                    isMatched ? toast.success('Face Matched') : toast.error('Face Not Matched');
                } else {
                    console.error('Server error:', response.statusText);
                    toast.error('Server error');
                }
            }
        } catch (err) {
            console.error('Error during face recognition:', err);
            toast.error('Error during face recognition');
        } finally {
            setLoading(false);
        }
    };


    const handleCapture3 = async (imageSrc: string) => {
        setLoading(true)
        try {
            // if (referenceImage) {
            //     const referenceImageElement = await faceapi.fetchImage(referenceImage);
            //     const capturedImageElement = await faceapi.fetchImage(imageSrc);
            //
            //     try {
            //
            //         console.log("Comparing Images...")
            //         const matched = await matchFaceWithSsd(referenceImageElement, capturedImageElement)
            //
            //         console.log(await matched)
            //         // setIsMatch(true);
            //         // isMatch ? toast.success('Face Matched') : toast.error("Does Not Match")
            //     } catch(err) {
            //         console.log(err)
            //     }
            // }

        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }


    return (
        <div className="flex max-h-screen flex-col gap-4 items-center fjustify-between p-24">
            <h1 className="text-5xl font-bold mb-10">Facial Recognition</h1>
            {isModelLoading && <p>Loading...</p>}
            {!isModelLoading && (
                <div className="flex flex-col gap-4 items-center">
                    <input
                        type="file"
                        onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setReferenceImage(reader.result as string);
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                    />
                    {referenceImage && (
                        <div>
                            <Camera onCapture={handleCapture} loading={isLoading} />
                            {isMatch !== null && (
                                <p>{isMatch ? 'Face Matched!' : 'Face Not Matched!'}</p>
                            )}
                        </div>
                    )};
                </div>
            )}
        </div>
    );
};

export default Home;


