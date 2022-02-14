import React from 'react';
import { useEffect, useState } from "react";
import "./Authorization.css"
import phantomLogo from "./image/phantom-logo.png"
import disconnectLogo from "./image/disconnect.png"
import { useDispatch, useSelector } from 'react-redux';
  

const Authorization = () => {

    const dispatch = useDispatch()

    // let isToken = useSelector(state => state.getTokenPhantomReducer.isToken)

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

    // useEffect(() => {
    //     const token = localStorage.getItem('WalletKey')
    //     if (token) {
    //         connectWallet()
    //     }
    // }, []);

    const connectWallet = async () => {
        const { solana } = window;

        if (solana) {
          try {
            const response = await solana.connect();
            console.log('wallet account ', response.publicKey.toString());
            setWalletKey(response.publicKey.toString());
            localStorage.setItem('WalletKey', response.publicKey.toString())
            dispatch({type: 'auth'})
          } catch (err) {
           // { code: 4001, message: 'User rejected the request.' }
          }
        }     
    };

    const disconnectWallet = async () => {
        const { solana } = window;
    
        if (walletKey && solana) {
          await (solana).disconnect();
          setWalletKey(undefined);
          localStorage.removeItem('WalletKey')
        }
    };




    return (
        <div className='authorization_container'>
            <div className='authorization_wrap'>
              <button className='btn' onClick={connectWallet}>
                <div className='btn_phantom'>
                  <img className='authorization_phantomLogo' src={phantomLogo} alt="phantomLogo" width="25" height="25" />
                  Phantom
                  {
                    walletKey
                    ? "     " + walletKey.slice(0, 3) +"..."+ walletKey.slice(walletKey.length - 3, walletKey.length)
                    : ''
                  }
                  {walletKey && (
                    <div>
                      <button className='authorization_disconnectLogo' onClick={disconnectWallet}>
                        <img src={disconnectLogo} alt="disconnectLogo" width="20" height="20" />
                      </button>
                    </div>
                  )}  
                </div>    
                         
              </button>
            </div>

        </div>
    );
};

export default Authorization;