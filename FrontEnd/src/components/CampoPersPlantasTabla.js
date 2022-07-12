import React from 'react';

class CampoPersPlantasTabla extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.props.datos;
        this.nombreId = this.props.nombre.replace(/\s+/g, '');

        this.handleNombre = this.handleNombre.bind(this);
        this.handleActivo = this.handleActivo.bind(this);
        this.handleVerInspector = this.handleVerInspector.bind(this);
        this.handleUnidad = this.handleUnidad.bind(this);
        this.handleLimitInferior = this.handleLimitInferior.bind(this);
        this.handleLimitSuperior = this.handleLimitSuperior.bind(this);

    }

    componentDidMount() {

        // Comprobamos si la casilla está marcada. Si lo está deshabilitamos los inputs
        if(this.state.Activo) {
            document.getElementById(this.nombreId+'Nombre').removeAttribute('disabled');
            document.getElementById(this.nombreId+'LimInf').removeAttribute('disabled');
            document.getElementById(this.nombreId+'LimSup').removeAttribute('disabled');
            document.getElementById(this.nombreId+'Unidades').removeAttribute('disabled');
            document.getElementById(this.nombreId+'VerInspector').removeAttribute('disabled');
        } else {
            document.getElementById(this.nombreId+'Nombre').setAttribute('disabled','disabled');
            document.getElementById(this.nombreId+'LimInf').setAttribute('disabled','disabled');
            document.getElementById(this.nombreId+'LimSup').setAttribute('disabled','disabled');
            document.getElementById(this.nombreId+'Unidades').setAttribute('disabled','disabled');
            document.getElementById(this.nombreId+'VerInspector').setAttribute('disabled','disabled');
        }   

    }

    handleNombre(e) {

        // Actualiza el valor en la variable
        this.setState({
            Nombre: e.target.value
        });

    }

    handleActivo(e) {

        // Comprobamos si la casilla está marcada. Si lo está deshabilitamos los inputs
        if(e.target.checked) {
            document.getElementById(this.nombreId+'Nombre').removeAttribute('disabled');
            document.getElementById(this.nombreId+'LimInf').removeAttribute('disabled');
            document.getElementById(this.nombreId+'LimSup').removeAttribute('disabled');
            document.getElementById(this.nombreId+'Unidades').removeAttribute('disabled');
            document.getElementById(this.nombreId+'Activo').setAttribute('checked','checked');
            document.getElementById(this.nombreId+'VerInspector').removeAttribute('disabled');
            this.setState({Activo: true});
        } else {
            document.getElementById(this.nombreId+'Nombre').setAttribute('disabled','disabled');
            document.getElementById(this.nombreId+'LimInf').setAttribute('disabled','disabled');
            document.getElementById(this.nombreId+'LimSup').setAttribute('disabled','disabled');
            document.getElementById(this.nombreId+'Unidades').setAttribute('disabled','disabled');
            document.getElementById(this.nombreId+'Activo').removeAttribute('checked');
            document.getElementById(this.nombreId+'VerInspector').setAttribute('disabled','disabled');
            this.setState({Activo: false});
        }

    }

    handleVerInspector(e) {

        // Actualiza el valor en la variable
        this.setState({
            VerInspector: e.target.checked
        });

    }

    handleUnidad() {
        console.log('Unidad');
    }
    
    handleLimitInferior(e) {

        // Actualiza el valor en la variable
        this.setState({
            LimInf: e.target.value
        });

    }

    handleLimitSuperior(e) {
        
        // Actualiza el valor en la variable
        this.setState({
            LimSup: e.target.value
        })
    }

    render() {
        return (
            <tr>
                <td>{this.props.nombre}</td>
                <td><input type="text" name={this.nombreId+'Nombre'} id={this.nombreId+'Nombre'} value={this.state.Nombre} onChange={this.handleNombre} /></td>
                <td><input type="text" size="3" name={this.nombreId+'LimInf'} id={this.nombreId+'LimInf'} value={this.state.LimInf} onChange={this.handleLimitInferior} /></td>
                <td><input type="text" size="3" name={this.nombreId+'LimSup'} id={this.nombreId+'LimSup'} value={this.state.LimSup} onChange={this.handleLimitSuperior}  /></td>
                <td>
                    <select name={this.nombreId+'Unidades'} id={this.nombreId+'Unidades'}>
                        <option value='m3'>m3</option>
                        <option value='Un. pH'>Un. pH</option>
                        <option value='ºC'>ºC</option>
                        <option value='mg/l'>mg/l</option>
                        <option value='mg/l CaCO3'>mg/l CaCO3</option>
                        <option value='N.T.U'>N.T.U</option>
                        <option value='µS/cm'>µS/cm</option>
                    </select>
                </td>
                <td><center><input type="checkbox" name={this.nombreId+'Activo'} id={this.nombreId+'Activo'} onChange={this.handleActivo} checked={this.state.Activo} /></center></td>
                <td><center><input type="checkbox" name={this.nombreId+'VerInspector'} id={this.nombreId+'VerInspector'} checked={this.state.VerInspector} onChange={this.handleVerInspector} /></center></td>
            </tr>
        );
    }

};

export default CampoPersPlantasTabla;