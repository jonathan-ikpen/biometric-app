import { server } from "@passwordless-id/webauthn";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { authentication, challenge } = body;

    const userWithCredential = await prismadb.user.findFirst({
      where: {
        credentials: {
          some: {
            user_id: authentication.credentialId, // Replace yourCredentialId with the actual credential ID
          },
        },
      },
      include: {
        credentials: {
          where: {
            user_id: authentication.credentialId, // Replace yourCredentialId with the actual credential ID
          },
        },
      },
    });

    const credentialKey = {
      id: userWithCredential?.credentials[0].user_id || "",
      publicKey: userWithCredential?.credentials[0].publicKey || "",
      algorithm:
        (userWithCredential?.credentials[0].algorithm as "RS256" | "ES256") ||
        "RS256",
    } as const;

    const expected = {
      challenge: challenge,
      origin:
        process.env.NODE_ENV !== "production"
          ? "http://localhost:3000"
          : "https://biometric-app.vercel.app",
      userVerified: true,
      counter: -1,
    };

    const authenticationParsed = await server.verifyAuthentication(
      authentication,
      credentialKey,
      expected
    );

    return NextResponse.json({
      success: true,
      data: authenticationParsed,
    });
  } catch (error) {
    console.log("Server Authentication: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
