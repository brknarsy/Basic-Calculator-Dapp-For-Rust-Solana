const assert = require("assert")
const anchor = require("@project-serum/anchor")
const {SystemProgram} = anchor.web3
describe('mycalculatordapp', () => {
    const provider = anchor.AnchorProvider  .local();
    anchor.setProvider(provider)
    const calculator = anchor.web3.Keypair.generate()
    const program = anchor.workspace.Mycalculatordapp

    it('Creates a calculator', async() => {
        await program.rpc.create("Welcome to solana", {
            accounts: {
                calculator: calculator.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId
            },
            signers: [calculator]

        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.greeting === "Welcome to solana")
    })

    it('Makes an addition', async() => {
        await program.rpc.add(new anchor.BN(24), new anchor.BN(12), {
            accounts: {
                calculator: calculator.publicKey
            },
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.eq(new anchor.BN(36)))
    })

    it('Makes a subtraction', async() => {
        await program.rpc.subtract(new anchor.BN(24), new anchor.BN(12), {
            accounts: {
                calculator: calculator.publicKey
            },
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.eq(new anchor.BN(12)))
    })

    it('Makes a multipliction', async() => {
        await program.rpc.multiply(new anchor.BN(24), new anchor.BN(12), {
            accounts: {
                calculator: calculator.publicKey
            },
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.eq(new anchor.BN(24*12)))
    })

    it('Makes a division', async() => {
        await program.rpc.divide(new anchor.BN(24), new anchor.BN(12), {
            accounts: {
                calculator: calculator.publicKey
            },
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.eq(new anchor.BN(2)))
    })
})
