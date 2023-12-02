// components/FaceRecognition.tsx
"use client"
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import toast from "react-hot-toast";
import * as faceapi from 'face-api.js';

const FaceRecognition: React.FC = () => {
    const webcamRef = useRef<Webcam>(null);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [isMatch, setIsMatch] = useState<boolean | null>(null);

    const loadModels = async () => {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const recognizeFace = async () => {
        if (webcamRef.current && uploadedImage) {
            console.log(uploadedImage)
            const webcamCanvas = webcamRef.current.video;
            const img = await faceapi.fetchImage(uploadedImage);
            const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();

            if (detections && webcamCanvas) {
                const descriptor = detections.descriptor;
                const faceMatcher = new faceapi.FaceMatcher(descriptor);
                const videoDetections = await faceapi.detectAllFaces(webcamCanvas).withFaceLandmarks().withFaceDescriptors();
                const match = videoDetections.some((videoDescriptor) => faceMatcher.findBestMatch(videoDescriptor.descriptor).label === 'match');

                setIsMatch(match);
                isMatch ? toast.success('Face Matched!') : toast.error('Face does not match')
            }
        }
    };

    useEffect(() => {
        const loadModelsAndRecognize = async () => {
            await loadModels();
            console.log('Models loaded successfully');
            // Now that the models are loaded, you can perform any additional setup or recognition.
        };

        loadModelsAndRecognize();
    }, []);

    return (
        <div className="flex flex-col items-center mt-8">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
            {/*{uploadedImage && (*/}
            {/*    <div className="mb-4">*/}
            {/*        <img src={uploadedImage} alt="Uploaded" className="max-w-full h-auto" />*/}
            {/*    </div>*/}
            {/*)}*/}
            <Webcam ref={webcamRef} className="mb-4" />
            {isMatch !== null && (
                <div className={`text-xl font-semibold ${isMatch ? 'text-green-500' : 'text-red-500'}`}>
                    {isMatch ? 'Face Matched!' : 'Face Not Matched!'}
                </div>
            )}
            <button
                className="bg-[#333] p-4 text-white"
                onClick={recognizeFace}
            >
                Capture
            </button>
        </div>
    );
};

export default FaceRecognition;
