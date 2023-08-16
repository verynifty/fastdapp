// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    console.log("Deploying")
    const token = await hre.ethers.deployContract("FastDappTestToken");

    await token.waitForDeployment();
    console.log("Deployed token at:", token.target)

    const staking = await hre.ethers.deployContract("FastDappTestTokenStaking", [token.target]);

    await staking.waitForDeployment();
    console.log("Deployed staking at:", token.target)

    //add minter role to staking contract
    await token.grantRole(await token.MINTER_ROLE(), staking.target);
    console.log("Granted staking minter role")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
