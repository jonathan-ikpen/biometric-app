import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { webCamBase64, username } = body;

        // console.log(webCamBase64)

        // const userWithCredential = await prismadb.user.findFirst({
        //     where: {
        //         faceUpload: webCamImage
        //     },
        // });

        // Retrieve all users
        // const allUsers = await prismadb.user.findMany();
        // gallery: [allUsers.map(user => user.faceUpload)],

        const userFace = await prismadb.user.findFirst({
                where: {
                    username: username
                },
            }
        );


        const data = {
            gallery: [userFace?.faceUpload],
            probe: [webCamBase64],
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

        // Handle the response from the external API
        const result = await response.json();

        // Find the matched user based on the result
        // const matchedUser = allUsers.find(user => user.faceUpload === result.matchedImage);

        // Do something with the result and matched user's data
        // console.log('Matched User:', matchedUser);

        console.log('Comparison Result:', result);


        return NextResponse.json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.log("Server Authentication: ", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
