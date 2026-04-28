// backend/register.js

import { getSigner } from "./config.js";
import { LOGIC_ID } from "./constants.js";
import { getLogicDriver } from "js-moi-sdk";

async function main() {
  try {
    const wallet = await getSigner();
    const dao = await getLogicDriver(LOGIC_ID, wallet);

    console.log("📝 Registering Member...");

    const ix = await dao.routines.Register(100).send({
        fuel_price: 1,
        fuel_limit: 10000
    });

    console.log("📨 TX Hash:", ix.hash);

    const receipt = await ix.wait();

    console.log("✅ Registration Successful!");
    console.log(JSON.stringify(receipt, null, 2));

  } catch (error) {
    console.error("❌ Register Error:", error.message);
  }
}

main();
