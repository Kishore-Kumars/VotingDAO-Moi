// backend/propose.js

import { getSigner } from "./config.js";
import { LOGIC_ID } from "./constants.js";
import { getLogicDriver } from "js-moi-sdk";

async function main() {
  try {
    const wallet = await getSigner();
    const dao = await getLogicDriver(LOGIC_ID, wallet);

    console.log("📢 Creating Proposal...");

    const ix = await dao.routines.Propose("Increase Developer Rewards", "Proposal to increase the participation score reward for creating proposals.").send({
        fuel_price: 1,
        fuel_limit: 10000
    });

    console.log("📤 TX Hash:", ix.hash);
    console.log("⏳ Waiting for receipt...");

    const receipt = await ix.wait();

    console.log("✅ Proposal Created successfully!");
    console.log(JSON.stringify(receipt, null, 2));

  } catch (error) {
    console.error("❌ Propose Error:", error.message);
  }
}

main();
