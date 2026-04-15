// backend/receipt.js

import axios from "axios";

const RPC_URL = "https://voyage-rpc.moi.technology/babylon/";
const TX_HASH = "PASTE_YOUR_TX_HASH_HERE";

async function main() {
  try {
    console.log("📡 Fetching receipt...");

    const res = await axios.post(RPC_URL, {
      jsonrpc: "2.0",
      method: "moi.InteractionReceipt",
      params: [{ hash: TX_HASH }],
      id: 1
    });

    console.log("📦 Receipt:");
    console.log(JSON.stringify(res.data, null, 2));

  } catch (error) {
    console.error("❌ Receipt Error:", error.message);
  }
}

main();