// backend/vote.js

import { getSigner } from "./config.js";
import { LOGIC_ID } from "./constants.js";

async function main() {
  try {
    const wallet = await getSigner();

    console.log("🗳️ Voting...");
    console.log("👤 Wallet:", wallet.address);

    const interaction = {
      fuel_price: "0x1",
      fuel_limit: "0x10000",

      sender: {
        id: wallet.address
      },

      ix_operations: [
        {
          type: 12, // LogicInvoke
          payload: {
            logic_id: LOGIC_ID,
            callsite: "Vote",
            calldata: "0x"
          }
        }
      ]
    };

    const signed = await wallet.signInteraction(interaction);
    const txHash = await wallet.sendInteraction(signed);

    console.log("📨 TX Hash:", txHash);

    const receipt = await wallet.provider.getInteractionReceipt(txHash);

    console.log("✅ Vote Successful!");
    console.log(JSON.stringify(receipt, null, 2));

  } catch (error) {
    console.error("❌ Vote Error:", error.message);
  }
}

main();