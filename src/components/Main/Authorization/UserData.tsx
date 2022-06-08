import React, { FC, useState } from 'react';
import { getDatabase, ref, get, child } from "firebase/database";
import { useEffect } from 'react';
import { Connection } from "@metaplex/js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { PublicKey } from "@solana/web3.js";


const UserData: FC = (props) => {

    let [userData, setUserData] = useState<any | []>([]);
    const { isLogin } = props

    useEffect(() => {
        if (isLogin) {
            getUser()
            getNFTs()
        }
    },[isLogin])

    async function getUser() {
        const dbRef = ref(getDatabase());
        let table = []
        await get(child(dbRef, `/${isLogin}`)).then((snapshot) => {
            if (snapshot.exists()) {
                let arr = Object.values(Object.entries(snapshot.val()))
                setUserData.apply(null,[...userData, arr])
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
            console.error(error);
            });
    }    

    

    async function getNFTs() {
        const connection = new Connection("mainnet-beta");
        const ownerPublickey = "3vh4bKCTuUnb5hjBmf2xxUL8aGUTcLgQkRzji36i9tha";
        const nftsmetadata: any = await Metadata.findDataByOwner(connection, ownerPublickey)
      
        console.log(nftsmetadata);
    }



    return (
        <div className='UserData__container'>
            <h2>Your details:</h2>
                {
                    <ul>
                        <li>
                            {
                                userData.map(item => {
                                    if (item[0] === "username") {
                                        return "Wallet address:  " + item[1].slice(0, 3) +"..."+ item[1].slice(item[1].length - 3, item[1].length)
                                    }
                                })
                            }                         
                        </li>
                        <li>
                            {
                                userData.map(item => {
                                    if (item[0] === "nickname") {
                                        return "Nickname:  " + item[1]
                                    }
                                })
                            }                         
                        </li>
                    </ul>
                }

        </div>
    );
};

export default UserData;