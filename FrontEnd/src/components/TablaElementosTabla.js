import React from 'react';
import { TabPanel } from '@mui/lab';
import CampoPrincipalPlantasTabla from './CampoPrincipalPlantasTabla';
import CampoPersPlantasTabla from './CampoPersPlantasTabla';


class TablaElementosTabla extends React.Component {

    constructor(props) {
        super(props);

        const parametres = [
            'Comptador',
            'pH',
            'Temperatura',
            'Conductivitat',
            'AlcalinitatM',
            'AlcalinitatP',
            'DuresaCalcica',
        ]
    }

    render() {

        return (
            <TabPanel value={this.props.value.toString()}>
                <div className="col-1">
                    <h6>Campos principales</h6>
                    <hr/>
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
                            <CampoPrincipalPlantasTabla nombre="Comptador" datos={this.props.plantilla.Comptador} />
                            <CampoPrincipalPlantasTabla nombre="pH" datos={this.props.plantilla.PH} />
                            <CampoPrincipalPlantasTabla nombre="Temperatura" datos={this.props.plantilla.Temperatura} />
                            <CampoPrincipalPlantasTabla nombre="Conductivitat 25 ºC" datos={this.props.plantilla.Conductivitat} />
                            <CampoPrincipalPlantasTabla nombre="Alcalinitat M" datos={this.props.plantilla.AlcalinitatM} />
                            <CampoPrincipalPlantasTabla nombre="Alcalinitat P" datos={this.props.plantilla.AlcalinitatP} />
                            <CampoPrincipalPlantasTabla nombre="Duresa Càlcica" datos={this.props.plantilla.DuresaCalcica} />
                            <CampoPrincipalPlantasTabla nombre="Duresa Total" datos={this.props.plantilla.DuresaTotal} />
                            <CampoPrincipalPlantasTabla nombre="Terbolesa" datos={this.props.plantilla.Terbolesa} />
                            <CampoPrincipalPlantasTabla nombre="Fe" datos={this.props.plantilla.Fe} />
                            <CampoPrincipalPlantasTabla nombre="Clorurs" datos={this.props.plantilla.Clorurs} />
                            <CampoPrincipalPlantasTabla nombre="Sulfats" datos={this.props.plantilla.Sulfots} />
                            <CampoPrincipalPlantasTabla nombre="Clor Lliure" datos={this.props.plantilla.ClorLliure} />
                            <CampoPrincipalPlantasTabla nombre="Clor Total" datos={this.props.plantilla.ClorTotal} />
                            <CampoPrincipalPlantasTabla nombre="Brom" datos={this.props.plantilla.Brom} />
                            <CampoPrincipalPlantasTabla nombre="Sulfits (SO3)" datos={this.props.plantilla.Sulfits} />
                        </tbody>
                    </table>
                </div>
                <div className="col-2">
                    <h6>Campos personalizados</h6>
                    <hr/>
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
                            <CampoPersPlantasTabla nombre="Campo 1" datos={this.props.plantilla.Campo1} />
                            <CampoPersPlantasTabla nombre="Campo 2" datos={this.props.plantilla.Campo2} />
                            <CampoPersPlantasTabla nombre="Campo 3" datos={this.props.plantilla.Campo3} />
                            <CampoPersPlantasTabla nombre="Campo 4" datos={this.props.plantilla.Campo4} />
                            <CampoPersPlantasTabla nombre="Campo 5" datos={this.props.plantilla.Campo5} />
                            <CampoPersPlantasTabla nombre="Campo 6" datos={this.props.plantilla.Campo6} />
                            <CampoPersPlantasTabla nombre="Campo 7" datos={this.props.plantilla.Campo7} />
                            <CampoPersPlantasTabla nombre="Campo 8" datos={this.props.plantilla.Campo8} />
                            <CampoPersPlantasTabla nombre="Campo 9" datos={this.props.plantilla.Campo9} />
                            <CampoPersPlantasTabla nombre="Campo 10" datos={this.props.plantilla.Campo10} />
                            <CampoPersPlantasTabla nombre="Campo 11" datos={this.props.plantilla.Campo11} />
                            <CampoPersPlantasTabla nombre="Campo 12" datos={this.props.plantilla.Campo12} />
                        </tbody>
                    </table>
                </div>
                <div className="col-3">
                    <div className="ver-inspector">
                        <h6>Ver Inspector (todo)</h6>
                        <hr/>
                        <div className='opciones'>
                            <label><input type="checkbox" /> Si</label>
                            <label><input type="checkbox" /> No</label>
                        </div>
                    </div>
                    <div>
                        <h6>Legionela</h6>
                        <hr/>
                    </div>
                    <div>
                        <h6>Aerobio</h6>
                        <hr/>
                    </div>
                    <br/>
                    <div>
                        <button>Abrir plantilla</button><br/>
                        <button>Guardar como plantilla</button>
                    </div>
                </div>
            </TabPanel>
        );
    };

}

export default TablaElementosTabla;