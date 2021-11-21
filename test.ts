import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Test } from './target/types/test';
import {Keypair} from '@solana/web3.js';
import fs from 'fs';
const { SystemProgram,  } = anchor.web3;
const programId = "GeSn3iiJSfg9R4JfHkL43YPFK2eBg2VSwaBLdTxx6aUT"

function readKeyfile(keypairFile) {
  let kf = fs.readFileSync(keypairFile)
  let parsed = JSON.parse(kf.toString())
  const keypair = Keypair.fromSecretKey(new Uint8Array(parsed))
  return keypair
}
 
const keypair=readKeyfile('/home/xlassix/.config/solana/id.json')
const myAccount=readKeyfile('/home/xlassix/Desktop/anchor/test/deploy/programauthority-keypair.json')

    // Use a local provider.
  const connection = new anchor.web3.Connection("https://api.devnet.solana.com", 'confirmed')
  const wallet = new anchor.Wallet(keypair)
  const provider = new anchor.Provider(connection,wallet,{});
  anchor.setProvider(provider);

  const program = anchor.workspace.Test as Program<Test>;

const sendlog = async (post:String) => {
    console.log("sending message.....")
    const tx = await program.rpc.sendLog(
        Buffer.from(post),{
        accounts: {
            testAccount: myAccount.publicKey,
            authority: provider.wallet.publicKey,
          },
    });
    console.log("Your transaction signature", tx);
    console.log("success")
  };


const  getLastestLog= async (test_acc) => {
    console.log("getting last message.....")
    const account = await program.account.testAccount.fetch(new anchor.web3.PublicKey(test_acc));
    console.log("message", account.lastestPayload);
  };

//getLastestLog(myAccount.publicKey)
sendlog("interview with PUSH")