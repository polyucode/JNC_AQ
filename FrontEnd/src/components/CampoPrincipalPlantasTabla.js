import React, { useState, useEffect } from 'react';

const CampoPrincipalPlantasTabla = (props) => {

    console.log(props)
    const [state, setState] = useState(props.datos);

    const [ checkboxActivo, setCheckboxActivo ] = useState(false)

    useEffect(() => {

        // Comprobamos si la casilla está marcada. Si lo está deshabilitamos los inputs
        if (checkboxActivo) {
            document.getElementById(props.parametros.Nombre + 'LimInf').removeAttribute('disabled');
            document.getElementById(props.parametros.Nombre + 'LimSup').removeAttribute('disabled');
            document.getElementById(props.parametros.Nombre + 'Unidades').removeAttribute('disabled');
            document.getElementById(props.parametros.Nombre + 'VerInspector').removeAttribute('disabled');
        } else {
            document.getElementById(props.parametros.Nombre + 'LimInf').setAttribute('disabled', 'disabled');
            document.getElementById(props.parametros.Nombre + 'LimSup').setAttribute('disabled', 'disabled');
            document.getElementById(props.parametros.Nombre + 'Unidades').setAttribute('disabled', 'disabled');
            document.getElementById(props.parametros.Nombre + 'VerInspector').setAttribute('disabled', 'disabled');
        }

    }, []);

    const handleActivo = (e) => {
        setCheckboxActivo(e.target.checked)
        const { name, value } = e.target
        // Comprobamos si la casilla está marcada. Si lo está deshabilitamos los inputs
        if (e.target.checked) {
            document.getElementById(props.parametros.Nombre + 'LimInf').removeAttribute('disabled');
            document.getElementById(props.parametros.Nombre + 'LimSup').removeAttribute('disabled');
            document.getElementById(props.parametros.Nombre + 'Unidades').removeAttribute('disabled');
            document.getElementById(props.parametros.Nombre + 'Activo').setAttribute('checked', 'checked');
            document.getElementById(props.parametros.Nombre + 'VerInspector').removeAttribute('disabled');
            props.setParametrosSeleccionado(prevState => ({
                ...prevState,
                [name]: e.target.checked
            }));
        } else {
            document.getElementById(props.parametros.Nombre + 'LimInf').setAttribute('disabled', 'disabled');
            document.getElementById(props.parametros.Nombre + 'LimSup').setAttribute('disabled', 'disabled');
            document.getElementById(props.parametros.Nombre + 'Unidades').setAttribute('disabled', 'disabled');
            document.getElementById(props.parametros.Nombre + 'Activo').removeAttribute('checked');
            document.getElementById(props.parametros.Nombre + 'VerInspector').setAttribute('disabled', 'disabled');
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
        <tr key={props.parametros.Nombre}>
            <td>{props.nombre}</td>
            <td><input type="number" name={props.parametros.Nombre + 'LimInf'} id={props.parametros.Nombre + 'LimInf'} onChange={handleLimitInferior} value={props.parametros.LimInf} /></td>
            <td><input type="number" name={props.parametros.Nombre + 'LimSup'} id={props.parametros.Nombre + 'LimSup'} onChange={handleLimitSuperior} value={props.parametros.LimSup} /></td>
            <td>
                <select name={props.parametros.Nombre + 'Unidades'} id={props.parametros.Nombre + 'Unidades'} onChange={handleUnidad} value={props.parametros.Unidades} >
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
            <td><center><input type="checkbox" name={props.parametros.Nombre + 'Activo'} id={props.parametros.Nombre + 'Activo'} onChange={handleActivo} checked={props.parametros.Activo} /></center></td>
            <td><center><input type="checkbox" name={props.parametros.Nombre + 'VerInspector'} id={props.parametros.Nombre + 'VerInspector'} onChange={handleVerInspector} checked={props.parametros.VerInspector} /></center></td>
        </tr>
    );
};

export default CampoPrincipalPlantasTabla;