// backend/getScore.js

import { getSigner } from "./config.js";
import { LOGIC_ID } from "./constants.js";

async function main() {
  try {
    const wallet = await getSigner();

    console.log("📊 Getting Vote Weight...");
    console.log("👤 Wallet:", wallet.address);

    const interaction = {
      fuel_price: "0x1",
      fuel_limit: "0x10000",

      sender: {
        id: wallet.address
      },

      ix_operations: [
        {
          type: 12,
          payload: {
            logic_id: LOGIC_ID,
            callsite: "GetVoteWeight",
            calldata: "0x"
          }
        }
      ]
    };

    const signed = await wallet.signInteraction(interaction);
    const txHash = await wallet.sendInteraction(signed);

    console.log("📨 TX Hash:", txHash);

    const receipt = await wallet.provider.getInteractionReceipt(txHash);

    console.log("📦 Vote Weight Result:");
    console.log(JSON.stringify(receipt, null, 2));

  } catch (error) {
    console.error("❌ GetScore Error:", error.message);
  }
}

main();