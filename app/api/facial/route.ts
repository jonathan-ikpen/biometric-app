// pages/api/recognize.ts

import { NextApiRequest, NextApiResponse } from 'next';
import * as faceapi from 'face-api.js';

// Import the pre-built browser-compatible bundle
import 'face-api.js/build/face-api.min.js';

// Load face-api.js models
const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models-tinyFaceDetector');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models-faceLandmark68Net');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models-faceRecognitionNet');
};

// Function to recognize faces
const recognizeFace = async (imageDataURL: string) => {
    await loadModels();

    const img = await faceapi.fetchImage(imageDataURL);
    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();

    if (detections) {
        // Perform further face recognition logic here
        // Return relevant information or status
        return { success: true, message: 'Face recognized!' };
    } else {
        return { success: false, message: 'Face not recognized.' };
    }
};

// API route handler
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { imageDataURL } = req.body;

        try {
            const result = await recognizeFace(imageDataURL);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error recognizing face:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
};
