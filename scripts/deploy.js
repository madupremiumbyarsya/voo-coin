const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying Voo Coin (VC) to Polygon...\n");

  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📍 Deploying contract with account:", deployer.address);
  console.log("💰 Account balance:", (await deployer.getBalance()).toString());

  // Deploy contract
  const VooCoin = await ethers.getContractFactory("VooCoin");
  const vooCoin = await VooCoin.deploy();
  await vooCoin.waitForDeployment();

  const contractAddress = await vooCoin.getAddress();
  console.log("\n✅ Voo Coin deployed successfully!");
  console.log("📝 Contract Address:", contractAddress);
  console.log("🔗 PolygonScan: https://polygonscan.com/token/" + contractAddress);

  // Get token info
  const name = await vooCoin.name();
  const symbol = await vooCoin.symbol();
  const totalSupply = await vooCoin.totalSupply();
  const decimals = await vooCoin.decimals();

  console.log("\n📊 Token Information:");
  console.log("   Name:", name);
  console.log("   Symbol:", symbol);
  console.log("   Total Supply:", ethers.formatUnits(totalSupply, decimals), symbol);
  console.log("   Decimals:", decimals);
  console.log("   Owner:", await vooCoin.owner());

  console.log("\n💡 Next Steps:");
  console.log("1. Verify contract on PolygonScan:");
  console.log("   npx hardhat verify --network polygon", contractAddress);
  console.log("2. Add token to MetaMask:");
  console.log("   - Contract Address:", contractAddress);
  console.log("   - Symbol: VC");
  console.log("   - Decimals: 18");
  console.log("3. Apply for listing on Indodax");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });