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
      const response = await fetch("http://localhost:3000/pratos");
      const data = await response.json();
      setPratos(data);
    }
    fetchPratos();
  }, []);

  async function excluirPrato() {
    // Para excluir o prato, podemos usar o nome como identificador, mas isso pode não ser ideal se houver pratos com o mesmo nome
    const pratoParaExcluir = pratos.find(prato => prato.name === selectedPrato.name);
    if (pratoParaExcluir) {
      await fetch(`http://localhost:3000/pratos/${pratoParaExcluir.id}`, { method: "DELETE" });
      const pratosAtualizados = pratos.filter((prato) => prato.name !== selectedPrato.name);
      setPratos(pratosAtualizados);
      setSelectedPrato(null);
      setOpen(false);
    }
  }

  async function avaliarPrato(novaNota) {
    const pratoAtualizado = { ...selectedPrato, stars: novaNota };
    await fetch(`http://localhost:3000/pratos/${selectedPrato.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pratoAtualizado),
    });
    const pratosAtualizados = pratos.map((prato) =>
      prato.name === selectedPrato.name ? pratoAtualizado : prato
    );
    setPratos(pratosAtualizados);
    setSelectedPrato(pratoAtualizado);
  }

  const pratosFiltrados = selectedType === "todos"
    ? pratos
    : pratos.filter(prato => prato.type === selectedType);

  const itemsPratos = pratosFiltrados.map((prato) => (
    <div key={prato.id} onClick={() => { setSelectedPrato(prato); setOpen(true); }}>
      <Prato prato={prato} pratos={pratos} setPratos={setPratos} />
    </div>
  ));

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
