// backend/deploy.js

import { getSigner } from "./config.js";
import fs from "fs";
import { LogicFactory } from "js-moi-sdk";

// ✅ Load JSON manually
const bytecode = JSON.parse(
  fs.readFileSync(new URL("./bytecode.json", import.meta.url))
);

async function main() {
  try {
    const wallet = await getSigner();

    console.log("🚀 Deploying VotingDAO...");
    console.log("👤 Wallet:", wallet.address);

    const factory = new LogicFactory(bytecode, wallet);

    console.log("📤 Sending deployment interaction...");
    const ix = await factory.deploy("Init", ["MOI Participant DAO", 3]).send({
        fuel_price: 1,
        fuel_limit: 1000000
    });

    console.log("📨 TX Hash:", ix.hash);
    console.log("⏳ Waiting for receipt...");

    const receipt = await ix.wait();

    console.log("✅ DAO DEPLOYED SUCCESSFULLY!");
    console.log(JSON.stringify(receipt, null, 2));
    console.log("\n📦 LOGIC ID:", receipt.logic_id);

  } catch (error) {
    console.error("❌ DEPLOY FAILED:", error.message);
  }
}

main();
