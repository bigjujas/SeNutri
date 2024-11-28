import { useForm } from 'react-hook-form'
import "./NovoPrato.css"

export function NovoPrato({ pratos, setPratos }) {
    const { register, handleSubmit } = useForm()

    function salvaPrato(data) {
        const novo = {
            name: data.name,
            type: data.type,
            description: data.description,
            calories: data.calories,
            image: data.image,
            stars: 0,
        }

        const pratos2 = [novo, ...pratos]
        setPratos(pratos2)
        localStorage.setItem("pratos", JSON.stringify(pratos2))
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
                            <option value="Perda">Perder Peso</option>
                            <option value="Ganho">Ganhar Peso</option>
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
