# Anchor Vault

A Solana program built with Anchor that implements a personal vault system for securely storing and managing SOL tokens.

## Features

- **Initialize Vault**: Create a personal vault account with rent-exempt minimum balance
- **Deposit**: Add SOL to your vault
- **Withdraw**: Remove SOL from your vault (with rent-exempt protection)
- **Close**: Close your vault and reclaim all remaining SOL

## Program Structure

The program consists of four main instructions:

### Instructions

1. **Initialize**: Creates a new vault state account and vault account for the user
2. **Deposit**: Transfers SOL from user to vault
3. **Withdraw**: Transfers SOL from vault to user (ensures rent-exempt balance remains)
4. **Close**: Closes the vault and transfers all remaining SOL back to the user

### Account Structure

- **VaultState**: Stores the bump seeds for the vault and state accounts
- **Vault**: The actual account that holds the SOL tokens

## Development

### Prerequisites

- Node.js and pnpm
- Rust and Cargo
- Solana CLI
- Anchor CLI

### Installation

```bash
pnpm install
```

### Build

```bash
anchor build
```

### Test

```bash
anchor test
```

Or using the configured script:

```bash
pnpm run test
```

### Deploy

```bash
anchor deploy
```

## Program ID

- **Localnet**: `36HFitum2dT3Ai6yLrMErTTmsWU67bAgLZ6XWP6z7JGP`

## Usage Example

```typescript
import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { AnchorVault } from '../target/types/anchor_vault';

const program = anchor.workspace.anchorVault as Program<AnchorVault>;

// Initialize vault
await program.methods.initialize().rpc();

// Deposit SOL
const amount = new anchor.BN(anchor.web3.LAMPORTS_PER_SOL);
await program.methods.deposit(amount).rpc();

// Withdraw SOL
await program.methods.withdraw(amount).rpc();

// Close vault
await program.methods.close().rpc();
```

## Security Features

- Uses Program Derived Addresses (PDAs) for deterministic account generation
- Enforces rent-exempt minimum balance on withdrawals
- Proper account validation and authorization checks
- CPI (Cross-Program Invocation) for secure transfers

## License

ISC
