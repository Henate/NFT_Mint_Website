const { ethers, network } = require("hardhat")

async function main() {
    console.log("Deploying contract..")
    const RoboPunksNFTFactory = await ethers.getContractFactory("RoboPunksNFT")
    const roboPunksNFT = await RoboPunksNFTFactory.deploy()
    await roboPunksNFT.deployed()
    console.log(`Deployed Contract Address:${roboPunksNFT.address}`)
    if (network.config.chainId == 4 && process.env.ETHERSCAN_API_KEY) {
        console.log("waiting for block confirmation...")
        await roboPunksNFT.deployTransaction.wait(6)
        await verify(roboPunksNFT.address, [])
    }
}

async function verify(contractAddress, agrs) {
    console.log("verifying contract..")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: agrs,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verifyed")) {
            console.log("Already verifyed！")
        } else {
            console.log(e)
        }
    }
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
