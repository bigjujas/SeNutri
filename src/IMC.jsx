import React, { useState } from 'react';
import { Dieta } from './components/Dieta';
import './IMC.css';
import './App.css';

const IMCForm = () => {
  const [currentTab, setCurrentTab] = useState(1);
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

  const trocarTab = () => {
    setCurrentTab(3)
  }



  const calculateIMC = () => {

    const { height, weight, name } = formData;
    if (height && weight) {
      const imc = (weight / (height * height)).toFixed(2);
      setCurrentTab(2);
    } else {
      alert('Por favor, preencha os campos corretamente.');
    }
  };

  return (
    <>
      <header className="main_header">
        <h1>Se<span>Nutri</span>™</h1>
        <nav className='main_navbar'>
          <ul>
            <li><a href="">Home</a></li>
            <li><a href="">Pratos</a></li>
            <li><a href="">Monte sua dieta</a></li>
            <li><a href="">Time</a></li>
          </ul>
        </nav>
      </header>
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
                Proxima etapa
              </button>

            </form>
          </div>
        </div>
      )}

      {currentTab === 2 && (
        //botoes de escolha
        <div className="botoes-main-escolha">
          <h1 className="titulo-botoes-escolha"> Qual o seu objetivo? </h1>
          <div className="button-group">
            <div className="button-group1">
              <button type='button' onClick={trocarTab} className='button-choice'>Perder peso</button>
            </div>
            <div className="button-group1">
              <button type='button' onClick={trocarTab} className='button-choice'>Ganhar peso</button>
            </div>
          </div>
        </div>
      )}
      {currentTab === 3 && (
        <Dieta />
      )}
    </>
  );
};

const App = () => {
  return (
    <div>
      <IMCForm />
    </div>
  );
};

export default App;
