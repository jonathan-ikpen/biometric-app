"use client"
import Camera from "@/app/facial/components/camera";
import * as faceapi from 'face-api.js';
import { useEffect, useState } from 'react';
import toast from "react-hot-toast"
import { detectFace, loadFaceRecognition, matchFaces } from '@/lib/faceRecognition';

const Home: React.FC = () => {
    const [referenceImage, setReferenceImage] = useState<string | null>(null);
    const [isMatch, setIsMatch] = useState<boolean | null>(null);
    const [isLoading, setLoading] = useState(false)
    const [isModelLoading, setModelLoading] = useState(true)

    useEffect(() => {
        loadFaceRecognition(setModelLoading);
    }, []);

    const handleCapture = async (imageSrc: string) => {
        setLoading(true)
        try {
            if (referenceImage) {
                const referenceImageElement = await faceapi.fetchImage(referenceImage);
                const capturedImageElement = await faceapi.fetchImage(imageSrc);

                const referenceDetection = await detectFace(referenceImageElement);
                const capturedDetection = await detectFace(capturedImageElement);

                if (referenceDetection && capturedDetection) {
                    console.log("Comparing Images...")
                    const isMatched = matchFaces(
                        referenceDetection.descriptor,
                        capturedDetection.descriptor
                    );

                    setIsMatch(isMatched);
                    isMatched ? toast.success('Face Matched') : toast.error("Does Not Match")
                }
            }

        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    };



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


