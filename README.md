# Voo Coin (VC)

![Voo Coin Logo](./assets/voo-coin-logo.png)

Token ERC-20 untuk blockchain Polygon (Matic Network)

## 📊 Spesifikasi Token

- **Nama:** Voo Coin
- **Symbol:** VC
- **Total Supply:** 1,000,000 VC
- **Decimals:** 18
- **Blockchain:** Polygon (Matic)
- **Standard:** ERC-20

## 🚀 Fitur

- ✅ Token transfer standar ERC-20
- ✅ Approval dan allowance mechanism
- ✅ Mint/Burn capabilities
- ✅ Burnable token support
- ✅ Pausable functionality
- ✅ Secure transaction protocol

## 📋 Prerequisites

Sebelum deploy, pastikan Anda sudah install:

```bash
npm install -g hardhat
npm install --save-dev @nomicfoundation/hardhat-toolbox
npm install --save-dev dotenv
npm install @openzeppelin/contracts
```

## 🔧 Setup Awal

1. **Clone repository:**
```bash
git clone https://github.com/madupremiumbyarsya/voo-coin.git
cd voo-coin
```

2. **Install dependencies:**
```bash
npm install
```

3. **Buat file `.env`:**
```
POLYGON_RPC_URL=https://polygon-rpc.com
PRIVATE_KEY=your_wallet_private_key_here
POLYGONSCAN_API_KEY=your_polygonscan_api_key
```

⚠️ **Jangan pernah commit `.env` file!**

## 🚀 Deployment ke Polygon

### Opsi 1: Menggunakan Hardhat

```bash
npx hardhat run scripts/deploy.js --network polygon
```

### Opsi 2: Menggunakan Remix IDE

1. Buka https://remix.ethereum.org
2. Copy contract dari `contracts/VooCoin.sol`
3. Compile dan deploy ke Polygon network
4. Pilih MetaMask wallet dengan Polygon network

## 🧪 Testing

```bash
npx hardhat test
```

## ✅ Verifikasi Contract

Setelah deploy, verifikasi contract di PolygonScan:

```bash
npx hardhat verify --network polygon CONTRACT_ADDRESS "constructor_args"
```

## 📝 Smart Contract Info

Contract ini mengimplementasikan:
- ERC-20 Token Standard
- Ownable (owner controls minting)
- Burnable (token bisa di-burn)
- Pausable (pause transfers)
- Permit (gasless approvals)

## 🔐 Security Notes

- ✅ Contract didasarkan pada OpenZeppelin (battle-tested)
- ✅ Sudah dilengkapi dengan access control
- ⚠️ Untuk production, lakukan audit keamanan professional

## 📱 Integrasi dengan Indodax

Setelah contract deploy dan token live di Polygon:

1. Persiapkan dokumentasi project
2. Submit form listing ke Indodax support
3. Sediakan contract address dan informasi token
4. Tunggu review dari tim Indodax

## 🔗 Useful Links

- [Polygon Network](https://polygon.technology/)
- [PolygonScan Explorer](https://polygonscan.com/)
- [OpenZeppelin Docs](https://docs.openzeppelin.com/)
- [Hardhat Documentation](https://hardhat.org/)
- [MetaMask](https://metamask.io/)

## 📞 Support

Untuk bantuan lebih lanjut, kunjungi:
- Polygon Discord: https://discord.gg/polygon
- OpenZeppelin Forum: https://forum.openzeppelin.com/

---

**Created:** 2026-07-21
**License:** MIT