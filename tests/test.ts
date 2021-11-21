import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Test } from '../target/types/test';
import assert from 'assert'
import {Keypair} from '@solana/web3.js';
const { SystemProgram,  } = anchor.web3;

describe('test', () => {

  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env()
  anchor.setProvider(provider);

  const program = anchor.workspace.Test as Program<Test>;

  it('Is initialized!', async () => {
    const test_acc = anchor.web3.Keypair.generate();
    const tx = await program.rpc.initialize({
      accounts: {
        testAccount: test_acc.publicKey,
        authority: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [test_acc],
    });
    console.log("Your transaction signature", tx);

    const account = await program.account.testAccount.fetch(test_acc.publicKey);
    assert.strictEqual(account.authority.toString(),provider.wallet.publicKey.toString())
  });
});