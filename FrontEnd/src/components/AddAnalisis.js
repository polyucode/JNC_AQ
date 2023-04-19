import { useState } from "react";
import axios from "axios";
import { postAnalisis } from "../api/apiBackend";

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

    const enviarAnalisis = async (e) => {
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

        const respAnalisis = await postAnalisis(analisis2);
        guardarAnalisis(analisis => [...analisis, respAnalisis]);
        setInputValue('');

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