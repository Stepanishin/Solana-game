import React from 'react';
// import { PublicKey, Transaction } from "@solana/web3.js";
import { useEffect, useState } from "react";
  

const Authorization = () => {

    const [provider, setProvider] = useState();
    const [walletKey, setWalletKey] = useState();

    const getProvider = () => {
    if ("solana" in window) {
        const provider = window.solana;
        if (provider.isPhantom) return provider;
        }
    };

    useEffect(() => {
        const provider = getProvider();
    
        if (provider) setProvider(provider);
        else setProvider(undefined);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('WalletKey')
        if (token) {
            connectWallet()
        }
    }, []);

    const connectWallet = async () => {
        // @ts-ignore
        const { solana } = window;
    
        if (solana) {
          try {
            const response = await solana.connect();
            console.log('wallet account ', response.publicKey.toString());
            setWalletKey(response.publicKey.toString());
            localStorage.setItem('WalletKey', response.publicKey.toString())
          } catch (err) {
           // { code: 4001, message: 'User rejected the request.' }
          }
        }
    };

    const disconnectWallet = async () => {
        // @ts-ignore
        const { solana } = window;
    
        if (walletKey && solana) {
          await (solana).disconnect();
          setWalletKey(undefined);
          localStorage.removeItem('WalletKey')
        }
    };




    return (
        <div>
            Authorization Page

            <h2>Tutorial: Connect to Phantom Wallet</h2>
        {provider && !walletKey && (
          <button className='btn' onClick={connectWallet}>Connect to Phantom Wallet</button>
        )}

        {!provider && (
          <p>
            No provider found. Install{" "}
            <a className='btn' href="https://phantom.app/">Phantom Browser extension</a>
          </p>
        )}

        {provider && walletKey && (
          <div>
            <p>Connected account {walletKey}</p>
            <button className='btn' onClick={disconnectWallet}>Disconnect</button>
          </div>
        )}

        







            <br />
            {/* <button className='btn' onClick={getAccount}>getAccount</button> */}
            <br />
            {/* <button className='btn' onClick={getInfo}>getInfo</button> */}
            <br />
            {/* <button className='btn' onClick={getKey}>getKey</button> */}
            <br />
            {/* <button className='btn' onClick={disconnectAcoount}>disconnectAcoount</button> */}
        </div>
    );
};

export default Authorization;