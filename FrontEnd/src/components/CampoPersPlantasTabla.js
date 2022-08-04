import React, { useState, useEffect } from 'react';

const CampoPersPlantasTabla = (props) => {

    const [ state, setState ] = useState(props.datos);
    const nombreId = props.name.replace(/\s+/g, '');

    const [ checkboxActivo2, setCheckbox2Activo] = useState(false);

    useEffect( () => {

        // Comprobamos si la casilla está marcada. Si lo está deshabilitamos los inputs
        if (props.parametros.Activo) {
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
        props.cambiarDatos( props.name, props.parametros, 'Nombre', value );
    }

    const handleActivo = (e) => {
        setCheckbox2Activo(e.target.checked)
        const { name, value, checked } = e.target
        // Comprobamos si la casilla está marcada. Si lo está deshabilitamos los inputs
        if (checked) {
            document.getElementById(nombreId + 'Nombre').removeAttribute('disabled');
            document.getElementById(nombreId + 'LimInf').removeAttribute('disabled');
            document.getElementById(nombreId + 'LimSup').removeAttribute('disabled');
            document.getElementById(nombreId + 'Unidades').removeAttribute('disabled');
            document.getElementById(nombreId + 'Activo').setAttribute('checked', 'checked');
            document.getElementById(nombreId + 'VerInspector').removeAttribute('disabled');
            props.cambiarDatos( props.name, props.parametros, 'Activo', checked );
        } else {
            document.getElementById(nombreId + 'Nombre').setAttribute('disabled', 'disabled');
            document.getElementById(nombreId + 'LimInf').setAttribute('disabled', 'disabled');
            document.getElementById(nombreId + 'LimSup').setAttribute('disabled', 'disabled');
            document.getElementById(nombreId + 'Unidades').setAttribute('disabled', 'disabled');
            document.getElementById(nombreId + 'Activo').removeAttribute('checked');
            document.getElementById(nombreId + 'VerInspector').setAttribute('disabled', 'disabled');
            props.cambiarDatos( props.name, props.parametros, 'Activo', checked );
        }

    }

    const handleVerInspector = (e) => {
        const { name, value, checked } = e.target
        // Actualiza el valor en la variable
        props.cambiarDatos( props.name, props.parametros, 'VerInspector', checked );

    }

    const handleUnidad = (e) => {
        const { name, value } = e.target
        // Actualiza el valor en la variable
        props.cambiarDatos( props.name, props.parametros, 'Unidades', value );
    }

    const handleLimitInferior = (e) => {
        const { name, value } = e.target
        // Actualiza el valor en la variable
        props.cambiarDatos( props.name, props.parametros, 'LimInf', parseInt(value) );
        
    }

    const handleLimitSuperior = (e) => {
        const { name, value } = e.target
        // Actualiza el valor en la variable
        props.cambiarDatos( props.name, props.parametros, 'LimSup', parseInt(value) );
    }


    return (
        <tr key={props.name}>
            <td>{props.nombre}</td>
            <td><input type="text" name={nombreId + 'Nombre'} id={nombreId + 'Nombre'} onChange={handleNombre} value={props.parametros.Nombre} /></td>
            <td><input type="number" name={nombreId + 'LimInf'} id={nombreId + 'LimInf'} onChange={handleLimitInferior} value={props.parametros.LimInf} /></td>
            <td><input type="number" name={nombreId + 'LimSup'} id={nombreId + 'LimSup'} onChange={handleLimitSuperior} value={props.parametros.LimSup} /></td>
            <td>
                <select name={nombreId + 'Unidades'} id={nombreId + 'Unidades'} onChange={handleUnidad} value={props.parametros.Unidades}>
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
            <td><center><input type="checkbox" name={nombreId + 'Activo'} id={nombreId + 'Activo'} onChange={handleActivo} checked={props.parametros.Activo} value={props.parametros.Activo} /></center></td>
            <td><center><input type="checkbox" name={nombreId + 'VerInspector'} id={nombreId + 'VerInspector'} onChange={handleVerInspector} checked={props.parametros.VerInspector} value={props.parametros.VerInspector} /></center></td>
        </tr>
    );
};

export default CampoPersPlantasTabla;