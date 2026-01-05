import { Keypair, Connection, clusterApiUrl } from "@solana/web3.js";
import { createMint, TOKEN_PROGRAM_ID } from "@solana/spl-token";

(async () => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const feePayer = Keypair.generate();
    const tx = await connection.requestAirdrop(feePayer.publicKey, 10e9);

    /*
    given below we have two code confirmationOptions and await connection.confirmTransaction ok.
    here we two code given below so why u add this .

    1.let's suppose you had request 1 SOL token( tx=1 SOL) and you don't 
    */
    const confirmationOptions = {
        signature: tx,
        commitment: "confirmed"
    }
    await connection.confirmTransaction(confirmationOptions);
    console.log("Airdrop completed successfully");

    const tokenMintAccountKp = Keypair.generate();


    // You need to airdrop SOL to feePayer.publicKey here if on devnet

    const tokenMintAddress = await createMint(
        connection,
        feePayer,
        feePayer.publicKey,
        feePayer.publicKey,
        2,
        tokenMintAccountKp,
        undefined,
        TOKEN_PROGRAM_ID
    );
    console.log("Token mint pub address:", tokenMintAddress);
    console.log("tokenMintAccountKp Pub Address:", tokenMintAddress.publicKey.toBase58());
    console.log("fee payer pub address:", feePayer.publicKey.toBase58());
})();