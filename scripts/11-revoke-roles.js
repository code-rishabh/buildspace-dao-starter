import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule(
    "0x1Cd45E567E856025480363Fd785e9Aea3Df6723D"
);

(async () => {
    try {
        // log the current roles
        console.log(
            "👀 Roles that exist right now:",
            await tokenModule.getAllRoleMembers()
        );

        // revoke all the superpowers your wallet had over the ERC-20 contract.
        await tokenModule.revokeAllRolesFromAddress(process.env.WALLET_ADDRESS);
        console.log(
            "🎉 Roles after revoking ourselves",
      await tokenModule.getAllRoleMembers()
        );

        console.log("✅ Successfully revoked our superpowers from the ERC-20 contract");
        
    } catch (error) {
        console.error("Failed to revoke ourselves from the DAO treasury", error);
    }
})();

