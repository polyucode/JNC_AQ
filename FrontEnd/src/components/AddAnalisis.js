import { useState } from "react";
import axios from "axios";

const token = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};

export const AddAnalisis = ({ guardarAnalisis, verAnalisis }) => {

    const [inputValue, setInputValue] = useState();

    console.log(verAnalisis)

    const cambiarValue = e => {
        setInputValue(e.target.value)
    }

    const enviarAnalisis = e => {
        e.preventDefault();

        const analisis2 = {
            id: 0,
            nombre: inputValue,
            addDate: null,
            addIdUser: null,
            modDate: null,
            modIdUser: null,
            delDate: null,
            delIdUser: null,
            deleted: null
        }

        axios.post("/analisis", analisis2, token)
            .then(response => {
                guardarAnalisis(analisis => [...analisis, response.data.data])
            })
            .catch(error => {
                console.log(error)
            })


        setInputValue('')
    }

    return (
        <form onSubmit={enviarAnalisis}>
            <input
                type="text"
                placeholder="Añadir Analisis"
                value={inputValue}
                onChange={cambiarValue}
            />
        </form>
    )
}