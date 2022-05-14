import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom'
import { FC } from 'react'
import { useEffect } from 'react';


const Header: FC = () => {

    let burgerMenu
    let toggle

    useEffect(() => {
        burgerMenu = document.querySelector('.nav')
        toggle = document.querySelector("#toggle")
    }, [])  

    const deleteBurgerMenu = () => {
        burgerMenu.classList.add("dn")
        toggle.checked = false
        burgerMenu.classList.remove("dn")
    }



    return (
        <nav className='header_nav'>
            <ul className='header_nav_list'>
                <Link className='header_nav_link' to={'/'}><li className='header_nav_item'>Catalog</li></Link>
                <Link className='header_nav_link' to={'/about'}><li className='header_nav_item'>About</li></Link>
                <Link className='header_nav_link' to={'/Authorization'}><li className='header_nav_item'>Authorization</li></Link>

                <input id="toggle" type="checkbox"></input>
                <label htmlFor="toggle" className="hamburger">
                    <div className="top-bun"></div>
                    <div className="meat"></div>
                    <div className="bottom-bun"></div>
                </label>
                <div className="nav">
                    <div className="nav-wrapper">
                        <nav className='header_nav_mobile'>
                            <Link onClick={deleteBurgerMenu} className='header_nav_link header_nav_link_mobile_1' to={'/'}><li className='header_nav_item'>Catalog</li></Link>
                            <Link onClick={deleteBurgerMenu} className='header_nav_link header_nav_link_mobile' to={'/about'}><li className='header_nav_item'>About</li></Link>
                            <Link onClick={deleteBurgerMenu} className='header_nav_link header_nav_link_mobile' to={'/Authorization'}><li className='header_nav_item'>Authorization</li></Link>
                        </nav>
                    </div>
                </div>
            </ul>           
        </nav>
    );
};

export default Header;