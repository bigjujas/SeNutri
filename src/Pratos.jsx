import React, { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import { Modal } from 'react-responsive-modal';
import { Prato } from "./components/ItemPrato.jsx";
import { NovoPrato } from "./components/NovoPrato.jsx";
import './Pratos.css';

export function Pratos() {
  const [pratos, setPratos] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPrato, setSelectedPrato] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("pratos")) {
      const pratos2 = JSON.parse(localStorage.getItem("pratos"));
      setPratos(pratos2);
    }
  }, []);

  function excluirPrato() {
    const pratosAtualizados = pratos.filter((prato) => prato.name !== selectedPrato.name);
    setPratos(pratosAtualizados);
    localStorage.setItem("pratos", JSON.stringify(pratosAtualizados)); // Atualiza o localStorage
    setSelectedPrato(null); //
    setOpen(false);
  }

  const itemsPratos = pratos.map((prato) => (
    <div key={prato.name} onClick={() => {
      setSelectedPrato(prato);
      setOpen(true);
    }}>
      <Prato prato={prato} pratos={pratos} setPratos={setPratos} />
    </div>
  ));

  function adicionarPrato() {
    setOpen(true);
    setSelectedPrato(null);
  }

  function avaliarPrato(novaNota) {
    const pratosAtualizados = pratos.map((prato) =>
      prato.name === selectedPrato.name ? { ...prato, stars: novaNota } : prato
    );

    setPratos(pratosAtualizados);
    localStorage.setItem("pratos", JSON.stringify(pratosAtualizados)); // Atualiza o localStorage
    setSelectedPrato((prev) => ({ ...prev, stars: novaNota })); // Atualiza o prato selecionado no modal
  }

  return (
    <>
      <div className="pratos_tab">
        <h1>Receitas - Perda de Peso</h1>
        <div className="pratos_grid">{itemsPratos}</div>
        <button className="main_button" onClick={adicionarPrato}>Adicionar Receita</button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} center>

        {selectedPrato ? (
          <div className="prato_detalhes">
            <div className="prato_detalhes_left">
              <img src={selectedPrato.image} alt={selectedPrato.name} />
              <div className="avaliacao">
                <h3>Avaliar:</h3>
                <div className="avaliacao_estrelas">
                  {[1, 2, 3, 4, 5].map((nota) => (
                    <span key={nota} onClick={() => avaliarPrato(nota)}
                    style={{
                      color: nota <= (selectedPrato?.stars || 0) ? "orange" : "gray",
                    }}>
                      <IoStar />
                    </span>
                  ))}
                  
                </div>
              </div>
              <button className="delete_button" onClick={excluirPrato}>
                Excluir Receita
              </button>
            </div>
            <div className="prato_detalhes_text">
              <h2>{selectedPrato.name}</h2>
              <h3><span>Calorias:</span> {selectedPrato.calories} kcal</h3>
              <p><span>Descrição/Receita:</span></p>
              <p>{selectedPrato.description}</p>
            </div>
          </div>

        ) : (
          <NovoPrato pratos={pratos} setPratos={setPratos} />
        )}
      </Modal>
    </>
  );
}

export default Pratos;
