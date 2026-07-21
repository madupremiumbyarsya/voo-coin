// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

/**
 * @title VooCoin
 * @dev Voo Coin (VC) - ERC-20 Token untuk Polygon Network
 * 
 * Spesifikasi:
 * - Nama: Voo Coin
 * - Symbol: VC
 * - Total Supply: 1,000,000 VC
 * - Decimals: 18
 * - Network: Polygon (Matic)
 */
contract VooCoin is 
    ERC20, 
    ERC20Burnable, 
    ERC20Pausable, 
    Ownable, 
    ERC20Permit
{
    // Total supply: 1 juta token dengan 18 decimals
    uint256 public constant INITIAL_SUPPLY = 1_000_000 * 10 ** 18;

    /**
     * @dev Constructor - mint initial supply ke owner
     */
    constructor() 
        ERC20("Voo Coin", "VC") 
        ERC20Permit("Voo Coin")
    {
        // Mint 1,000,000 VC ke owner
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    /**
     * @dev Pause all token transfers
     * Only owner can call this function
     */
    function pause() public onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause all token transfers
     * Only owner can call this function
     */
    function unpause() public onlyOwner {
        _unpause();
    }

    /**
     * @dev Mint new tokens
     * @param to Address to receive the minted tokens
     * @param amount Amount of tokens to mint
     * Only owner can call this function
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    /**
     * @dev Burn tokens from a specific address
     * @param amount Amount of tokens to burn
     * Only owner can call this function
     */
    function burnFrom(address account, uint256 amount) public override onlyOwner {
        super.burnFrom(account, amount);
    }

    /**
     * @dev Override _update function untuk integrate Pausable
     */
    function _update(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Pausable) {
        super._update(from, to, amount);
    }

    /**
     * @dev Override nonces function dari ERC20Permit
     */
    function nonces(address owner)
        public
        view
        override(ERC20Permit)
        returns (uint256)
    {
        return super.nonces(owner);
    }

    /**
     * @dev Override permit function
     */
    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public override(ERC20Permit) {
        super.permit(owner, spender, value, deadline, v, r, s);
    }
}