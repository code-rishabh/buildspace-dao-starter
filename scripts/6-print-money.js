import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// This is the address of our ERC-20 contract printed out in the step before.
const tokenModule = sdk.getTokenModule(
    "0x1Cd45E567E856025480363Fd785e9Aea3Df6723D"
);

(async()=>{
    try {
    // max supply you want to set
    const amount = 9_000_000;
    // we use the util function from "ethers" to convert the amount to have 18 decimals ( which is standard for ERC-20 token)
    const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);

    // interact with your deployed ERC-20 contract and mint the tokens!
    await tokenModule.mint(amountWith18Decimals);
    const totalSupply = await tokenModule.totalSupply();

    // print out how many tokens are out there now!
    console.log(
        "There now is",
        ethers.utils.formatUnits(totalSupply, 18),
        "$PEAK in circulation"
    );

    } catch (error) {
        console.error("failed to print money", error);
    }
})();
