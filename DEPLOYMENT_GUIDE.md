# 🚀 Panduan Deployment Voo Coin ke Polygon

## Prasyarat

Pastikan Anda sudah memiliki:
- Node.js v16 atau lebih baru
- Git
- MetaMask atau wallet lainnya
- MATIC untuk gas fees (minimal 0.5 MATIC)

## Step 1: Setup Environment

### 1.1 Clone Repository
```bash
git clone https://github.com/madupremiumbyarsya/voo-coin.git
cd voo-coin
```

### 1.2 Install Dependencies
```bash
npm install
```

### 1.3 Setup Environment Variables
Buat file `.env` di root folder:

```bash
cp .env.example .env
```

Edit `.env` dengan informasi Anda:
```
POLYGON_RPC_URL=https://polygon-rpc.com
PRIVATE_KEY=your_private_key_here
POLYGONSCAN_API_KEY=your_polygonscan_key_here
```

**Cara mendapatkan Private Key dari MetaMask:**
1. Buka MetaMask
2. Klik menu (3 titik) → Account Details
3. Klik "Export Private Key"
4. Masukkan password
5. Copy private key (tanpa 0x) ke `.env`

**Cara mendapatkan PolygonScan API Key:**
1. Buka https://polygonscan.com/apis
2. Login atau daftar
3. Create new API key
4. Copy API key ke `.env`

## Step 2: Compile Smart Contract

```bash
npx hardhat compile
```

Jika berhasil, akan muncul folder `artifacts/` dan `cache/`.

## Step 3: Test Contract (Opsional tapi Disarankan)

```bash
npx hardhat test
```

Ini akan menjalankan semua test untuk memastikan contract berfungsi dengan baik.

## Step 4: Deploy ke Polygon

### Opsi A: Deploy Menggunakan Script

```bash
npx hardhat run scripts/deploy.js --network polygon
```

Tunggu hingga transaksi dikonfirmasi. Output akan menampilkan:
- Contract Address
- PolygonScan link
- Token information

### Opsi B: Deploy Menggunakan Remix IDE

1. Buka https://remix.ethereum.org
2. Buat file baru: `VooCoin.sol`
3. Copy semua kode dari `contracts/VooCoin.sol`
4. Di sebelah kiri, klik "Solidity Compiler"
5. Pilih versi `0.8.20`
6. Klik "Compile VooCoin.sol"
7. Di sebelah kiri, klik "Deploy & Run Transactions"
8. Environment: Pilih "Injected Provider - MetaMask"
9. Contract: Pilih "VooCoin"
10. Klik "Deploy"
11. Konfirmasi transaksi di MetaMask

## Step 5: Verifikasi Contract di PolygonScan

### Menggunakan Hardhat:

```bash
npx hardhat verify --network polygon CONTRACT_ADDRESS_HERE
```

Ganti `CONTRACT_ADDRESS_HERE` dengan address contract yang di-deploy.

### Atau Manual di PolygonScan:

1. Buka https://polygonscan.com/
2. Cari contract address di search box
3. Scroll ke bawah, klik "Contract" tab
4. Klik "Verify & Publish"
5. Pilih Solidity Single File
6. Pilih compiler version: `0.8.20`
7. Optimization: `Yes`, runs: `200`
8. Copy-paste seluruh kode dari `contracts/VooCoin.sol`
9. Klik "Verify and Publish"

## Step 6: Add Token ke MetaMask

1. Buka MetaMask
2. Pastikan network adalah **Polygon (Matic)**
3. Klik "Import tokens"
4. Masukkan:
   - Token Contract Address: (contract address Anda)
   - Token Symbol: `VC`
   - Decimals: `18`
5. Klik "Add Custom Token"
6. Klik "Import Tokens"

Sekarang Anda bisa melihat Voo Coin di portfolio MetaMask!

## Step 7: Transfer Token (Opsional)

Jika ingin test transfer:

```bash
npx hardhat run scripts/transfer.js --network polygon
```

(Anda perlu membuat file `scripts/transfer.js` terlebih dahulu)

## Step 8: Apply untuk Listing di Indodax

Setelah contract deployment dan verifikasi:

1. Siapkan dokumentasi:
   - Contract address
   - Token icon/logo
   - Whitepaper (jika ada)
   - Project description

2. Hubungi Indodax Support:
   - Email: support@indodax.com
   - Atau kunjungi https://indodax.com/

3. Submit form listing dengan semua informasi

4. Tunggu review dari tim Indodax (biasanya 1-2 minggu)

## 🔗 Useful Links

- **PolygonScan:** https://polygonscan.com/
- **Polygon Network Info:** https://polygon.technology/
- **MetaMask Setup untuk Polygon:** https://support.polygon.technology/support/solutions/articles/81000948052
- **Indodax:** https://indodax.com/
- **OpenZeppelin:** https://docs.openzeppelin.com/

## 💡 Tips & Tricks

### Check Balance di Command Line:
```bash
npx hardhat run -c "const vc = await ethers.getContractAt('VooCoin', 'CONTRACT_ADDRESS'); console.log(await vc.balanceOf('YOUR_ADDRESS'));" --network polygon
```

### Mint Token Tambahan:
```bash
npx hardhat run scripts/mint.js --network polygon
```

(Anda perlu membuat file `scripts/mint.js`)

### Get Gas Estimate:
```bash
npx hardhat run scripts/estimateGas.js --network polygon
```

## ⚠️ Safety Reminders

- ✅ JANGAN share private key ke siapapun
- ✅ JANGAN push `.env` file ke GitHub
- ✅ Gunakan testnet dulu sebelum mainnet (opsional)
- ✅ Backup private key Anda di tempat aman
- ✅ Untuk production, lakukan security audit

## 🆘 Troubleshooting

### "Insufficient funds" error
- Pastikan wallet Anda memiliki MATIC untuk gas fees
- Minimal 0.5 MATIC untuk deploy

### "Invalid private key"
- Pastikan private key tidak ada "0x" di depan
- Private key harus 64 karakter hex

### "Network error"
- Check RPC URL di `.env`
- Pastikan internet connection stabil
- Coba RPC URL lain: https://rpc.ankr.com/polygon

### Contract tidak muncul di PolygonScan
- Tunggu beberapa detik dan refresh
- Pastikan menggunakan network Polygon (chainId 137)
- Check transaction hash di PolygonScan

## 📞 Support

Jika ada kendala:
1. Check dokumentasi resmi: https://docs.polygon.technology/
2. Tanya di Polygon Discord: https://discord.gg/polygon
3. GitHub Issues di repo ini

---

**Good luck dengan deploy Voo Coin Anda! 🚀**