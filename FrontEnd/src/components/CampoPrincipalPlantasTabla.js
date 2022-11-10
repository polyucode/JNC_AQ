import React, { useState, useEffect } from 'react';

const CampoPrincipalPlantasTabla = (props) => {

    const [state, setState] = useState(props.datos);

    const [ checkboxActivo, setCheckboxActivo ] = useState(false)
    
    useEffect(() => {

        // Comprobamos si la casilla está marcada. Si lo está deshabilitamos los inputs
        if (props.parametros.Activo) {
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
        const { name, value, checked } = e.target
        // Comprobamos si la casilla está marcada. Si lo está deshabilitamos los inputs
        if (checked) {
            document.getElementById(props.parametros.Nombre + 'LimInf').removeAttribute('disabled');
            document.getElementById(props.parametros.Nombre + 'LimSup').removeAttribute('disabled');
            document.getElementById(props.parametros.Nombre + 'Unidades').removeAttribute('disabled');
            document.getElementById(props.parametros.Nombre + 'Activo').setAttribute('checked', 'checked');
            document.getElementById(props.parametros.Nombre + 'VerInspector').removeAttribute('disabled');
            props.cambiarDatos( props.parametros.Nombre, props.parametros, 'Activo', checked );
        } else {
            document.getElementById(props.parametros.Nombre + 'LimInf').setAttribute('disabled', 'disabled');
            document.getElementById(props.parametros.Nombre + 'LimSup').setAttribute('disabled', 'disabled');
            document.getElementById(props.parametros.Nombre + 'Unidades').setAttribute('disabled', 'disabled');
            document.getElementById(props.parametros.Nombre + 'Activo').removeAttribute('checked');
            document.getElementById(props.parametros.Nombre + 'VerInspector').setAttribute('disabled', 'disabled');
            props.cambiarDatos( props.parametros.Nombre, props.parametros, 'Activo', checked );
        }

    }

    const handleVerInspector = (e) => {
        const { name, value, checked } = e.target
        // Actualiza el valor en la variable
        props.cambiarDatos( props.parametros.Nombre, props.parametros, 'VerInspector', checked );
    }

    const handleUnidad = (e) => {
        const { name, value } = e.target
        // Actualiza el valor en la variable
        props.cambiarDatos( props.parametros.Nombre, props.parametros, 'Unidades', value );
    }

    const handleLimitInferior = (e) => {
        const { name, value } = e.target
        // Actualiza el valor en la variable
        props.cambiarDatos( props.parametros.Nombre, props.parametros, 'LimInf', parseInt( value ) );
        
    }

    const handleLimitSuperior = (e) => {
        const { name, value } = e.target
        // Actualiza el valor en la variable
        props.cambiarDatos( props.parametros.Nombre, props.parametros, 'LimSup', parseInt( value ) );
    }


    return (
        <tr key={props.parametros.Nombre}>
            <td>{props.nombre}</td>
            <td><input type="number" name={props.parametros.Nombre + 'LimInf'} id={props.parametros.Nombre + 'LimInf'} onChange={handleLimitInferior} value={props.parametros.LimInf} /></td>
            <td><input type="number" name={props.parametros.Nombre + 'LimSup'} id={props.parametros.Nombre + 'LimSup'} onChange={handleLimitSuperior} value={props.parametros.LimSup} /></td>
            <td>
                <input type="text" name={props.parametros.Nombre + 'Unidades'} id={props.parametros.Nombre + 'Unidades'} onChange={handleUnidad} value={props.parametros.Unidades} />
            </td>
            <td><center><input type="checkbox" name={props.parametros.Nombre + 'Activo'} id={props.parametros.Nombre + 'Activo'} onChange={handleActivo} checked={props.parametros.Activo} value={props.parametros.Activo} /></center></td>
            <td><center><input type="checkbox" name={props.parametros.Nombre + 'VerInspector'} id={props.parametros.Nombre + 'VerInspector'} onChange={handleVerInspector} checked={props.parametros.VerInspector} value={props.parametros.VerInspector} /></center></td>
        </tr>
    );
};

export default CampoPrincipalPlantasTabla;