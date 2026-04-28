// backend/vote.js

import { getSigner } from "./config.js";
import { LOGIC_ID } from "./constants.js";
import { getLogicDriver } from "js-moi-sdk";

async function main() {
  try {
    const wallet = await getSigner();
    const dao = await getLogicDriver(LOGIC_ID, wallet);

    console.log("🗳️ Voting...");

    const ix = await dao.routines.Vote(0, true).send({
        fuel_price: 1,
        fuel_limit: 10000
    });

    console.log("📨 TX Hash:", ix.hash);

    const receipt = await ix.wait();

    console.log("✅ Vote Successful!");
    console.log(JSON.stringify(receipt, null, 2));

  } catch (error) {
    console.error("❌ Vote Error:", error.message);
  }
}

main();
