import React, { useEffect, useState } from 'react';
import './Catalog.css'
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from "firebase/database";
import { Link } from 'react-router-dom';


const Catalog = () => {

    const [games, setGames] = useState([])

    const firebaseConfig = {
        apiKey: "AIzaSyBycQoE5ODQa4JkXDXU5INlM5kDNNA9cHo",
        authDomain: "petproject-d4ac7.firebaseapp.com",
        databaseURL: "https://petproject-d4ac7-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "petproject-d4ac7",
        storageBucket: "petproject-d4ac7.appspot.com",
        messagingSenderId: "374859257345",
        appId: "1:374859257345:web:ef1afbf6878dc61da11200"
    };

    const app = initializeApp(firebaseConfig);
    
    useEffect(() => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, '/')).then((snapshot) => {
        if (snapshot.exists()) {
            let arr = snapshot.val()
            setGames(...games, arr)
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
        });
    }, [])     

    return (
        <div className='catalog_wrap'>
            <div className='games_wrap'>
            {
                games.map(game => {
                    return (
                        <div className='game_container'  key={game.id}>
                            <Link  to={`/${game.title}`} >
                                <div className='game_wrap_title'>
                                    <img className='game_avatar' src={game.avatar} alt={game.title} width="50" height="50" />
                                    <h2 className='game_title'>{game.title}</h2>
                                </div>
                            </Link>
                        </div>
                    )
                })
            }
            </div>
        </div>
    );
};

export default Catalog;