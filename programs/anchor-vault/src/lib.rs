use anchor_lang::prelude::*;

declare_id!("36HFitum2dT3Ai6yLrMErTTmsWU67bAgLZ6XWP6z7JGP");

#[program]
pub mod anchor_vault {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
