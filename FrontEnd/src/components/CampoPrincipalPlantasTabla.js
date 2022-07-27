import React, { useState, useEffect } from 'react';

const CampoPrincipalPlantasTabla = (props) => {

    
    const [state, setState] = useState(props.datos);

    const [ checkboxActivo, setCheckboxActivo ] = useState(false)

    useEffect(() => {

        // Comprobamos si la casilla está marcada. Si lo está deshabilitamos los inputs
        if (checkboxActivo) {
            document.getElementById(props.nombre + 'LimInf').removeAttribute('disabled');
            document.getElementById(props.nombre + 'LimSup').removeAttribute('disabled');
            document.getElementById(props.nombre + 'Unidades').removeAttribute('disabled');
            document.getElementById(props.nombre + 'VerInspector').removeAttribute('disabled');
        } else {
            document.getElementById(props.nombre + 'LimInf').setAttribute('disabled', 'disabled');
            document.getElementById(props.nombre + 'LimSup').setAttribute('disabled', 'disabled');
            document.getElementById(props.nombre + 'Unidades').setAttribute('disabled', 'disabled');
            document.getElementById(props.nombre + 'VerInspector').setAttribute('disabled', 'disabled');
        }

    }, []);

    const handleActivo = (e) => {
        setCheckboxActivo(e.target.checked)
        const { name, value } = e.target
        // Comprobamos si la casilla está marcada. Si lo está deshabilitamos los inputs
        if (e.target.checked) {
            document.getElementById(props.nombre + 'LimInf').removeAttribute('disabled');
            document.getElementById(props.nombre + 'LimSup').removeAttribute('disabled');
            document.getElementById(props.nombre + 'Unidades').removeAttribute('disabled');
            document.getElementById(props.nombre + 'Activo').setAttribute('checked', 'checked');
            document.getElementById(props.nombre + 'VerInspector').removeAttribute('disabled');
            props.setParametrosSeleccionado(prevState => ({
                ...prevState,
                [name]: e.target.checked
            }));
        } else {
            document.getElementById(props.nombre + 'LimInf').setAttribute('disabled', 'disabled');
            document.getElementById(props.nombre + 'LimSup').setAttribute('disabled', 'disabled');
            document.getElementById(props.nombre + 'Unidades').setAttribute('disabled', 'disabled');
            document.getElementById(props.nombre + 'Activo').removeAttribute('checked');
            document.getElementById(props.nombre + 'VerInspector').setAttribute('disabled', 'disabled');
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
            <td><input type="number" name={props.nombre + 'LimInf'} id={props.nombre + 'LimInf'} onChange={handleLimitInferior} /></td>
            <td><input type="number" name={props.nombre + 'LimSup'} id={props.nombre + 'LimSup'} onChange={handleLimitSuperior} /></td>
            <td>
                <select name={props.nombre + 'Unidades'} id={props.nombre + 'Unidades'} onChange={handleUnidad} >
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
            <td><center><input type="checkbox" name={props.nombre + 'Activo'} id={props.nombre + 'Activo'} onChange={handleActivo} checked={checkboxActivo}/></center></td>
            <td><center><input type="checkbox" name={props.nombre + 'VerInspector'} id={props.nombre + 'VerInspector'} onChange={handleVerInspector} /></center></td>
        </tr>
    );
};

export default CampoPrincipalPlantasTabla;