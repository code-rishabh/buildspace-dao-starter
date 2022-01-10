import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from 'fs';

const app = sdk.getAppModule("0x93868A3F652D0B994A3049b4A0328D8352eF9b13");

(async () => {
    try {
        const bundleDropModule = await app.deployBundleDropModule({
            name: "ShelbyDAO Membership",
            description: "By Order of the Peaky Blinders.",
            image: readFileSync("scripts/assets/arthur.png"),
            primarySaleRecipientAddress: ethers.constants.AddressZero,
        });

        console.log(
            "Succesfully deployed bundle drop module, address: ", bundleDropModule.address,
        );

        console.log(
            "bundleDrop metadata: ",
            await bundleDropModule.getMetadata(),
        );
    } catch (error) {
        console.log("failed to deploy bundle drop module", error);
    }
})()