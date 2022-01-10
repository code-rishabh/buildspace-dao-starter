import sdk from "./1-initialize-sdk.js";

// In order to deploy the new contract we need our old friend the app module again.
const app = sdk.getAppModule("0x93868A3F652D0B994A3049b4A0328D8352eF9b13");

(async()=>{
    try{
        // deploy a standard ERC-20 contract
        const tokenModule = await app.deployTokenModule({
            // your token's name
            name: "ShelbyDAO Governance Token",
            // your token symbol
            symbol:"PEAK"
        });
        console.log(
            "Succesfully deployed token module, address: ", tokenModule.address,
        );
    } catch (error) {
        console.error("failed to deploy token module", error);
    }
})();

