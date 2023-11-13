"use client";
import { client } from "@passwordless-id/webauthn";
import generateRandomNonce from "./challengeGen";

const fingerRegClient = async (username: string) => {
  const challenge = generateRandomNonce();

  const registration = await client.register(username, challenge, {
    authenticatorType: "both",
    userVerification: "required",
    timeout: 60000,
    attestation: false,
    userHandle: "recommended to set it to a random 64 bytes value",
    debug: false,
  });

  return { registration, challenge };
};

const fingerAuthClient = async () => {
  const challenge = generateRandomNonce();

  const authentication = await client.authenticate([], challenge, {
    authenticatorType: "both",
    userVerification: "required",
    timeout: 60000,
  });

  return { authentication, challenge };
};

export { fingerRegClient, fingerAuthClient };
