// backend/contribute.js

import { getSigner } from "./config.js";
import { LOGIC_ID } from "./constants.js";

async function main() {
  try {
    const wallet = await getSigner();

    console.log("🤝 Sending Contribute interaction...");

    const interaction = {
      fuel_price: "0x1",
      fuel_limit: "0x10000",

      sender: {
        id: wallet.address,
        // sequence_id will be handled automatically by SDK (if supported)
      },

      ix_operations: [
        {
          type: 12, // LogicInvoke
          payload: {
            logic_id: LOGIC_ID,
            callsite: "Contribute",
            calldata: "0x" // no parameters
          }
        }
      ]
    };

    // 🔐 Sign interaction
    const signed = await wallet.signInteraction(interaction);

    // 🚀 Send interaction
    const response = await wallet.sendInteraction(signed);

    console.log("📤 TX Hash:", response);

    console.log("⏳ Waiting for receipt...");

    // 📦 Fetch receipt
    const receipt = await wallet.provider.getInteractionReceipt(response);

    console.log("✅ Contribution Successful!");
    console.log("📦 Receipt:");
    console.log(JSON.stringify(receipt, null, 2));

  } catch (error) {
    console.error("❌ Contribute Error:", error.message);
  }
}

main();