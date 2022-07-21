import React, { useState, useEffect } from 'react';

const CampoPersPlantasTabla = (props) => {

    console.log(props)
    const [ state, setState ] = useState(props.datos);
    const nombreId = props.nombre.replace(/\s+/g, '');

    const [limitInferior, setLimitInferior] = useState([]);
    const [limitSuperior, setLimitSuperior] = useState([]);

    useEffect( () => {

        // Comprobamos si la casilla está marcada. Si lo está deshabilitamos los inputs
        if (state.Activo) {
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

        // Actualiza el valor en la variable
        this.setState({
            Nombre: e.target.value
        });

    }

    const handleActivo = (e) => {

        // Comprobamos si la casilla está marcada. Si lo está deshabilitamos los inputs
        if (e.target.checked) {
            document.getElementById(nombreId + 'Nombre').removeAttribute('disabled');
            document.getElementById(nombreId + 'LimInf').removeAttribute('disabled');
            document.getElementById(nombreId + 'LimSup').removeAttribute('disabled');
            document.getElementById(nombreId + 'Unidades').removeAttribute('disabled');
            document.getElementById(nombreId + 'Activo').setAttribute('checked', 'checked');
            document.getElementById(nombreId + 'VerInspector').removeAttribute('disabled');
            setState({ Activo: true });
        } else {
            document.getElementById(nombreId + 'Nombre').setAttribute('disabled', 'disabled');
            document.getElementById(nombreId + 'LimInf').setAttribute('disabled', 'disabled');
            document.getElementById(nombreId + 'LimSup').setAttribute('disabled', 'disabled');
            document.getElementById(nombreId + 'Unidades').setAttribute('disabled', 'disabled');
            document.getElementById(nombreId + 'Activo').removeAttribute('checked');
            document.getElementById(nombreId + 'VerInspector').setAttribute('disabled', 'disabled');
            setState({ Activo: false });
        }

    }

    const handleVerInspector = (e) => {

        // Actualiza el valor en la variable
        setState({
            VerInspector: e.target.checked
        });

    }

    const handleUnidad = (e) => {
        setState({
            Unidades: e.target.value
        })
    }

    const handleLimitInferior = (e) => {

        // Actualiza el valor en la variable
        setLimitInferior({
            LimInf: e.target.value
        });
        console.log(limitInferior)
    }

    const handleLimitSuperior = (e) => {

        // Actualiza el valor en la variable
        setLimitSuperior({
            LimSup: e.target.value
        })
        console.log(limitSuperior)
    }


    return (
        <tr>
            <td>{props.nombre}</td>
            <td><input type="text" name={nombreId + 'Nombre'} id={nombreId + 'Nombre'} value={state.Nombre} onChange={handleNombre} /></td>
            <td><input type="text" size="3" name={nombreId + 'LimInf'} id={nombreId + 'LimInf'} value={state.LimInf} onChange={handleLimitInferior} /></td>
            <td><input type="text" size="3" name={nombreId + 'LimSup'} id={nombreId + 'LimSup'} value={state.LimSup} onChange={handleLimitSuperior} /></td>
            <td>
                <select name={nombreId + 'Unidades'} id={nombreId + 'Unidades'} onChange={handleUnidad}>
                    <option value='m3'>m3</option>
                    <option value='Un. pH'>Un. pH</option>
                    <option value='ºC'>ºC</option>
                    <option value='mg/l'>mg/l</option>
                    <option value='mg/l CaCO3'>mg/l CaCO3</option>
                    <option value='N.T.U'>N.T.U</option>
                    <option value='µS/cm'>µS/cm</option>
                </select>
            </td>
            <td><center><input type="checkbox" name={nombreId + 'Activo'} id={nombreId + 'Activo'} onChange={handleActivo} checked={state.Activo} /></center></td>
            <td><center><input type="checkbox" name={nombreId + 'VerInspector'} id={nombreId + 'VerInspector'} checked={state.VerInspector} onChange={handleVerInspector} /></center></td>
        </tr>
    );
};

export default CampoPersPlantasTabla;