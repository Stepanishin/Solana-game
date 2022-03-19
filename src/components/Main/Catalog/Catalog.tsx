import React, { FC } from 'react';
import './Catalog.css'
import { Link } from 'react-router-dom';
import charmander from "./image/charmander.png"
import charizard from "./image/charizard.png"
import squirtle from "./image/squirtle.png"

const Catalog: FC = () => {

    return (
        <div className='catalog_wrap'>
            <div className='games_wrap'>
                <div className='game_container'>
                    <Link  to="/charmander" >
                        <div className='game_wrap_title'>
                            <img className='game_avatar' src={charmander} alt="Charmander in danger!" width="50" height="50" />
                            <h2 className='game_title'>Charmander in danger!</h2>
                        </div>
                    </Link>
                </div>
                <div className='game_container'>
                    <Link  to="/charizard" >
                        <div className='game_wrap_title'>
                            <img className='game_avatar' src={charizard} alt="Flying Charizard" width="50" height="50" />
                            <h2 className='game_title'>Flying Charizard!</h2>
                        </div>
                    </Link>
                </div>
                <div className='game_container'>
                    <Link  to="/dodge" >
                        <div className='game_wrap_title'>
                            <img className='game_avatar' src={squirtle} alt="Save the squirtle!" width="50" height="50" />
                            <h2 className='game_title'>Save the squirtle!</h2>
                        </div>
                    </Link>
                </div>

                <div className='catalog_instruction'>
                    <p>So far, anyone can play these games. But if you want to set records, then please log in through Phantom Wallet on Blockchain Solana</p>
                    <p>You can install the PhantomWallet extension for Google Chrome on the website: <a target="_blank" rel="noreferrer noopener" href="https://phantom.app/">www.phantom.app</a> </p>
                </div>

            </div>
        </div>
    );
};

export default Catalog;