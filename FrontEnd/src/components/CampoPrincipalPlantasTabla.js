import React from 'react';

class CampoPrincipalPlantasTabla extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = this.props.datos;

        this.handleActivo = this.handleActivo.bind(this);
        this.handleVerInspector = this.handleVerInspector.bind(this);
        this.handleUnidad = this.handleUnidad.bind(this);
        this.handleLimitInferior = this.handleLimitInferior.bind(this);
        this.handleLimitSuperior = this.handleLimitSuperior.bind(this);

    }

    componentDidMount() {

        // Comprobamos si la casilla está marcada. Si lo está deshabilitamos los inputs
        if(this.state.Activo) {
            document.getElementById(this.props.nombre+'-limit-inf').removeAttribute('disabled');
            document.getElementById(this.props.nombre+'-limit-sup').removeAttribute('disabled');
            document.getElementById(this.props.nombre+'-unidades').removeAttribute('disabled');
            document.getElementById(this.props.nombre+'-ver-insp').removeAttribute('disabled');
        } else {
            document.getElementById(this.props.nombre+'-limit-inf').setAttribute('disabled','disabled');
            document.getElementById(this.props.nombre+'-limit-sup').setAttribute('disabled','disabled');
            document.getElementById(this.props.nombre+'-unidades').setAttribute('disabled','disabled');
            document.getElementById(this.props.nombre+'-ver-insp').setAttribute('disabled','disabled');
        }   

    }

    handleActivo(e) {

        // Comprobamos si la casilla está marcada. Si no lo está deshabilitamos los inputs
        if(e.target.checked) {
            document.getElementById(this.props.nombre+'-limit-inf').removeAttribute('disabled');
            document.getElementById(this.props.nombre+'-limit-sup').removeAttribute('disabled');
            document.getElementById(this.props.nombre+'-unidades').removeAttribute('disabled');
            document.getElementById(this.props.nombre+'-ver-insp').removeAttribute('disabled');

            document.getElementById(this.props.nombre+'-activo').setAttribute('checked','checked');
            this.setState({Activo: true});
        } else {
            document.getElementById(this.props.nombre+'-limit-inf').setAttribute('disabled','disabled');
            document.getElementById(this.props.nombre+'-limit-sup').setAttribute('disabled','disabled');
            document.getElementById(this.props.nombre+'-unidades').setAttribute('disabled','disabled');
            document.getElementById(this.props.nombre+'-ver-insp').setAttribute('disabled','disabled');

            document.getElementById(this.props.nombre+'-activo').removeAttribute('checked');
            this.setState({Activo: false});
        }   
    };

    handleVerInspector(e) {
        // Actualiza el valor en la variable
        this.setState({
            VerInspector: e.target.checked
        });

    }

    handleUnidad(e) {
        this.setState({
            Unidades: e.target.value
        })
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
                <td><input type="text" size="3" id={this.props.nombre+'-limit-inf'} value={this.state.LimInf} onChange={this.handleLimitInferior} /></td>
                <td><input type="text" size="3" id={this.props.nombre+'-limit-sup'} value={this.state.LimSup} onChange={this.handleLimitSuperior}  /></td>
                <td>
                    <select id={this.props.nombre+'-unidades'} onChange={this.handleUnidad} value={this.state.Unidades}>
                        <option value='m3'>m3</option>
                        <option value='Un. pH'>Un. pH</option>
                        <option value='ºC'>ºC</option>
                        <option value='mg/l'>mg/l</option>
                        <option value='mg/l CaCO3'>mg/l CaCO3</option>
                        <option value='N.T.U'>N.T.U</option>
                        <option value='µS/cm'>µS/cm</option>
                    </select>
                </td>
                <td><center><input type="checkbox" id={this.props.nombre+'-activo'} onChange={this.handleActivo} checked={this.state.Activo} /></center></td>
                <td><center><input type="checkbox" id={this.props.nombre+'-ver-insp'} checked={this.state.VerInspector} onChange={this.handleVerInspector} /></center></td>
            </tr>
        );
    }

};

export default CampoPrincipalPlantasTabla;