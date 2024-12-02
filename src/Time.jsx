import './Time.css';
import { FaInstagram, FaCalendarCheck, FaTwitter, FaWhatsapp, FaTiktok } from "react-icons/fa";

const Time = () => {

    return (
        <>
            <div className="time_tab">
                <h1>Conheça nossa equipe de <span>Profissionais</span></h1>
                <div className="time_grid">
                    <div className="time_container">
                        <img src="/public/eric-time.png" draggable="false" alt="" />
                        <div className="time_text">
                            <h2>Eric Bauer</h2>
                            <div className="time_icons">
                                <FaInstagram />
                                <FaTwitter />
                                <FaWhatsapp />
                                <FaTiktok />
                            </div>
                            <h3>Consultar <FaCalendarCheck /></h3>
                        </div>
                    </div>
                    <div className="time_container">
                        <img src="/public/joao-time.png" draggable="false" alt="" />
                        <div className="time_text">
                            <h2>João Silva</h2>
                            <div className="time_icons">
                                <FaInstagram />
                                <FaTwitter />
                                <FaWhatsapp />
                                <FaTiktok />
                            </div>
                            <h3>Consultar <FaCalendarCheck /></h3>
                        </div>
                    </div>
                    <div className="time_container">
                        <img src="/public/derek-time.png" draggable="false" alt="" />
                        <div className="time_text">
                            <h2>Derek Rosa</h2>
                            <div className="time_icons">
                                <FaInstagram />
                                <FaTwitter />
                                <FaWhatsapp />
                                <FaTiktok />
                            </div>
                            <h3>Consultar <FaCalendarCheck /></h3>
                        </div>
                    </div>
                    <div className="time_container">
                        <img src="/public/felipe-time.png" draggable="false" alt="" />
                        <div className="time_text">
                            <h2>Felipe Noguez</h2>
                            <div className="time_icons">
                                <FaInstagram />
                                <FaTwitter />
                                <FaWhatsapp />
                                <FaTiktok />
                            </div>
                            <h3>Consultar <FaCalendarCheck /></h3>
                        </div>
                    </div>
                    <div className="time_container">
                        <img src="/public/pedro-time.png" draggable="false" alt="" />
                        <div className="time_text">
                            <h2>Pedro Nunes</h2>
                            <div className="time_icons">
                                <FaInstagram />
                                <FaTwitter />
                                <FaWhatsapp />
                                <FaTiktok />
                            </div>
                            <h3>Consultar <FaCalendarCheck /></h3>
                        </div>
                    </div>
                    <div className="time_container">
                        <img src="/public/corbucci-time.png" draggable="false" alt="" />
                        <div className="time_text">
                            <h2>Corbucci Eats</h2>
                            <div className="time_icons">
                                <FaInstagram />
                                <FaTwitter />
                                <FaWhatsapp />
                                <FaTiktok />
                            </div>
                            <h3>Consultar <FaCalendarCheck /></h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Time;
