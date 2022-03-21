import React from 'react';
import { TabPanel } from '@mui/lab';
import CampoPlantasTabla from './CampoPlantasTabla';


class TablaElementosTabla extends React.Component {

    render() {

        return (
            <TabPanel value={this.props.value.toString()}>
                <div className="col-1">
                    <h3>Campos principales - {this.props.nombre}</h3>
                    <hr/>
                    <table>
                        <tbody>
                            <tr>
                                <th>Nombre</th>
                                <th>Lim. Min.</th>
                                <th>Lim. Max.</th>
                                <th>Unidades</th>
                                <th>Activar</th>
                                <th>Ver Insp.</th>
                            </tr>
                            <CampoPlantasTabla nombre="Comptador" datos={this.props.plantilla.Comptador} />
                            <CampoPlantasTabla nombre="pH" datos={this.props.plantilla.PH} />
                            <CampoPlantasTabla nombre="Temperatura" datos={this.props.plantilla.Temperatura} />
                            <CampoPlantasTabla nombre="Conductivitat 25 ºC" datos={this.props.plantilla.Conductivitat} />

                            <tr>
                                <td>TDS</td>
                                <td><input type="text" size="3" /></td>
                                <td><input type="text" size="3" /></td>
                                <td>
                                    <select>
                                        <option>mg/l</option>
                                    </select>
                                </td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                            </tr>

                            <CampoPlantasTabla nombre="Alcalinitat M" datos={this.props.plantilla.AlcalinitatM} />
                            <CampoPlantasTabla nombre="Duresa Càlcica" datos={this.props.plantilla.DuresaCalcica} />
                            <CampoPlantasTabla nombre="Duresa Total" datos={this.props.plantilla.DuresaTotal} />
                            <CampoPlantasTabla nombre="Terbolesa" datos={this.props.plantilla.Terbolesa} />
                            <CampoPlantasTabla nombre="Fe" datos={this.props.plantilla.Fe} />
                            <CampoPlantasTabla nombre="Clorurs" datos={this.props.plantilla.Clorurs} />
                            <CampoPlantasTabla nombre="Sulfats" datos={this.props.plantilla.Sulfots} />
                            <CampoPlantasTabla nombre="Clor Lliure" datos={this.props.plantilla.ClorLliure} />
                            <CampoPlantasTabla nombre="Clor Total" datos={this.props.plantilla.ClorTotal} />
                            <CampoPlantasTabla nombre="Brom" datos={this.props.plantilla.Brom} />
                            <CampoPlantasTabla nombre="Sulfits (SO3)" datos={this.props.plantilla.Sulfits} />
                        </tbody>
                    </table>
                </div>
                <div className="col-2">
                    <h3>Campos personalizados</h3>
                    <hr/>
                    <table>
                        <tbody>
                            <tr>
                                <th>&nbsp;</th>
                                <th>Nombre</th>
                                <th>Lim. Min.</th>
                                <th>Lim. Max.</th>
                                <th>Unidades</th>
                                <th>Activar</th>
                                <th>Ver Insp.</th>
                            </tr>
                            <tr>
                                <td>Campo 1</td>
                                <td><input type="text" /></td>
                                <td><input type="text" size="3" /></td>
                                <td><input type="text" size="3" /></td>
                                <td>
                                    <select>
                                        <option>m3</option>
                                    </select>
                                </td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                            </tr>
                            <tr>
                                <td>Campo 2</td>
                                <td><input type="text" /></td>
                                <td><input type="text" size="3" /></td>
                                <td><input type="text" size="3" /></td>
                                <td>
                                    <select>
                                        <option>m3</option>
                                    </select>
                                </td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                            </tr>
                            <tr>
                                <td>Campo 3</td>
                                <td><input type="text" /></td>
                                <td><input type="text" size="3" /></td>
                                <td><input type="text" size="3" /></td>
                                <td>
                                    <select>
                                        <option>m3</option>
                                    </select>
                                </td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                            </tr>
                            <tr>
                                <td>Campo 4</td>
                                <td><input type="text" /></td>
                                <td><input type="text" size="3" /></td>
                                <td><input type="text" size="3" /></td>
                                <td>
                                    <select>
                                        <option>m3</option>
                                    </select>
                                </td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                            </tr>
                            <tr>
                                <td>Campo 5</td>
                                <td><input type="text" /></td>
                                <td><input type="text" size="3" /></td>
                                <td><input type="text" size="3" /></td>
                                <td>
                                    <select>
                                        <option>m3</option>
                                    </select>
                                </td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                            </tr>
                            <tr>
                                <td>Campo 6</td>
                                <td><input type="text" /></td>
                                <td><input type="text" size="3" /></td>
                                <td><input type="text" size="3" /></td>
                                <td>
                                    <select>
                                        <option>m3</option>
                                    </select>
                                </td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                            </tr>
                            <tr>
                                <td>Campo 7</td>
                                <td><input type="text" /></td>
                                <td><input type="text" size="3" /></td>
                                <td><input type="text" size="3" /></td>
                                <td>
                                    <select>
                                        <option>m3</option>
                                    </select>
                                </td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                            </tr>
                            <tr>
                                <td>Campo 8</td>
                                <td><input type="text" /></td>
                                <td><input type="text" size="3" /></td>
                                <td><input type="text" size="3" /></td>
                                <td>
                                    <select>
                                        <option>m3</option>
                                    </select>
                                </td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                            </tr>
                            <tr>
                                <td>Campo 9</td>
                                <td><input type="text" /></td>
                                <td><input type="text" size="3" /></td>
                                <td><input type="text" size="3" /></td>
                                <td>
                                    <select>
                                        <option>m3</option>
                                    </select>
                                </td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                            </tr>
                            <tr>
                                <td>Campo 10</td>
                                <td><input type="text" /></td>
                                <td><input type="text" size="3" /></td>
                                <td><input type="text" size="3" /></td>
                                <td>
                                    <select>
                                        <option>m3</option>
                                    </select>
                                </td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                            </tr>
                            <tr>
                                <td>Campo 11</td>
                                <td><input type="text" /></td>
                                <td><input type="text" size="3" /></td>
                                <td><input type="text" size="3" /></td>
                                <td>
                                    <select>
                                        <option>m3</option>
                                    </select>
                                </td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                            </tr>
                            <tr>
                                <td>Campo 12</td>
                                <td><input type="text" /></td>
                                <td><input type="text" size="3" /></td>
                                <td><input type="text" size="3" /></td>
                                <td>
                                    <select>
                                        <option>m3</option>
                                    </select>
                                </td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-3">
                    <div className="ver-inspector">
                        <h3>Ver Inspector (todo)</h3>
                        <hr/>
                        <label><input type="checkbox" /> Si</label>
                        <label><input type="checkbox" /> No</label>
                    </div>
                    <div>
                        <h3>Legionela</h3>
                        <hr/>
                    </div>
                    <div>
                        <h3>Aerobio</h3>
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