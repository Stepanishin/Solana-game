import React, { FC } from 'react';
import './About.css'

const About: FC = () => {
    return (
        <div className='about_container'>
            <div className='about_instruction'>
                <p>Hello. Soon you will be able to get our NFTs as a reward for high scores in games</p>
                <p>Watch for changes at <a target="_blank" rel="noreferrer noopener" href=" https://github.com/Stepanishin"> https://github.com/Stepanishin</a></p>
                <p>So far, anyone can play these games. But if you want to set records, then please log in through Phantom Wallet on Blockchain Solana</p>
                <p>You can install the PhantomWallet extension for Google Chrome on the website: <a target="_blank" rel="noreferrer noopener" href="https://phantom.app/">www.phantom.app</a> </p>
            </div>
        </div>
    );
};

export default About;