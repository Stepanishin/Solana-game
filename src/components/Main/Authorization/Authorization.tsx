import React, { FC } from 'react';
import { useEffect, useState } from "react";
import "./Authorization.css"
import phantomLogo from "./image/phantom-logo.png"
import disconnectLogo from "./image/disconnect.png"
import { useDispatch, useSelector } from 'react-redux';
import { getDatabase, ref, set, child, get } from "firebase/database";
import Nickname from './Nickname.tsx';
import UserData from './UserData.tsx';
  

const Authorization: FC = () => {

    const dispatch = useDispatch()
    let isNickname: boolean = useSelector((state: any) => state.getNicknameReducer.isNickname)
    let isToken: boolean = useSelector((state: any) => state.getTokenPhantomReducer.isToken)
    const [provider, setProvider] = useState();
    const [walletKey, setWalletKey] = useState<undefined | string>();
    const database = getDatabase();
    let isLogin = localStorage.getItem('WalletKey')

    const getProvider = () => {
    if ("solana" in window) {
        const provider = (window as any).solana;
        if (provider.isPhantom) return provider;
        }
    };

    useEffect(() => {
        const provider = getProvider();   
        if (provider) setProvider(provider);
        else setProvider(undefined);
        if (isLogin) {
          connectWallet()
        }
    }, []);

    const connectWallet = async () => {
        const { solana } = (window as any);

        if (solana) {
          try {
            const response = await solana.connect();
            setWalletKey(response.publicKey.toString());
            localStorage.setItem('WalletKey', response.publicKey.toString())
            isLogin = localStorage.getItem('WalletKey')
            dispatch({type: 'auth'})
            writeUserData()
            getNickName()
          } catch (err) {
           // { code: 4001, message: 'User rejected the request.' }
          }
        }     
    };

    const disconnectWallet = async () => {
        const { solana } = (window as any);
    
        if (walletKey && solana) {
          await (solana).disconnect();
          setWalletKey(undefined);
          localStorage.removeItem('WalletKey')
          isLogin = localStorage.getItem('WalletKey')
          dispatch({type: 'logOut'})
        }
    };

    function writeUserData() {
      const db = getDatabase();
      const dbRef = ref(getDatabase());
      get(child(dbRef, "/")).then((snapshot) => {
        if (snapshot.exists()) {
          const user = localStorage.getItem('WalletKey')
          const users = snapshot.val()
          if (!users[user]) {
            set(ref(db, `${localStorage.getItem('WalletKey')}/`), {
              username: localStorage.getItem('WalletKey'),
            });
            getNickName()
          }
        } else {
          console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
      } 
    
    function getNickName() {
      const dbRef = ref(getDatabase());
      get(child(dbRef, "/")).then((snapshot) => {
      if (snapshot.exists()) {
        const user = localStorage.getItem('WalletKey')
        const users = snapshot.val()
        if (users[user].nickname) {
        } else {
          dispatch({type: 'enterNickname'})
        }
      } else {
        console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }




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
              {
                (!isNickname)
                ? <div></div>
                : <Nickname />
              }
              
            </div>
            {
              isLogin
              ? <UserData isLogin={isLogin} />
              : <></>
            }
            
        </div>
    );
};

export default Authorization;