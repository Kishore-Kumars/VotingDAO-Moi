// backend/getScore.js

import { getSigner } from "./config.js";
import { LOGIC_ID } from "./constants.js";
import { getLogicDriver } from "js-moi-sdk";

async function main() {
  try {
    const wallet = await getSigner();
    const dao = await getLogicDriver(LOGIC_ID, wallet);

    console.log("📊 Getting Vote Weight...");
    console.log("👤 Wallet:", wallet.address);

    const weight = await dao.routines.GetVoteWeight();

    console.log("📦 Vote Weight Result:", weight);

  } catch (error) {
    console.error("❌ GetScore Error:", error.message);
  }
}

main();
