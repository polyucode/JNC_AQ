import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// import { TabPanel } from '@mui/lab';

import CampoPrincipalPlantasTabla from './CampoPrincipalPlantasTabla';
import CampoPersPlantasTabla from './CampoPersPlantasTabla';

import './TablaElementosTabla.css';
import { ThreeSixty } from '@material-ui/icons';


class TablaElementosTabla extends React.Component {

    // Obtenemos los datos del usuario actual
    usuario = JSON.parse(localStorage.getItem('UsuarioActual'));

    // Lista de los parametros principales

    // Variables para la generación de los parametros activos
    filaElementoActivo = [];
    filasElementosActivos = [];

    /* MÉTODOS DE LA CLASE */

    constructor(props) {
        super(props);

        if( this.usuario === null ) this.usuario = { idPerfil: 0 }

        this.state = {
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
                    nombre: 'Conductividad 25 ºC',
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
                    nombre: 'Dureza Cálcica',
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
                }
            ],
            plantilla: this.props.plantilla,
        }

        this.handleVerInspector = this.handleVerInspector.bind(this);

    }

    // Función que se encarga de generar la tabla solamente con los elementos activos
    cargarParametrosTabla() {

        // Creamos la cabecera de la tabla de elementos activos
        this.filaElementoActivo.push(React.createElement('th', {}, 'Nombre'));
        this.filaElementoActivo.push(React.createElement('th', {}, 'Valor'));
        this.filaElementoActivo.push(React.createElement('th', {}, 'Unidad'));
        this.filasElementosActivos.push(React.createElement('tr', {}, this.filaElementoActivo));
        this.filaElementoActivo = [];

        // Recorremos toda la lista de parámetros principales para buscar los activos
        this.state.parametros.forEach((element) => {
            if (this.state.plantilla[element.nombreInt].Activo) {
                this.filaElementoActivo.push(React.createElement('td', {}, element.nombre));
                this.filaElementoActivo.push(React.createElement('td', {}, React.createElement('input', { type: 'text', size: '3' }, null)));
                this.filaElementoActivo.push(React.createElement('td', {}, this.state.plantilla[element.nombreInt].Unidades));
                this.filasElementosActivos.push(React.createElement('tr', {}, this.filaElementoActivo));
                this.filaElementoActivo = [];
            }
        })

        // Pintamos los elementos activos en la tabla activa
        if (document.getElementById('tabla-' + this.props.value.toString())) {
            ReactDOM.render(this.filasElementosActivos, document.getElementById('tabla-' + this.props.value.toString()));
        }

    }

    handleVerInspector(e) {

        let radioButtons = document.getElementsByName('verInspector');
        let valor = false;

        // Obtenemos el valor del radio button
        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                valor = (radioButtons[i].value === 'true');
            }
        }

        // Recorremos todos los parametros
        this.state.parametros.forEach(element => {

            // Cambiamos el check de ver inspector según el caso
            if (valor) {
                this.state.plantilla[element.nombreInt].VerInspector = true;
            } else {
                this.state.plantilla[element.nombreInt].VerInspector = false;
            }

        });

        // Finalmente actualizamos el estado para renderizar
        this.setState({
            plantilla: this.state.plantilla
        })

    }

    componentDidMount() {

        this.cargarParametrosTabla();

    }

    componentDidUpdate() {

        this.filasElementosActivos = [];
        this.cargarParametrosTabla();

    }

    render() {

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
                            <CampoPrincipalPlantasTabla key="1" nombre="Comptador" datos={this.state.plantilla.Comptador} />
                            <CampoPrincipalPlantasTabla key="2" nombre="pH" datos={this.state.plantilla.PH} />
                            <CampoPrincipalPlantasTabla key="3" nombre="Temperatura" datos={this.state.plantilla.Temperatura} />
                            <CampoPrincipalPlantasTabla key="4" nombre="Conductivitat 25 ºC" datos={this.state.plantilla.Conductivitat} />
                            <CampoPrincipalPlantasTabla key="5" nombre="TDS" datos={this.state.plantilla.TDS} />
                            <CampoPrincipalPlantasTabla key="6" nombre="Alcalinitat M" datos={this.state.plantilla.AlcalinitatM} />
                            <CampoPrincipalPlantasTabla key="7" nombre="Alcalinitat P" datos={this.state.plantilla.AlcalinitatP} />
                            <CampoPrincipalPlantasTabla key="8" nombre="Duresa Càlcica" datos={this.state.plantilla.DuresaCalcica} />
                            <CampoPrincipalPlantasTabla key="9" nombre="Duresa Total" datos={this.state.plantilla.DuresaTotal} />
                            <CampoPrincipalPlantasTabla key="10" nombre="Terbolesa" datos={this.state.plantilla.Terbolesa} />
                            <CampoPrincipalPlantasTabla key="11" nombre="Fe" datos={this.state.plantilla.Fe} />
                            <CampoPrincipalPlantasTabla key="12" nombre="Clorurs" datos={this.state.plantilla.Clorurs} />
                            <CampoPrincipalPlantasTabla key="13" nombre="Sulfats" datos={this.state.plantilla.Sulfats} />
                            <CampoPrincipalPlantasTabla key="14" nombre="Silicats" datos={this.state.plantilla.Silicats} />
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
                            <CampoPrincipalPlantasTabla key="15" nombre="Clor Lliure" datos={this.state.plantilla.ClorLliure} />
                            <CampoPrincipalPlantasTabla key="16" nombre="Clor Total" datos={this.state.plantilla.ClorTotal} />
                            <CampoPrincipalPlantasTabla key="17" nombre="Brom" datos={this.state.plantilla.Brom} />
                            <CampoPrincipalPlantasTabla key="18" nombre="Sulfits (SO3)" datos={this.state.plantilla.Sulfits} />
                            <CampoPrincipalPlantasTabla key="19" nombre="Ortofosfats (PO4)" datos={this.state.plantilla.Ortofosfats} />
                            <CampoPrincipalPlantasTabla key="20" nombre="MoO4" datos={this.state.plantilla.Mo} />
                            <CampoPrincipalPlantasTabla key="21" nombre="Isotiazolona" datos={this.state.plantilla.Isotiazolona} />                       
                    </tbody>
                    <br/>
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
                            <CampoPersPlantasTabla key="1" nombre="Campo 1" datos={this.state.plantilla.Campo1} />
                            <CampoPersPlantasTabla key="2" nombre="Campo 2" datos={this.state.plantilla.Campo2} />
                            <CampoPersPlantasTabla key="3" nombre="Campo 3" datos={this.state.plantilla.Campo3} />
                            <CampoPersPlantasTabla key="4" nombre="Campo 4" datos={this.state.plantilla.Campo4} />
                            <CampoPersPlantasTabla key="5" nombre="Campo 5" datos={this.state.plantilla.Campo5} />
                        </tbody>
                    </table>
                </div>
                <div className="col-3">
                    <div className="ver-inspector">
                        <h6>Ver Inspector (todo)</h6>
                        <hr />
                        <div className='opciones'>
                            <label><input type="radio" name="verInspector" value='true' onChange={this.handleVerInspector} /> Si</label>
                            <label><input type="radio" name="verInspector" value='false' onChange={this.handleVerInspector} /> No</label>
                        </div>
                    </div>
                    <div>
                        <h6>Legionela</h6>
                        <hr />
                    </div>
                    <div>
                        <h6>Aerobio</h6>
                        <hr />
                    </div>
                    <br />
                    <div>
                        <button>Abrir plantilla</button><br />
                        <button>Guardar como plantilla</button>
                    </div>
                </div>
            </>
        );

        const tablaTecnico = (
            <>
                <table className="tabla-tecnico">
                    <tbody id={'tabla-' + this.props.value.toString()}>
                    </tbody>
                </table>
            </>
        );

        return (
            <p>Prueba</p>
            // <TabPanel value={this.props.value.toString()}>
            //     {this.usuario.idPerfil == 1 ? tablaAdministrador : tablaTecnico}
            // </TabPanel>
        );
    };

}

export default TablaElementosTabla;