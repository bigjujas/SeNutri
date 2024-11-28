import React from "react";
import './Header.css';

export function Header() {


  return (
    <>
    <header className="main_header">
        <h1>Se<span>Nutri</span>™</h1>
        <nav className='main_navbar'>
          <ul>
            <li><a href="">Home</a></li>
            <li><a href="">Pratos</a></li>
            <li><a href="">IMC</a></li>
            <li><a href="">Time</a></li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
