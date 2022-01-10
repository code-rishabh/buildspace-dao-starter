import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";

// our voting contract
const voteModule = sdk.getVoteModule(
    "0xD2cfdC3dcD9cF3A16d7ECfAfe41b2014F0F05c10"
);

// our ERC-20 contract
const tokenModule = sdk.getTokenModule(
    "0x1Cd45E567E856025480363Fd785e9Aea3Df6723D"
);

(async () => {
    try {
        const amount = 420_000;
        // create a proposal to mint 420,000 new token to the treasury
        await voteModule.propose(
            "Should the DAO mint an additional " + amount + " token into the treasury?",
            [
                {
                    //  our nativeToken is ETH. nativeTokenValue is thye amount of ETH we want to send in this proposal. In this voteModule, which is acting as our Treasury. So set it to 0.
                    nativeTokenValue: 0,
                    transactionData: tokenModule.contract.interface.encodeFunctionData(
                        "mint",
                        [
                            voteModule.address,
                            ethers.utils.parseUnits(amount.toString(), 18),
                        ]
                    ),
                    // our token module that actually executes the mint.
                    toAddress: tokenModule.address,
                },
            ]
        );

        console.log("✅ Successfully created proposal to mint tokens");
    } catch(error){
        console.error("failed to create first proposal", error);
        process.exit(1);
    }

    try{
        const amount = 6_900;
        // create proposal to transfer ourselves 6,900 tokens for being awesome
        await voteModule.propose(
            "Should the DAO transfer " + amount + " tokens from the treasury to " + process.env.WALLET_ADDRESS + " for being awesome?",
            [
                {
                    // Again we are sending ourselves 0 ETH such sending our own token
                    nativeTokenValue: 0,
                    transactionData: tokenModule.contract.interface.encodeFunctionData(
                        "transfer",
                        [
                            process.env.WALLET_ADDRESS,
                            ethers.utils.parseUnits(amount.toString(), 18),
                        ]
                    ),

                    toAddress: tokenModule.address,
                },
            ]
        );

        console.log(
            "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
          );
    }catch(error){
        console.error("failed to create second proposal", error);
    }
})();

