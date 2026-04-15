// backend/deploy.js

import { getSigner } from "./config.js";
import fs from "fs";

// ✅ FIX: Load JSON manually (works in all Node versions)
const bytecode = JSON.parse(
  fs.readFileSync(new URL("./bytecode.json", import.meta.url))
);

async function main() {
  try {
    const wallet = await getSigner();

    console.log("🚀 Deploying VotingDAO...");
    console.log("👤 Wallet:", wallet.address);

    // ── Create Interaction ─────────────────────────────
    const interaction = {
      fuel_price: "0x1",
      fuel_limit: "0x10000",

      sender: {
        id: wallet.address
      },

      ix_operations: [
        {
          type: 11, // LogicDeploy
          payload: {
            manifest: bytecode,
            callsite: "Init",
            calldata: "0x" // no parameters
          }
        }
      ]
    };

    console.log("✍️ Signing interaction...");

    const signed = await wallet.signInteraction(interaction);

    console.log("📤 Sending interaction...");

    const txHash = await wallet.sendInteraction(signed);

    console.log("📨 TX Hash:", txHash);

    console.log("⏳ Waiting for receipt...");

    const receipt = await wallet.provider.getInteractionReceipt(txHash);

    console.log("✅ DAO DEPLOYED SUCCESSFULLY!");
    console.log("📦 Receipt:");
    console.log(JSON.stringify(receipt, null, 2));

    console.log("\n👉 IMPORTANT:");
    console.log("Copy the logic_id from receipt and paste into constants.js");

  } catch (error) {
    console.error("❌ DEPLOY FAILED:", error.message);
  }
}

main();