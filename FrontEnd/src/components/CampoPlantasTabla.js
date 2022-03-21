import React from 'react';

class CampoPlantasTabla extends React.Component {

    render() {

        function handleActivo(e) {
            console.log('Hola mundo!');
        };

        function handleVerInspector(e) {
            console.log('Ver inspector');
        }

        function handleUnidad(e) {
            console.log('Unidad');
        }
        
        function handleLimitInferior(e) {
            console.log('Limit inferior');
        }

        function handleLimitSuperior(e) {
            console.log('Limit superior');
        }

        return (
            <tr>
                <td>{this.props.nombre}</td>
                <td>{this.props.datos.Activo ? 
                    <input type="text" size="3" value={this.props.datos.LimInf} onChange={handleLimitInferior} /> : 
                    <input type="text" size="3" value={this.props.datos.LimInf} disabled />}</td>
                <td>{this.props.datos.Activo ?
                    <input type="text" size="3" value={this.props.datos.LimSup} onChange={handleLimitSuperior}  /> :
                    <input type="text" size="3" value={this.props.datos.LimSup} disabled />}</td>
                <td>
                {this.props.datos.Activo ? (
                    <select>
                        <option>-</option>
                    </select>
                ) : (
                <select disabled>
                        <option>-</option>
                    </select>
                )}
                </td>
                <td><input type="checkbox" checked={this.props.datos.Activo} onChange={handleActivo}/></td>
                <td>{this.props.datos.Activo ?
                    <input type="checkbox" checked={this.props.datos.VerInspector} onChange={handleVerInspector} /> :
                    <input type="checkbox" checked={this.props.datos.VerInspector} disabled />}</td>
            </tr>
        );
    }

};

export default CampoPlantasTabla;