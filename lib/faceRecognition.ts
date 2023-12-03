"use client"
import React from "react";
import * as faceapi from 'face-api.js';

// Import the pre-built browser-compatible bundle
import '../face-api.min.js'
import '/face-api.min.js'


export const loadFaceRecognition = async (setModelLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
    ]).then(() => setModelLoading(false))
    // try {
    //     // await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    //     // await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    //     // await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    //
    //     // await faceapi.loadTinyFaceDetectorModel('/models')
    //     await faceapi.loadSsdMobilenetv1Model('/models')
    //     await faceapi.loadFaceLandmarkModel('/models')
    //     await faceapi.loadFaceLandmarkTinyModel('/models')
    //     await faceapi.loadFaceRecognitionModel('/models')
    //
    //     setModelLoading(false);
    // } catch (error) {
    //     console.error('Error loading face recognition models:', error);
    //     setModelLoading(false);
    // }
};

export const detectFace = async (image: HTMLImageElement) => {
    // const detection = await faceapi.detectSingleFace(image, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
    const detection2 = await faceapi.detectSingleFace(image, new faceapi.SsdMobilenetv1Options()).withFaceLandmarks().withFaceDescriptor();

    return detection2;
};

export const detectFace1 = (image: HTMLImageElement) => {
    return new Promise<faceapi.WithFaceDescriptor<faceapi.WithFaceLandmarks<faceapi.WithFaceDetection<{}>>>>(
        async (resolve, reject) => {
            try {
                const detection = await faceapi
                    .detectSingleFace(image, new faceapi.SsdMobilenetv1Options())
                    .withFaceLandmarks()
                    .withFaceDescriptor();

                if (detection) {
                    resolve(detection);
                } else {
                    reject(new Error("Face not detected"));
                }
            } catch (error) {
                reject(error);
            }
        }
    );
};


export const matchFaces = (faceDescriptor1: Float32Array, faceDescriptor2: Float32Array) => {
    const distance = faceapi.euclideanDistance(faceDescriptor1, faceDescriptor2);
    return distance < 0.3; // You may need to adjust this threshold
};

export const matchFaceWithTiny = async (referenceImage: HTMLImageElement, queryImage1: HTMLImageElement) => {
    // Reference Image
    const result = await faceapi.detectSingleFace(referenceImage, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()
    if (!result) {
        return
    }
    // create FaceMatcher with automatically assigned labels
    // from the detection results for the reference image
    const faceMatcher = new faceapi.FaceMatcher(result)


    // QueryImage
    const singleResult = await faceapi.detectSingleFace(queryImage1, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()

    if (singleResult) {
        const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor)
        console.log(bestMatch.toString())
        return bestMatch.toString()
    }
}

export const matchFaceWithSsd = async (referenceImage: HTMLImageElement, queryImage1: HTMLImageElement) => {
    try {
        // Reference Image
        const result = await faceapi.detectSingleFace(referenceImage, new faceapi.SsdMobilenetv1Options()).withFaceLandmarks().withFaceDescriptor()
        if (!result) return;
        const faceMatcher = new faceapi.FaceMatcher(result)


        // QueryImage
        const singleResult = await faceapi.detectSingleFace(queryImage1, new faceapi.SsdMobilenetv1Options()).withFaceLandmarks().withFaceDescriptor()
        if (singleResult) {
            const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor)
            console.log(bestMatch.toString())


            return bestMatch.toString();
        }
    } catch (err) {
        return err;
    }
}

