import sdk from "./1-initialize-sdk.js"

const bundleDrop = sdk.getBundleDropModule(
    "0x5B41C669C8b0B44CA30C4a41e1573B31504304AB",
);

( async() => {
    try {
        const claimConditionFactory = bundleDrop.getClaimConditionFactory();
        claimConditionFactory.newClaimPhase({
            startTime: new Date(),
            maxQuantity: 50_000,
            maxQuantityPerTransaction: 1,
        });

        await bundleDrop.setClaimCondition(0, claimConditionFactory);
        console.log("Successfully set claim condition on bundle drop:", bundleDrop.address);
    } catch (error){
        console.log("Failed to set claim condition", error);
    }
})()