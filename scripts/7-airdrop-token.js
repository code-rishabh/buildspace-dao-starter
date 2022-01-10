import { BundleDropModule } from "@3rdweb/sdk";
import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// this is the address to our ERC-1155 membership NFT contract.
const bundleDropModule = sdk.getBundleDropModule(
    "0x5B41C669C8b0B44CA30C4a41e1573B31504304AB",
);

// this is the address to our ERC-20 token contract.
const tokenModule = sdk.getTokenModule(
    "0x1Cd45E567E856025480363Fd785e9Aea3Df6723D"
);

(async () => {
    try {
        // Grab all the addresses of people who own our membership NFT, which has a tokenId of 0.
        const walletAddresses = await bundleDropModule.getAllClaimerAddresses("0");

        if (walletAddresses.lenghth === 0) {
            console.log(
                "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!",
            );
            process.exit(0);
        }

        // Loop throgh the array of addresses.
        const airdropTarget = walletAddresses.map((address)=>{
            // pick a random between 1000 and 10,000.
            const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
            console.log("✅ Going to airdrop", randomAmount, "tokens to", address);

            //  set up the target
            const airdropTarget = {
                address,
                // remember we need 18 decimal places!
                amount: ethers.utils.parseUnits(randomAmount.toString(), 18),
            };

            return airdropTarget;

        });

        // call transferBatch on all our airdrop targets.
        console.log("OK, 🌈 Starting Airdrop....");
        await tokenModule.transferBatch(airdropTarget);
        console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");

    }catch(error){
        console.error("Failed to airdrop tokens", error);
    }
})();


