import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom'
import { FC } from 'react'


const Header: FC = () => {

    return (
        <nav className='header_nav'>
            <ul className='header_nav_list'>
                <li className='header_nav_item'><Link className='header_nav_link btn' to={'/'}>Catalog</Link></li>
                <li className='header_nav_item'><Link className='header_nav_link btn' to={'/about'}>About</Link></li>
                <li className='header_nav_item'><Link className='header_nav_link btn' to={'/Authorization'}>Authorization</Link></li>
            </ul>           
        </nav>
    );
};

export default Header;