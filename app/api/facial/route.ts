import * as faceapi from 'face-api.js';
import { detectFace, matchFaces } from '@/lib/faceRecognition';
import {NextResponse} from "next/server";


// Load face-api.js models
const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
};

loadModels()


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { referenceImage, capturedImage } = body;

        const referenceImageElement = await faceapi.fetchImage(referenceImage);
        const capturedImageElement = await faceapi.fetchImage(capturedImage);

        const referenceDetection = await detectFace(referenceImageElement);
        const capturedDetection = await detectFace(capturedImageElement);

        console.log(referenceDetection, capturedDetection)

        if (referenceDetection && capturedDetection) {
            const isMatched = matchFaces(
                referenceDetection.descriptor,
                capturedDetection.descriptor
            );

            return NextResponse.json({
                success: true,
                isMatched
            });
        } else {
            return NextResponse.json({
                success: false,
                msg: "Face not detected in either image",
            });
        }
    } catch (error) {
        console.error('Error during face recognition:', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
