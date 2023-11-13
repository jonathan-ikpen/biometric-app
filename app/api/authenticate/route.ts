import { server } from "@passwordless-id/webauthn";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { authentication, challenge } = body;

    console.log(authentication, challenge);

    const userWithCredential = await prismadb.user.findFirst({
      where: {
        credentials: {
          some: {
            id: authentication.credentialId, // Replace yourCredentialId with the actual credential ID
          },
        },
      },
      include: {
        credentials: {
          where: {
            id: authentication.credentialId, // Replace yourCredentialId with the actual credential ID
          },
        },
      },
    });

    console.log(userWithCredential);

    console.log(userWithCredential?.credentials);

    // const credentialKey = {
    //   id: userWithCredential?.credentials.user_id,
    //   publicKey: userWithCredential?.credentials.publicKey,
    //   algorithm: userWithCredential?.credentials.algorithm,
    // } as const;

    // const expected = {
    //   challenge: challenge,
    //   origin: "http://localhost:3000",
    //   userVerified: true,
    //   counter: 0,
    // };

    // const authenticationParsed = await server.verifyAuthentication(
    //   authentication,
    //   credentialKey,
    //   expected
    // );

    // return NextResponse.json({
    //   authenticationParsed,
    // });
  } catch (error) {
    console.log("Server Authentication: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
