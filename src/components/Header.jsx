import { Link } from "react-router-dom";
import './Header.css';

export function Header() {

  return (
    <>
    <header className="main_header">
        <h1>Se<span>Nutri</span>™</h1>
        <nav className='main_navbar'>
          <ul>
            <li><Link draggable="false" to="/">Home</Link></li>
            <li><Link draggable="false" to="/pratos">Pratos</Link></li>
            <li><Link draggable="false" to="/IMC">Monte sua Dieta</Link></li>
            <li><a href="">Time</a></li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
