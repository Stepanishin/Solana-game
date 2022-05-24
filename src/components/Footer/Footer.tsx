import React, { FC } from 'react';
import './Footer.css'

const Footer:FC = () => {
    return (
        <footer className='Footer'>
            <a className='Footer_link' href="https://github.com/Stepanishin/Solana-game" target="_blank" rel="noreferrer">Github</a>
            <a className='Footer_link' href="https://twitter.com/Evgenii33952894" target="_blank" rel="noreferrer">Twitter</a>
        </footer>
    );
};

export default Footer;