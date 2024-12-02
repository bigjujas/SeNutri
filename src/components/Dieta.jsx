import { useState, useEffect } from "react";
import Prato from './ItemPrato';
import { Modal } from 'react-responsive-modal';
import './Dieta.css';
import './NovoPrato.css';

export function Dieta({ imc, tipoDieta }) {
    const [selectedPratos, setSelectedPratos] = useState({
        breakfast: null,
        lunch: null,
        afternoon: null,
        dinner: null,
    });

    const [openModal, setOpenModal] = useState(false);
    const [pratos, setPratos] = useState([]);
    const [imcDieta, setImcDieta] = useState();

    // Carregar pratos do servidor
    useEffect(() => {
        async function fetchPratos() {
            const response = await fetch("http://localhost:3000/pratos");
            const pratosArray = await response.json();
            setPratos(pratosArray);
        }
        fetchPratos();
    }, []);

    // Função para abrir o modal
    const openPratoModal = (refeicao) => {
        setSelectedPratos((prev) => ({ ...prev, currentRefeicao: refeicao }));
        setOpenModal(true);
    };

    // Função para selecionar um prato
    const selecionarPrato = (refeicao, prato) => {
        setSelectedPratos((prev) => ({
            ...prev,
            [refeicao]: prato,
        }));
        setOpenModal(false); // Fechar o modal após selecionar o prato
    };

    // Função para calcular o total de calorias
    const calcularTotalCalorias = () => {
        return Object.values(selectedPratos).reduce((total, prato) => {
            if (prato && !isNaN(prato.calories)) {
                return total + prato.calories;
            }
            return total;
        }, 0);
    };

    // Calorias totais
    const totalCalorias = calcularTotalCalorias();

    const IMCrecomendado = () => {
        if (tipoDieta === "Ganho") {
            setImcDieta(Math.round(imc + 300));
        } else {
            setImcDieta(Math.round(imc - 300));
        }
    };

    useEffect(() => {
        IMCrecomendado();
    }, [imc, tipoDieta]);

    const deveExibirAviso = () => {
        if (totalCalorias === 0) return { showWarning: false, className: "" };

        if (tipoDieta === "Ganho") {
            return {
                showWarning: totalCalorias < imcDieta,
                className: totalCalorias < imcDieta ? "warning_background" : "",
            };
        } else if (tipoDieta === "Perda") {
            return {
                showWarning: totalCalorias > imcDieta,
                className: totalCalorias > imcDieta ? "warning_background" : "",
            };
        }
        return { showWarning: false, className: "" };
    };

    return (
        <>
            <div className="dieta_tab">
                <h1>Monte sua Dieta</h1>
                <h2>Seu gasto calórico estimado: <span>{Math.round(imc)} kcal</span></h2>
                <div className="dieta_pratos">
                    {["breakfast", "lunch", "afternoon", "dinner"].map((refeicao) => (
                        <div className="prato_dieta" key={refeicao}>
                            <h3>{refeicao === "breakfast" ? "Café da Manhã" :
                                refeicao === "lunch" ? "Almoço" :
                                    refeicao === "afternoon" ? "Café da Tarde" : "Jantar"}</h3>
                            <button className="button-prato" onClick={() => openPratoModal(refeicao)}>
                                Selecionar Prato
                            </button>
                            {selectedPratos[refeicao] && (
                                <div className="prato_selecionado">
                                    <h4>{selectedPratos[refeicao].name}</h4>
                                    <img src={selectedPratos[refeicao].image} draggable="false" alt="" />
                                    <p>{selectedPratos[refeicao].calories} kcal</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {totalCalorias > 0 && (
                    <div className="dieta_calorias">
                        <h5>Soma calórica recomendada: <span>{imcDieta} kcal</span></h5>
                        <h5 className={deveExibirAviso().className}>Soma calórica das refeições: <span>{totalCalorias} kcal</span></h5>
                    </div>
                )}

                {deveExibirAviso().showWarning && (
                    <p className="warning">As calorias da sua dieta não estão condizendo com seu objetivo de peso</p>
                )}

            </div>

            {/* Modal para exibir os pratos */}
            <Modal open={openModal} onClose={() => setOpenModal(false)} center>
                <div className="modal_dieta">
                    <h2 className="dieta_modal_title">Escolha um prato</h2>
                    <div className="modal_pratos">
                        {pratos.map((prato) => (
                            <div key={prato.id} className="prato-item" onClick={() => selecionarPrato(selectedPratos.currentRefeicao, prato)}>
                                <Prato prato={prato} pratos={pratos} />
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default Dieta;
