import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Test } from '../target/types/test.ts';

describe('test', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Test as Program<Test>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
