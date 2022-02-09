import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom'
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';

const Header = () => {

    return (
        <nav className='header_nav'>
            <ul className='header_nav_list'>
                <li className='header_nav_item'><Link className='header_nav_link btn' to={'/'}>Catalog</Link></li>
                <li className='header_nav_item'><Link className='header_nav_link btn' to={'/about'}>About</Link></li>
                <li className='header_nav_item'><button className='btn_connect_wallet' to={'/Authorization'}>Connect</button></li>
            </ul>           
        </nav>
    );
};

export default Header;