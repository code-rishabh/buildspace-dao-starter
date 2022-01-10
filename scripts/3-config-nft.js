import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
    "0x5B41C669C8b0B44CA30C4a41e1573B31504304AB"
);

(async () => {
    try {
        await bundleDrop.createBatch([
            {
                name: "Peaky Blinders Card",
                description: "This NFT will give you access to the ShelbyDAO!",
                image: readFileSync("scripts/assets/peakyBlinders.png"),

            },
        ]);
        console.log("Successfully created a new NFT in the drop!");
    }catch (error) {
        console.log("failed to create a new NFT", error);
    }
})()