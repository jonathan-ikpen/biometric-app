import React from 'react';
import Webcam from 'react-webcam';

interface CameraProps {
    onCapture: (imageSrc: string) => void;
    loading: boolean;
}

const Camera: React.FC<CameraProps> = ({ onCapture, loading }) => {
    const webcamRef = React.useRef<Webcam>(null);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot() || '';
        onCapture(imageSrc);
    }, [onCapture]);

    return (
        <div className="flex flex-col gap-8">
            <Webcam
                audio={false}
                height={500}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={500}
            />
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
