import crypto from "crypto";

export default function generateRandomNonce() {
  const buffer = crypto.randomBytes(32); // Adjust the byte length as needed
  const base64url = buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
  return base64url;
}

// console.log(generateRandomNonce());
