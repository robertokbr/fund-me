import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DECIMALS, INITIAL_PRICE } from "../helper-hardhat-config";

const deployMocks = async (hre: HardhatRuntimeEnvironment & {
  deployments: any, getNamedAccounts: any,
}) => {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  // If we are on a local development network, we need to deploy mocks!
  if (chainId == 31337) {
    log("Local network detected! Deploying mocks...");
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_PRICE],
    });

    log("Mocks Deployed!");
  }
}
export default deployMocks;
deployMocks.tags = ["all", "mocks"];
