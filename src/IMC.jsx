import { useState } from 'react';
import Dieta from './components/Dieta'
import Pratos from '/src/Pratos'
import './IMC.css';

const IMC = () => {
  const [currentTab, setCurrentTab] = useState(1);
  const [imc, setIMC] = useState();
  const [tipoDieta, setTipoDieta] = useState("")

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    gender: 'masculino',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const selecionarTipo = (tipo) => {
    setTipoDieta(tipo);
    setCurrentTab(3)
  };

  const calculateIMC = () => {
    const { height, weight } = formData;
    if (height && weight) {
      const newImc = (weight / (height * height)).toFixed(2);
      setIMC(newImc);
      setCurrentTab(2);
    } else {
      alert('Por favor, preencha os campos corretamente.');
    }
  };

  return (
    <>
      {currentTab === 1 && (
        <div className="main-imc">
          <div className="form-container">
            <h2>Preencha com seus dados:</h2>
            <form>
              <div className="form-group">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nome" required />
              </div>
              <div className="form-group">
                <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Idade" required />
              </div>
              <div className="form-group">
                <input type="number" step="0.01" name="height" value={formData.height} onChange={handleChange} placeholder="Altura (em metros, ex: 1.75)" required />
              </div>
              <div className="form-group">
                <input type="number" step="0.1" name="weight" value={formData.weight} onChange={handleChange} placeholder="Peso (kg)" required />
              </div>
              <div className="form-group">
                <div className="radio-group">
                  <label className='gender-selection'>
                    <input type="radio" name='gender' value="masculino" onChange={handleChange} /> Masculino
                  </label>
                  <label className='gender-selection'>
                    <input type="radio" name='gender' value="feminino" onChange={handleChange} /> Feminino
                  </label>
                </div>
              </div>
              <button type="button" onClick={calculateIMC} className="button-imc">
                Próxima etapa
              </button>
            </form>
          </div>
        </div>
      )}

      {currentTab === 2 && (
        <div className="botoes-main-escolha">
          <h1 className="titulo-botoes-escolha">Qual o seu objetivo?</h1>
          <div className="button-group">
            <div className="button-group1">
              <button type='button' onClick={() => selecionarTipo("Perda")} className='button-choice'>Perder peso</button>
            </div>
            <div className="button-group1">
              <button type='button' onClick={() => selecionarTipo("Ganho")} className='button-choice'>Ganhar peso</button>
            </div>
          </div>
        </div>
      )}

      {currentTab === 3 && (
        <Dieta imc={imc} tipoDieta={tipoDieta} />
      )}
    </>
  );
};

export default IMC;
