use anchor_lang::{prelude::*};
use std::str::from_utf8;
use std::time::{ SystemTime};


declare_id!("GeSn3iiJSfg9R4JfHkL43YPFK2eBg2VSwaBLdTxx6aUT");

#[program]
pub mod test {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        let test_acc =&mut ctx.accounts.test_account;
        test_acc.authority = *ctx.accounts.authority.key;
        Ok(())
    }

    pub fn send_log(ctx: Context<MakeLogs>,
    data:Vec<u8>)->ProgramResult{
        let log = from_utf8(&data).map_err(|err| {
            msg!("Invalid UTF-8, from byte {}", err.valid_up_to());
            ProgramError::InvalidInstructionData
        })?;
        msg!("Log {} ",  log);
        let test_acc =&mut ctx.accounts.test_account;
        test_acc.lastest_payload = format!("{}",String::from(log));
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info>{
    #[account(init,
        payer=authority,
        space=8 //account
        +32 //pubKey
        +556 // unsigned instruction max
    )]
    pub test_account: Account<'info, TestAccount>,
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct MakeLogs<'info>{
    #[account(mut,
        has_one=authority,
    )]
    pub test_account: Account<'info, TestAccount>,
    pub authority: Signer<'info>
}

#[account]
pub struct TestAccount {
    pub lastest_payload: String,
    pub authority: Pubkey
}


pub struct AuditLog{
    pub payload:  String,
    pub time:  SystemTime,
}
