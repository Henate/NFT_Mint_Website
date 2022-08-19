require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.9",
    networks: {
        rinkeby: {
            url: process.env.REACT_APP_RINKEBY_RPC,
            accounts: [process.env.PRIVATE_KEY],
            chainId: 4,
        },
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
}
