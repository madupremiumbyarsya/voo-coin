const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VooCoin", function () {
  let vooCoin;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Get signers
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy contract
    const VooCoin = await ethers.getContractFactory("VooCoin");
    vooCoin = await VooCoin.deploy();
    await vooCoin.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await vooCoin.owner()).to.equal(owner.address);
    });

    it("Should have correct name and symbol", async function () {
      expect(await vooCoin.name()).to.equal("Voo Coin");
      expect(await vooCoin.symbol()).to.equal("VC");
    });

    it("Should mint initial supply to owner", async function () {
      const balance = await vooCoin.balanceOf(owner.address);
      const expectedSupply = ethers.parseUnits("1000000", 18);
      expect(balance).to.equal(expectedSupply);
    });

    it("Should have correct decimals", async function () {
      expect(await vooCoin.decimals()).to.equal(18);
    });

    it("Should have correct total supply", async function () {
      const totalSupply = await vooCoin.totalSupply();
      const expectedSupply = ethers.parseUnits("1000000", 18);
      expect(totalSupply).to.equal(expectedSupply);
    });
  });

  describe("Transfers", function () {
    it("Should transfer tokens between accounts", async function () {
      const transferAmount = ethers.parseUnits("100", 18);
      
      // Transfer from owner to addr1
      await vooCoin.transfer(addr1.address, transferAmount);
      
      expect(await vooCoin.balanceOf(addr1.address)).to.equal(transferAmount);
    });

    it("Should fail transfer if insufficient balance", async function () {
      const transferAmount = ethers.parseUnits("100", 18);
      
      await expect(
        vooCoin.connect(addr1).transfer(addr2.address, transferAmount)
      ).to.be.revertedWithCustomError(vooCoin, "ERC20InsufficientBalance");
    });

    it("Should emit Transfer event on transfer", async function () {
      const transferAmount = ethers.parseUnits("100", 18);
      
      await expect(vooCoin.transfer(addr1.address, transferAmount))
        .to.emit(vooCoin, "Transfer")
        .withArgs(owner.address, addr1.address, transferAmount);
    });
  });

  describe("Approvals", function () {
    it("Should approve tokens", async function () {
      const approveAmount = ethers.parseUnits("100", 18);
      
      await vooCoin.approve(addr1.address, approveAmount);
      expect(await vooCoin.allowance(owner.address, addr1.address))
        .to.equal(approveAmount);
    });

    it("Should transfer from with approval", async function () {
      const approveAmount = ethers.parseUnits("100", 18);
      
      await vooCoin.approve(addr1.address, approveAmount);
      await vooCoin.connect(addr1).transferFrom(
        owner.address,
        addr2.address,
        approveAmount
      );
      
      expect(await vooCoin.balanceOf(addr2.address)).to.equal(approveAmount);
    });
  });

  describe("Burning", function () {
    it("Should burn tokens", async function () {
      const burnAmount = ethers.parseUnits("100", 18);
      const initialBalance = await vooCoin.balanceOf(owner.address);
      
      await vooCoin.burn(burnAmount);
      
      const finalBalance = await vooCoin.balanceOf(owner.address);
      expect(finalBalance).to.equal(initialBalance - burnAmount);
    });

    it("Should reduce total supply on burn", async function () {
      const burnAmount = ethers.parseUnits("100", 18);
      const initialSupply = await vooCoin.totalSupply();
      
      await vooCoin.burn(burnAmount);
      
      const finalSupply = await vooCoin.totalSupply();
      expect(finalSupply).to.equal(initialSupply - burnAmount);
    });
  });

  describe("Minting", function () {
    it("Should mint tokens by owner", async function () {
      const mintAmount = ethers.parseUnits("1000", 18);
      
      await vooCoin.mint(addr1.address, mintAmount);
      
      expect(await vooCoin.balanceOf(addr1.address)).to.equal(mintAmount);
    });

    it("Should fail mint if not owner", async function () {
      const mintAmount = ethers.parseUnits("1000", 18);
      
      await expect(
        vooCoin.connect(addr1).mint(addr2.address, mintAmount)
      ).to.be.revertedWithCustomError(vooCoin, "OwnableUnauthorizedAccount");
    });

    it("Should increase total supply on mint", async function () {
      const mintAmount = ethers.parseUnits("1000", 18);
      const initialSupply = await vooCoin.totalSupply();
      
      await vooCoin.mint(addr1.address, mintAmount);
      
      const finalSupply = await vooCoin.totalSupply();
      expect(finalSupply).to.equal(initialSupply + mintAmount);
    });
  });

  describe("Pausing", function () {
    it("Should pause and unpause", async function () {
      await vooCoin.pause();
      expect(await vooCoin.paused()).to.be.true;
      
      await vooCoin.unpause();
      expect(await vooCoin.paused()).to.be.false;
    });

    it("Should prevent transfers when paused", async function () {
      await vooCoin.pause();
      
      await expect(
        vooCoin.transfer(addr1.address, ethers.parseUnits("100", 18))
      ).to.be.revertedWithCustomError(vooCoin, "EnforcedPause");
    });
  });
});