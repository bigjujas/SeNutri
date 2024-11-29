import './Footer.css';
import { FaInstagram, FaFacebook, FaTwitter, FaWhatsapp, FaTiktok  } from "react-icons/fa";

export function Footer() {

  return (
    <>
    <footer className="main_footer">
        <div className="footer_contacts">
            <div className="contact_container">
                <p>Email para Contato:</p>
            <h2>SeNutri@senutri.com</h2>
            </div>
            <div className="contact_container">
                <p>Telefone para contato:</p>
            <h2>+53 9999-9999</h2>
            </div>
        </div>
        <div className="footer_name">
        <h1>Se<span>Nutri</span>™</h1>
        <p>17.778.143/0001-21</p>
        </div>
        <div className="footer_icons">
        <FaInstagram />
        <FaFacebook />
        <FaTwitter />
        <FaWhatsapp />
        <FaTiktok />
        </div>
    </footer>
    </>
  );
}

export default Footer;
