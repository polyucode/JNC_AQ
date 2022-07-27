import React, { useState, useEffect } from 'react';

const CampoPersPlantasTabla = (props) => {

    const [ state, setState ] = useState(props.datos);
    const nombreId = props.nombre.replace(/\s+/g, '');

    const [ checkboxActivo2, setCheckbox2Activo] = useState(false);

    useEffect( () => {

        // Comprobamos si la casilla está marcada. Si lo está deshabilitamos los inputs
        if (checkboxActivo2) {
            document.getElementById(nombreId + 'Nombre').removeAttribute('disabled');
            document.getElementById(nombreId + 'LimInf').removeAttribute('disabled');
            document.getElementById(nombreId + 'LimSup').removeAttribute('disabled');
            document.getElementById(nombreId + 'Unidades').removeAttribute('disabled');
            document.getElementById(nombreId + 'VerInspector').removeAttribute('disabled');
        } else {
            document.getElementById(nombreId + 'Nombre').setAttribute('disabled', 'disabled');
            document.getElementById(nombreId + 'LimInf').setAttribute('disabled', 'disabled');
            document.getElementById(nombreId + 'LimSup').setAttribute('disabled', 'disabled');
            document.getElementById(nombreId + 'Unidades').setAttribute('disabled', 'disabled');
            document.getElementById(nombreId + 'VerInspector').setAttribute('disabled', 'disabled');
        }

    }, []);

    const handleNombre = (e) => {
        const { name, value } = e.target
        // Actualiza el valor en la variable
        props.setParametrosSeleccionado(prevState => ({
            ...prevState,
            [name]: e.target.value
        }));
    }

    const handleActivo = (e) => {
        setCheckbox2Activo(e.target.checked)
        const { name, value } = e.target
        // Comprobamos si la casilla está marcada. Si lo está deshabilitamos los inputs
        if (e.target.checked) {
            document.getElementById(nombreId + 'Nombre').removeAttribute('disabled');
            document.getElementById(nombreId + 'LimInf').removeAttribute('disabled');
            document.getElementById(nombreId + 'LimSup').removeAttribute('disabled');
            document.getElementById(nombreId + 'Unidades').removeAttribute('disabled');
            document.getElementById(nombreId + 'Activo').setAttribute('checked', 'checked');
            document.getElementById(nombreId + 'VerInspector').removeAttribute('disabled');
            props.setParametrosSeleccionado(prevState => ({
                ...prevState,
                [name]: e.target.checked
            }));
        } else {
            document.getElementById(nombreId + 'Nombre').setAttribute('disabled', 'disabled');
            document.getElementById(nombreId + 'LimInf').setAttribute('disabled', 'disabled');
            document.getElementById(nombreId + 'LimSup').setAttribute('disabled', 'disabled');
            document.getElementById(nombreId + 'Unidades').setAttribute('disabled', 'disabled');
            document.getElementById(nombreId + 'Activo').removeAttribute('checked');
            document.getElementById(nombreId + 'VerInspector').setAttribute('disabled', 'disabled');
            props.setParametrosSeleccionado(prevState => ({
                ...prevState,
                [name]: e.target.checked
            }));
        }

    }

    const handleVerInspector = (e) => {
        const { name, value } = e.target
        // Actualiza el valor en la variable
        props.setParametrosSeleccionado(prevState => ({
            ...prevState,
            [name]: e.target.checked
        }));

    }

    const handleUnidad = (e) => {
        const { name, value } = e.target
        // Actualiza el valor en la variable
        props.setParametrosSeleccionado(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleLimitInferior = (e) => {
        const { name, value } = e.target
        // Actualiza el valor en la variable
        props.setParametrosSeleccionado(prevState => ({
            ...prevState,
            [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
        }));
        
    }

    const handleLimitSuperior = (e) => {
        const { name, value } = e.target
        // Actualiza el valor en la variable
        props.setParametrosSeleccionado(prevState => ({
            ...prevState,
            [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
        }));
    }


    return (
        <tr key={props.nombre}>
            <td>{props.nombre}</td>
            <td><input type="text" name={nombreId + 'Nombre'} id={nombreId + 'Nombre'} onChange={handleNombre} /></td>
            <td><input type="number" name={nombreId + 'LimInf'} id={nombreId + 'LimInf'} onChange={handleLimitInferior} /></td>
            <td><input type="number" name={nombreId + 'LimSup'} id={nombreId + 'LimSup'} onChange={handleLimitSuperior} /></td>
            <td>
                <select name={nombreId + 'Unidades'} id={nombreId + 'Unidades'} onChange={handleUnidad}>
                    <option value=''></option>
                    <option value='m3'>m3</option>
                    <option value='Un. pH'>Un. pH</option>
                    <option value='ºC'>ºC</option>
                    <option value='mg/l'>mg/l</option>
                    <option value='mg/l CaCO3'>mg/l CaCO3</option>
                    <option value='N.T.U'>N.T.U</option>
                    <option value='µS/cm'>µS/cm</option>
                </select>
            </td>
            <td><center><input type="checkbox" name={nombreId + 'Activo'} id={nombreId + 'Activo'} onChange={handleActivo} checked={checkboxActivo2} /></center></td>
            <td><center><input type="checkbox" name={nombreId + 'VerInspector'} id={nombreId + 'VerInspector'} onChange={handleVerInspector} /></center></td>
        </tr>
    );
};

export default CampoPersPlantasTabla;