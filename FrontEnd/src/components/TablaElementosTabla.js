import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { TabPanel } from '@mui/lab';
import { ThemeContext } from '../App';

import CampoPrincipalPlantasTabla from './CampoPrincipalPlantasTabla';
import CampoPersPlantasTabla from './CampoPersPlantasTabla';

import './TablaElementosTabla.css';
import { ThreeSixty } from '@material-ui/icons';


const TablaElementosTabla = (props) => {

    // Obtenemos los datos del usuario actual
    const usuario = JSON.parse(localStorage.getItem('UsuarioActual'));

    const { valores } = useContext(ThemeContext);

    const [ parametrosSeleccionado, setParametrosSeleccionado ] = useState([])

    // Variables para la generación de los parametros activos
    let filaElementoActivo = [];
    let filasElementosActivos = [];

    /* MÉTODOS DE LA CLASE */

    const [state, setState] = useState({
        parametros: [
            {
                nombre: 'Contador',
                nombreInt: 'Comptador'
            },
            {
                nombre: 'pH',
                nombreInt: 'PH'
            },
            {
                nombre: 'Temperatura',
                nombreInt: 'Temperatura'
            },
            {
                nombre: 'Conductivitat',
                nombreInt: 'Conductivitat'
            },
            {
                nombre: 'TDS',
                nombreInt: 'TDS'
            },
            {
                nombre: 'Alcalinidad "M"',
                nombreInt: 'AlcalinitatM'
            },
            {
                nombre: 'Alcalinidad "P"',
                nombreInt: 'AlcalinitatP'
            },
            {
                nombre: 'Dureza Calcica',
                nombreInt: 'DuresaCalcica'
            },
            {
                nombre: 'Dureza Total',
                nombreInt: 'DuresaTotal'
            },
            {
                nombre: 'Turbidez',
                nombreInt: 'Terbolesa'
            },
            {
                nombre: 'Fe',
                nombreInt: 'Fe'
            },
            {
                nombre: 'Cloruros',
                nombreInt: 'Clorurs'
            },
            {
                nombre: 'Sulfatos',
                nombreInt: 'Sulfats'
            },
            {
                nombre: 'Silicats',
                nombreInt: 'Silicats'
            },
            {
                nombre: 'Cloro Libre',
                nombreInt: 'ClorLliure'
            },
            {
                nombre: 'Cloro Total',
                nombreInt: 'ClorTotal'
            },
            {
                nombre: 'Bromo',
                nombreInt: 'Brom'
            },
            {
                nombre: 'Sulfitos (SO3)',
                nombreInt: 'Sulfits'
            },
            {
                nombre: 'Ortofosfats (PO4)',
                nombreInt: 'Ortofosfats'
            },
            {
                nombre: 'MoO4',
                nombreInt: 'Mo'
            },
            {
                nombre: 'Isotiazolona',
                nombreInt: 'Isotiazolona'
            },
            {
                nombre: 'AquaproxAB5310',
                nombreInt: 'AquaproxAB5310'
            },
            {
                nombre: 'BiopolLB5',
                nombreInt: 'BiopolLB5'
            },
            {
                nombre: 'MefacideLG',
                nombreInt: 'MefacideLG'
            },
            {
                nombre: 'BiopolIB200',
                nombreInt: 'BiopolIB200'
            }
        ],
        plantilla: props.plantilla,
    })

    // Función que se encarga de generar la tabla solamente con los elementos activos
    const cargarParametrosTabla = () => {

        // Creamos la cabecera de la tabla de elementos activos
        filaElementoActivo.push(React.createElement('th', {}, 'Nombre'));
        filaElementoActivo.push(React.createElement('th', {}, 'Valor'));
        filaElementoActivo.push(React.createElement('th', {}, 'Unidad'));
        filasElementosActivos.push(React.createElement('tr', {}, filaElementoActivo));
        filaElementoActivo = [];

        // Recorremos toda la lista de parámetros principales para buscar los activos
        state.parametros.forEach((element) => {
            if (state.plantilla[element.nombreInt].Activo) {
                filaElementoActivo.push(React.createElement('td', {}, element.nombre));
                filaElementoActivo.push(React.createElement('td', {}, React.createElement('input', { type: 'text', size: '3' }, null)));
                filaElementoActivo.push(React.createElement('td', {}, state.plantilla[element.nombreInt].Unidades));
                filasElementosActivos.push(React.createElement('tr', {}, filaElementoActivo));
                filaElementoActivo = [];
            }
        })

        // Pintamos los elementos activos en la tabla activa
        if (document.getElementById('tabla-' + props.value.toString())) {
            ReactDOM.render(filasElementosActivos, document.getElementById('tabla-' + props.value.toString()));
        }

    }

    const handleVerInspector = (e) => {

        let radioButtons = document.getElementsByName('verInspector');
        let valor = false;

        // Obtenemos el valor del radio button
        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                valor = (radioButtons[i].value === 'true');
            }
        }

        // Recorremos todos los parametros
        state.parametros.forEach(element => {

            // Cambiamos el check de ver inspector según el caso
            if (valor) {
                state.plantilla[element.nombreInt].VerInspector = true;
            } else {
                state.plantilla[element.nombreInt].VerInspector = false;
            }

        });

        // Finalmente actualizamos el estado para renderizar
        setState({
            plantilla: state.plantilla
        })

    }

    const handleChange = (e) => {
        console.log(e.target)
    }

    useEffect(() => {
        cargarParametrosTabla();
        filasElementosActivos = [];
    })

    const tablaAdministrador = (
        <>
            <div className="col-1">
                <h6>Parametrizacion</h6>
                <hr />
                <table>
                    <tbody>
                        <tr>
                            <th>Nombre</th>
                            <th>Lim. Min.</th>
                            <th>Lim. Max.</th>
                            <th>Unidades</th>
                            <th><center>Activar</center></th>
                            <th><center>Ver Insp.</center></th>
                        </tr>
                        <CampoPrincipalPlantasTabla key="1" name="comptador" nombre="Comptador" datos={state.plantilla.Comptador} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                        <CampoPrincipalPlantasTabla key="2" name="ph" nombre="pH" datos={state.plantilla.PH} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                        <CampoPrincipalPlantasTabla key="3" name="temperatura" nombre="Temperatura" datos={state.plantilla.Temperatura} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                        <CampoPrincipalPlantasTabla key="4" name="conductivitat" nombre="Conductivitat" datos={state.plantilla.Conductivitat} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                        <CampoPrincipalPlantasTabla key="5" name="TDS" nombre="TDS" datos={state.plantilla.TDS} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                        <CampoPrincipalPlantasTabla key="6" name="alcalinitatM" nombre="AlcalinitatM" datos={state.plantilla.AlcalinitatM} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                        <CampoPrincipalPlantasTabla key="7" name="alcalinitatP" nombre="AlcalinitatP" datos={state.plantilla.AlcalinitatP} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                        <CampoPrincipalPlantasTabla key="8" name="duresaCalcica" nombre="DuresaCalcica" datos={state.plantilla.DuresaCalcica} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                        <CampoPrincipalPlantasTabla key="9" name="duresaTotal" nombre="DuresaTotal" datos={state.plantilla.DuresaTotal} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                        <CampoPrincipalPlantasTabla key="10" name="terbolesa" nombre="Terbolesa" datos={state.plantilla.Terbolesa} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                        <CampoPrincipalPlantasTabla key="11" name="fe" nombre="Fe" datos={state.plantilla.Fe} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                        <CampoPrincipalPlantasTabla key="12" name="clorurs" nombre="Clorurs" datos={state.plantilla.Clorurs} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                        <CampoPrincipalPlantasTabla key="13" name="sulfats" nombre="Sulfats" datos={state.plantilla.Sulfats} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                        <CampoPrincipalPlantasTabla key="14" name="silicats" nombre="Silicats" datos={state.plantilla.Silicats} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                        <CampoPrincipalPlantasTabla key="15" name="clorLliure" nombre="ClorLliure" datos={state.plantilla.ClorLliure} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                        <CampoPrincipalPlantasTabla key="16" name="clorTotal" nombre="ClorTotal" datos={state.plantilla.ClorTotal} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                        <CampoPrincipalPlantasTabla key="17" name="brom" nombre="Brom" datos={state.plantilla.Brom} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                        <CampoPrincipalPlantasTabla key="18" name="sulfits" nombre="Sulfits" datos={state.plantilla.Sulfits} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                    </tbody>
                </table>
            </div>
            <div className="col-2">
                <br />
                <hr />
                <tbody>
                    <tr>
                        <th>Nombre</th>
                        <th>Lim. Min.</th>
                        <th>Lim. Max.</th>
                        <th>Unidades</th>
                        <th><center>Activar</center></th>
                        <th><center>Ver Insp.</center></th>
                    </tr>
                    <CampoPrincipalPlantasTabla key="19" name="ortofosfats" nombre="OrtofosfatsPO4" datos={state.plantilla.Ortofosfats} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                    <CampoPrincipalPlantasTabla key="20" name="mo" nombre="MoO4" datos={state.plantilla.Mo} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                    <CampoPrincipalPlantasTabla key="21" name="isotiazolona" nombre="Isotiazolona" datos={state.plantilla.Isotiazolona} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                    <CampoPrincipalPlantasTabla key="22" name="aquaproxAB5310" nombre="AquaproxAB5310" datos={state.plantilla.AquaproxAB5310} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                    <CampoPrincipalPlantasTabla key="23" name="biopolLB5" nombre="BiopolLB5" datos={state.plantilla.BiopolLB5} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                    <CampoPrincipalPlantasTabla key="24" name="mefacideLG" nombre="MefacideLG" datos={state.plantilla.MefacideLG} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                    <CampoPrincipalPlantasTabla key="25" name="biopolIB200" nombre="BiopolIB200" datos={state.plantilla.BiopolIB200} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                </tbody>
                <br />
                <h6> Campos personalizados </h6>
                <hr />
                <table>
                    <tbody>
                        <tr>
                            <th>&nbsp;</th>
                            <th>Nombre</th>
                            <th>Lim. Min.</th>
                            <th>Lim. Max.</th>
                            <th>Unidades</th>
                            <th><center>Activar</center></th>
                            <th><center>Ver Insp.</center></th>
                        </tr>
                        <CampoPersPlantasTabla key="1" name="campo1" nombre="Campo1" datos={state.plantilla.Campo1} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                        <CampoPersPlantasTabla key="2" name="campo2" nombre="Campo2" datos={state.plantilla.Campo2} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                        <CampoPersPlantasTabla key="3" name="campo3" nombre="Campo3" datos={state.plantilla.Campo3} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                        <CampoPersPlantasTabla key="4" name="campo4" nombre="Campo4" datos={state.plantilla.Campo4} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                        <CampoPersPlantasTabla key="5" name="campo5" nombre="Campo5" datos={state.plantilla.Campo5} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                        <CampoPersPlantasTabla key="6" name="campo6" nombre="Campo6" datos={state.plantilla.Campo6} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                        <CampoPersPlantasTabla key="7" name="campo7" nombre="Campo7" datos={state.plantilla.Campo7} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                        <CampoPersPlantasTabla key="8" name="campo8" nombre="Campo8" datos={state.plantilla.Campo8} setParametrosSeleccionado={props.setParametrosSeleccionado} />
                    </tbody>
                </table>
            </div>
            <div className="col-3">
                <div className="ver-inspector">
                    <h6>Ver Inspector (todo)</h6>
                    <hr />
                    <div className='opciones'>
                        <label><input type="radio" name="verInspector" value='true' onChange={handleVerInspector} /> Si</label>
                        <label><input type="radio" name="verInspector" value='false' onChange={handleVerInspector} /> No</label>
                    </div>
                </div>
                <div>
                    {/* Mostrar datos que he introducido en la parametrizacion*/}

                </div>
            </div>
        </>
    );

    const tablaTecnico = (
        <>
            <table className="tabla-tecnico">
                <tbody id={'tabla-' + props.value.toString()}>
                </tbody>
            </table>
        </>
    );


    return (
        <TabPanel value={props.value.toString()}>
            {usuario.idPerfil == 1 ? tablaAdministrador : tablaTecnico}
        </TabPanel>
    );


}

export default TablaElementosTabla;