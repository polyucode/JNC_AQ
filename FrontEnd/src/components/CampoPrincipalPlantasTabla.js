import React, { useState, useEffect } from 'react';

const CampoPrincipalPlantasTabla = (props) => {

    console.log(props)
    const [state, setState] = useState(props.datos);

    const [limitInferior, setLimitInferior] = useState([]);
    const [limitSuperior, setLimitSuperior] = useState([]);
    const [unidades, setUnidades] = useState([]);
    const [verInspector, setVerInspector] = useState([]);


    useEffect(() => {

        // Comprobamos si la casilla está marcada. Si lo está deshabilitamos los inputs
        if (state.Activo) {
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

        // Comprobamos si la casilla está marcada. Si lo está deshabilitamos los inputs
        if (e.target.checked) {
            document.getElementById(props.nombre + 'LimInf').removeAttribute('disabled');
            document.getElementById(props.nombre + 'LimSup').removeAttribute('disabled');
            document.getElementById(props.nombre + 'Unidades').removeAttribute('disabled');
            document.getElementById(props.nombre + 'Activo').setAttribute('checked', 'checked');
            document.getElementById(props.nombre + 'VerInspector').removeAttribute('disabled');
            setState({ Activo: true });
        } else {
            document.getElementById(props.nombre + 'LimInf').setAttribute('disabled', 'disabled');
            document.getElementById(props.nombre + 'LimSup').setAttribute('disabled', 'disabled');
            document.getElementById(props.nombre + 'Unidades').setAttribute('disabled', 'disabled');
            document.getElementById(props.nombre + 'Activo').removeAttribute('checked');
            document.getElementById(props.nombre + 'VerInspector').setAttribute('disabled', 'disabled');
            setState({ Activo: false });
        }

    }

    const handleVerInspector = (e) => {

        // Actualiza el valor en la variable
        setVerInspector({
            VerInspector: e.target.checked
        });

    }

    const handleUnidad = (e) => {
        setState({
            Unidades: e.target.value
        })
    }

    const handleLimitInferior = (e) => {
        const { name, value } = e.target
        // Actualiza el valor en la variable
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(state)
    }

    const handleLimitSuperior = (e) => {

        // Actualiza el valor en la variable
        setState({
            LimSup: e.target.value
        })
        console.log(limitSuperior)
    }


    return (
        <tr>
            <td>{props.nombre}</td>
            <td><input type="text" size="3" name={props.nombre + 'LimInf'} id={props.nombre + 'LimInf'} value={state.LimInf} onChange={handleLimitInferior} /></td>
            <td><input type="text" size="3" name={props.nombre + 'LimSup'} id={props.nombre + 'LimSup'} value={state.LimSup} onChange={handleLimitSuperior} /></td>
            <td>
                <select name={props.nombre + 'Unidades'} id={props.nombre + 'Unidades'} onChange={handleUnidad} value={state.Unidades}>
                    <option value='m3'>m3</option>
                    <option value='Un. pH'>Un. pH</option>
                    <option value='ºC'>ºC</option>
                    <option value='mg/l'>mg/l</option>
                    <option value='mg/l CaCO3'>mg/l CaCO3</option>
                    <option value='N.T.U'>N.T.U</option>
                    <option value='µS/cm'>µS/cm</option>
                </select>
            </td>
            <td><center><input type="checkbox" name={props.nombre + 'Activo'} id={props.nombre + 'Activo'} onChange={handleActivo} checked={state.Activo} /></center></td>
            <td><center><input type="checkbox" name={props.nombre + 'VerInspector'} id={props.nombre + 'VerInspector'} checked={state.VerInspector} onChange={handleVerInspector} /></center></td>
        </tr>
    );
};

export default CampoPrincipalPlantasTabla;