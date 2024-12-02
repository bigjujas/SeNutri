/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form'
import "./NovoPrato.css"

export function NovoPrato({ pratos, setPratos, setOpen }) {
    const { register, handleSubmit } = useForm()

    // Função para salvar o prato no servidor
    async function salvaPrato(data) {
        const novo = {
            name: data.name,
            type: data.type,
            description: data.description,
            calories: Number(data.calories),
            image: data.image,
            stars: 0,
        }

        // Enviar o novo prato para a API (json-server)
        const response = await fetch("http://localhost:3000/pratos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(novo),
        });
        const pratoAdicionado = await response.json();

        // Atualizar o estado de pratos com o prato adicionado
        setPratos([pratoAdicionado, ...pratos]);

        // Fechar o modal
        setOpen(false);
    }

    return (
        <>
            <div className="add_modal">
                <h1>Formulário de Cadastro de Pratos</h1>
                <form className='add_form' onSubmit={handleSubmit(salvaPrato)}>
                    <p>
                        <label htmlFor="name">Nome do Prato:</label>
                        <input type="text" id="name"
                            {...register("name")}
                            required />
                    </p>
                    <p>
                        <label htmlFor="type">Tipo:</label>
                        <select id="type" {...register("type")} required>
                            <option value="perda">Perder Peso</option>
                            <option value="ganho">Ganhar Peso</option>
                        </select>
                    </p>
                    <p>
                        <label htmlFor="image">URL Foto:</label>
                        <input type="text" id="image"
                            {...register("image")}
                            required />
                    </p>
                    <p>
                        <label htmlFor="description">Descrição/Receita:</label>
                        <textarea id="description"
                            rows="7"
                            {...register("description")}
                            required></textarea>
                    </p>
                    <p>
                        <label htmlFor="calories">Calorias do Prato:</label>
                        <input type="number" id="calories"
                            {...register("calories")}
                            required />
                    </p>
                    <p className='modal_buttons'>
                        <input className="modal_button" type="submit" value="Cadastrar" />
                        <input className="modal_button" type="reset" value="Limpar" />
                    </p>
                </form>
            </div>
        </>
    )
}
