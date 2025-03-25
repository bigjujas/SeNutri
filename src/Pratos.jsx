import { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import { Modal } from 'react-responsive-modal';
import { Prato } from "./components/ItemPrato.jsx";
import { NovoPrato } from "./components/NovoPrato.jsx";
import './Pratos.css';

export function Pratos() {
  const [pratos, setPratos] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPrato, setSelectedPrato] = useState(null);
  const [selectedType, setSelectedType] = useState("todos");

  useEffect(() => {
    async function fetchPratos() {
      const response = await fetch('/pratos.json');
      const data = await response.json();
      setPratos(data.pratos);  // Ajuste para acessar a chave 'pratos' do JSON
    }
    fetchPratos();
  }, []);

  // Função para excluir prato
  async function excluirPrato() {
    // Filtrar o prato que queremos excluir
    const pratosAtualizados = pratos.filter((prato) => prato.name !== selectedPrato.name);
    setPratos(pratosAtualizados);
    setSelectedPrato(null);
    setOpen(false);
  }

  // Função para avaliar prato
  async function avaliarPrato(novaNota) {
    // Atualizar a nota do prato selecionado
    const pratoAtualizado = { ...selectedPrato, stars: novaNota };
    const pratosAtualizados = pratos.map((prato) =>
      prato.name === selectedPrato.name ? pratoAtualizado : prato
    );
    setPratos(pratosAtualizados);
    setSelectedPrato(pratoAtualizado);
  }

  // Garantir que a comparação do filtro funcione corretamente
  const pratosFiltrados = selectedType === "todos"
    ? pratos
    : pratos.filter(prato => prato.type === selectedType);

  const itemsPratos = Array.isArray(pratosFiltrados) && pratosFiltrados.length > 0
    ? pratosFiltrados.map((prato) => (
        <div key={prato.id} onClick={() => { setSelectedPrato(prato); setOpen(true); }}>
          <Prato prato={prato} pratos={pratos} setPratos={setPratos} />
        </div>
      ))
    : <p>Não há pratos disponíveis para este filtro.</p>;

  function adicionarPrato() {
    setOpen(true);
    setSelectedPrato(null);
  }

  return (
    <>
      <div className="pratos_tab">
        <h1>Receitas - {selectedType === "perda" ? "Perda de Peso" : selectedType === "ganho" ? "Ganho de Peso" : "Todas"}</h1>

        <div className="filter_buttons">
          <button className={`button_filter ${selectedType === "perda" ? "current_filter" : ""}`} onClick={() => setSelectedType("perda")}>Perda de Peso</button>
          <button className={`button_filter ${selectedType === "todos" ? "current_filter" : ""}`} onClick={() => setSelectedType("todos")}>Todas</button>
          <button className={`button_filter ${selectedType === "ganho" ? "current_filter" : ""}`} onClick={() => setSelectedType("ganho")}>Ganho de Peso</button>
        </div>

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
              <button className="delete_button" onClick={excluirPrato}>Excluir Receita</button>
            </div>
            <div className="prato_detalhes_text">
              <h2>{selectedPrato.name}</h2>
              <h3><span>Calorias:</span> {selectedPrato.calories} kcal</h3>
              <p><span>Descrição/Receita:</span></p>
              <p>{selectedPrato.description}</p>
            </div>
          </div>
        ) : (
          <NovoPrato pratos={pratos} setPratos={setPratos} setOpen={setOpen} />
        )}
      </Modal>
    </>
  );
}

export default Pratos;
