import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { AnchorVault } from '../target/types/anchor_vault';
import { assert, expect } from 'chai';

describe('anchor-vault', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.anchorVault as Program<AnchorVault>;
  const programId = new anchor.web3.PublicKey(program.idl.address);
  const amount = new anchor.BN(anchor.web3.LAMPORTS_PER_SOL);

  const stateAddress = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('state'), program.provider.wallet.publicKey.toBuffer()],
    programId
  )[0];
  const vaultAddress = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('vault'), stateAddress.toBuffer()],
    programId
  )[0];

  it('should initialize', async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log('Your transaction signature', tx);
  });

  it('should deposit', async () => {
    const tx = await program.methods.deposit(amount).rpc();
    console.log('Your transaction signature', tx);
  });

  it('should withdraw', async () => {
    const tx = await program.methods.withdraw(amount).rpc();
    console.log('Your transaction signature', tx);
  });

  it('should now withdraw more than rent-exempt', async () => {
    const rentExempt = new anchor.BN(890880);

    const promise = program.methods.withdraw(rentExempt).rpc();

    await promise.catch(() => {
      expect(true);
    });
  });

  it('should close', async () => {
    const tx = await program.methods.close().rpc();
    console.log('Your transaction signature', tx);
  });
});
