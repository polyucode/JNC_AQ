import { useState } from "react";
import axios from "axios";
import { axiosOptions } from "../api/apiBackend";

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

        axios.post("http://172.26.0.169:44343/api/analisis", analisis2, axiosOptions)
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