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
            document.getElementById(this.nombreId+'-nombre').removeAttribute('disabled');
            document.getElementById(this.nombreId+'-limit-inf').removeAttribute('disabled');
            document.getElementById(this.nombreId+'-limit-sup').removeAttribute('disabled');
            document.getElementById(this.nombreId+'-unidades').removeAttribute('disabled');
            document.getElementById(this.nombreId+'-ver-insp').removeAttribute('disabled');
        } else {
            document.getElementById(this.nombreId+'-nombre').setAttribute('disabled','disabled');
            document.getElementById(this.nombreId+'-limit-inf').setAttribute('disabled','disabled');
            document.getElementById(this.nombreId+'-limit-sup').setAttribute('disabled','disabled');
            document.getElementById(this.nombreId+'-unidades').setAttribute('disabled','disabled');
            document.getElementById(this.nombreId+'-ver-insp').setAttribute('disabled','disabled');
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
            document.getElementById(this.nombreId+'-nombre').removeAttribute('disabled');
            document.getElementById(this.nombreId+'-limit-inf').removeAttribute('disabled');
            document.getElementById(this.nombreId+'-limit-sup').removeAttribute('disabled');
            document.getElementById(this.nombreId+'-unidades').removeAttribute('disabled');
            document.getElementById(this.nombreId+'-ver-insp').removeAttribute('disabled');
            document.getElementById(this.nombreId+'-activo').setAttribute('checked','checked');
            this.setState({Activo: true});
        } else {
            document.getElementById(this.nombreId+'-nombre').setAttribute('disabled','disabled');
            document.getElementById(this.nombreId+'-limit-inf').setAttribute('disabled','disabled');
            document.getElementById(this.nombreId+'-limit-sup').setAttribute('disabled','disabled');
            document.getElementById(this.nombreId+'-unidades').setAttribute('disabled','disabled');
            document.getElementById(this.nombreId+'-ver-insp').setAttribute('disabled','disabled');
            document.getElementById(this.nombreId+'-activo').removeAttribute('checked');
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
                <td><input type="text" id={this.nombreId+'-nombre'} value={this.state.Nombre} onChange={this.handleNombre} /></td>
                <td><input type="text" size="3" id={this.nombreId+'-limit-inf'} value={this.state.LimInf} onChange={this.handleLimitInferior} /></td>
                <td><input type="text" size="3" id={this.nombreId+'-limit-sup'} value={this.state.LimSup} onChange={this.handleLimitSuperior}  /></td>
                <td>
                    <select id={this.nombreId+'-unidades'}>
                        <option>---</option>
                    </select>
                </td>
                <td><center><input type="checkbox" id={this.nombreId+'-activo'} onChange={this.handleActivo} checked={this.state.Activo} /></center></td>
                <td><center><input type="checkbox" id={this.nombreId+'-ver-insp'} checked={this.state.VerInspector} onChange={this.handleVerInspector} /></center></td>
            </tr>
        );
    }

};

export default CampoPersPlantasTabla;