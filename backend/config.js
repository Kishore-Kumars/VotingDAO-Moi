// backend/config.js

import { JsonRpcProvider, Wallet } from "js-moi-sdk";
import dotenv from "dotenv";

dotenv.config();

const RPC_URL = "https://voyage-rpc.moi.technology/babylon/";

export const provider = new JsonRpcProvider(RPC_URL);

export async function getSigner() {
  try {
    const pk = process.env.PRIVATE_KEY;

    if (!pk) {
      throw new Error("PRIVATE_KEY not found in .env");
    }

    console.log("PRIVATE KEY:", pk);

    // ✅ CORRECT WAY (for your SDK)
    const wallet = new Wallet(provider);
    await wallet.connect(pk);

    console.log("✅ Wallet connected:", wallet.address);

    return wallet;

  } catch (err) {
    console.error("❌ Wallet connection failed:", err.message);
    throw err;
  }
}