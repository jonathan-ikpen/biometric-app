"use client"
import React, {useState} from 'react';
import Webcam from 'react-webcam';
import Image from "next/image";

interface CameraProps {
    onCapture: (imageSrc: string) => void;
    loading: boolean;
}

const Camera: React.FC<CameraProps> = ({ onCapture, loading }) => {
    const webcamRef = React.useRef<Webcam>(null);
    const [imageUrl, setImageUrl] = useState('')

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot() || '';
        setImageUrl(imageSrc)
        onCapture(imageSrc);
    }, [onCapture]);

    return (
        <div className="flex flex-col gap-8">
            {!imageUrl ? (<Webcam
                audio={false}
                height={500}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={500}
            /> ): (
                <Image src={imageUrl} alt={'screenshot'} width={500} height={500} />
            )
            }
            <button
                className="bg-[#333] p-4 text-white"
                onClick={capture}
                disabled={loading}
            >
                {!loading ? 'Capture' : 'loading...'}
            </button>
        </div>
    );
};

export default Camera;
