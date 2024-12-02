import React from "react"
import { IoStar } from "react-icons/io5";
import "./ItemPrato.css"

export function Prato({ prato, pratos, setPratos }) {
 
    return (
        <div className='grid_item'>
            <h2>{prato.name}</h2>
            <img src={prato.image} alt="" draggable="false" />
            <div className="avaliacao_item">
                <div className="avaliacao_estrelas_item">
                  {[1, 2, 3, 4, 5].map((nota) => (
                    <span key={nota}
                    style={{
                      color: nota <= (prato?.stars || 0) ? "orange" : "gray",
                    }}>
                      <IoStar />
                    </span>
                  ))}
                </div>
              </div>
        </div>
    )
}

export default Prato