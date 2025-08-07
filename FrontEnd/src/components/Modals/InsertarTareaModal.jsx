import { useState } from 'react';
import { Grid, TextField, Autocomplete, Typography } from '@mui/material';
import { ObservacionesElementos } from '../ObservacionesElementos/ObservacionesElementos';

const tipos = [
    { id: 1, nombre: "Mensual" },
    { id: 2, nombre: "Bimensual" },
    { id: 3, nombre: "Trimestral" },
    { id: 4, nombre: "Semestral" },
    { id: 5, nombre: "Anual" }
]



export const InsertarTareaModal =
    ({
        change: handleChange,
        tareaSeleccionada,
        handleChangeFecha,
        setTareaSeleccionada,
        handleChangeAnalisis,
        elementosAutocomplete,
        analisisAutocomplete,
        errorAnalisis,
        errorCodigo,
        errorElemento,
        errorFecha,
        errorOferta,
        errorOperario,
        errorPeriodo,
        handlePdf,
        files,
        observaciones,
        setObservaciones,
        observacion,
        setObservacion,
        observacionEditar,
        setObservacionEditar,
        operarios,
        clientes,
        ofertas
    }) => {

        const [inputCodigoCliente, setInputCodigoCliente] = useState('');
        const [inputNombreCliente, setInputNombreCliente] = useState('');

        const [idElementoSeleccionado, setIdElementoSeleccionado] = useState(0);

        function filtrarCodigoCliente(cliente) {
            if (!cliente.deleted) {
                if (inputCodigoCliente === '') {
                    return true;
                } else {
                    if (cliente.codigo?.toString().indexOf(inputCodigoCliente) >= 0) {
                        return true;
                    } else {
                        return false;
                    }
                }
            } else {
                return false;
            }
        }

        function filtrarNombreCliente(cliente) {
            if (!cliente.deleted) {
                if (inputNombreCliente === '') {
                    return true;
                } else {
                    const nombreClienteLowerCase = cliente.razonSocial ? cliente.razonSocial.toString().toLowerCase() : '';
                    const inputNombreClienteLowerCase = inputNombreCliente.toLowerCase();
                    return nombreClienteLowerCase.includes(inputNombreClienteLowerCase);
                }
            } else {
                return false;
            }
        }

        function handleCambioElemento(event, value) {
            setTareaSeleccionada(prevState => ({
                ...prevState,
                elemento: parseInt(value.id),
                nombreElemento: event.target.textContent,
                analisis: 0,
                nombreAnalisis: '',
            }));
            setIdElementoSeleccionado(value.id);
        }

        return (
            <>
                <Grid item xs={3} md={3}>
                    <Autocomplete
                        disableClearable={true}
                        id="CboClientes"
                        options={clientes}
                        value={clientes.find(cliente => cliente.codigo === tareaSeleccionada.codigoCliente) || null}
                        filterOptions={options => clientes.filter((cliente) => filtrarCodigoCliente(cliente))}
                        onInputChange={(event, newInputValue) => {
                            setInputCodigoCliente(newInputValue);
                        }}
                        getOptionLabel={option => option.codigo.toString()}
                        sx={{ width: '100%', marginTop: '22px' }}
                        renderInput={(params) => <TextField {...params} label="Codigo Cliente" name="codigoCliente" error={errorCodigo} helperText={errorCodigo ? 'Este campo es obligatorio' : ' '} />}
                        onChange={(event, value) => setTareaSeleccionada(prevState => ({
                            ...prevState,
                            codigoCliente: value ? parseInt(value.codigo) : null,
                            nombreCliente: value ? value.razonSocial : null,
                            oferta: '',
                            pedido: '',
                            elemento: 0,
                            nombreElemento: '',
                            analisis: 0,
                            nombreAnalisis: '',
                        }))}
                    />
                </Grid>

                <Grid item xs={3} md={4}>
                    <Autocomplete
                        disableClearable={true}
                        id="nombreCliente"
                        options={clientes}
                        value={clientes.find(cliente => cliente.razonSocial === tareaSeleccionada.nombreCliente) || null}
                        filterOptions={options => clientes.filter((cliente) => filtrarNombreCliente(cliente))}
                        onInputChange={(event, newInputValue) => {
                            setInputNombreCliente(newInputValue);
                        }}
                        getOptionLabel={option => option.razonSocial}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField {...params} label="Nombre Cliente" name="nombreCliente" />}
                        onChange={(event, value) => setTareaSeleccionada(prevState => ({
                            ...prevState,
                            codigoCliente: value ? parseInt(value.codigo) : null,
                            nombreCliente: value ? value.razonSocial : null,
                            oferta: '',
                            pedido: '',
                            elemento: 0,
                            nombreElemento: '',
                            analisis: 0,
                            nombreAnalisis: '',
                        }))}
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <Autocomplete
                        disableClearable={true}
                        id="clientes"
                        options={ofertas}
                        value={ofertas.find(oferta => oferta.numeroOferta === tareaSeleccionada.oferta) || null}
                        filterOptions={options => {
                            if (tareaSeleccionada.nombreCliente !== "" && tareaSeleccionada.codigoCliente !== 0 && tareaSeleccionada.oferta !== 0) {
                                return options.filter(oferta =>
                                    oferta.nombreCliente === tareaSeleccionada.nombreCliente && oferta.codigoCliente === tareaSeleccionada.codigoCliente && !oferta.deleted
                                );
                            } else {
                                return options.filter(oferta => !oferta.deleted);
                            }
                        }}
                        sx={{ width: '100%', marginTop: '22px' }}
                        getOptionLabel={option => option.numeroOferta.toString()}
                        renderInput={params => <TextField {...params} label="Oferta" name="oferta" error={errorOferta} helperText={errorOferta ? 'Este campo es obligatorio' : ' '} />}
                        onChange={(event, value) => setTareaSeleccionada(prevState => ({
                            ...prevState,
                            codigoCliente: value ? parseInt(value.codigoCliente) : null,
                            nombreCliente: value ? value.nombreCliente : null,
                            oferta: value ? parseInt(value.numeroOferta) : null,
                            pedido: value ? value.pedido : null,
                            elemento: 0,
                            nombreElemento: '',
                            analisis: 0,
                            nombreAnalisis: '',
                        }))}
                    />
                </Grid>

                <Grid item xs={3} md={2}>
                    <TextField
                        id='pedido'
                        sx={{ width: '100%' }}
                        label="Pedido"
                        value={tareaSeleccionada && tareaSeleccionada.pedido}
                        name="pedido"
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={3} md={4}>
                    <Autocomplete
                        disableClearable={true}
                        id="CboElementosPlanta"
                        inputValue={tareaSeleccionada.nombreElemento}
                        options={elementosAutocomplete}
                        getOptionLabel={option => option.descripcion !== null ? (option.nombre + ' ' + option.descripcion) : (option.nombre + ' ' + option.numero)}
                        sx={{ width: '100%', marginTop: '22px' }}
                        renderInput={(params) => <TextField {...params} label="Elemento" name="elemento" error={errorElemento} helperText={errorElemento ? 'Este campo es obligatorio' : ' '} />}
                        onChange={(event, value) => handleCambioElemento(event, value)}
                    />
                </Grid>

                <Grid item xs={3} md={4}>
                    <Autocomplete
                        disableClearable={true}
                        id="analisis"
                        options={analisisAutocomplete}
                        getOptionLabel={option => option.nombre}
                        sx={{ width: '100%', marginTop: '22px' }}
                        renderInput={(params) => <TextField {...params} label="Analisis" name="analisis" error={errorAnalisis} helperText={errorAnalisis ? 'Este campo es obligatorio' : ' '} />}
                        onChange={handleChangeAnalisis}
                    />
                </Grid>

                <Grid item xs={3} md={4}>
                    <Autocomplete
                        disableClearable={true}
                        sx={{ width: '100%', marginTop: '22px' }}
                        id="Operarios"
                        options={operarios}
                        filterOptions={options => operarios.filter(cliente => cliente.idPerfil === 1004)}
                        getOptionLabel={option => option.nombre + ' ' + option.apellidos}
                        renderInput={(params) => <TextField {...params} label="Operario" name="operario" error={errorOperario} helperText={errorOperario ? 'Este campo es obligatorio' : ' '} />}
                        onChange={(event, value) => setTareaSeleccionada(prevState => ({
                            ...prevState,
                            operario: value.id
                        }))}
                    />
                </Grid>

                <Grid item xs={3} md={8} style={{ display: 'flex' }}>
                    <h3 style={{ width: '30%', marginTop: '22px' }}> Fecha </h3>
                    <TextField
                        id="fecha"
                        type="date"
                        name="fecha"
                        sx={{ width: '100%', marginTop: '22px' }}
                        onChange={handleChangeFecha}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={errorFecha}
                        helperText={errorFecha ? 'Introduzca una fecha' : ' '}
                    />
                </Grid>

                <Grid item xs={4} md={4}>
                    <Autocomplete
                        disableClearable={true}
                        id="CboTipos"
                        options={tipos}
                        getOptionLabel={option => option.nombre}
                        sx={{ width: '100%', marginTop: '22px' }}
                        renderInput={(params) => <TextField {...params} label="Periodicidad" name="tipo" error={errorPeriodo} helperText={errorPeriodo ? 'Este campo es obligatorio' : ' '} />}
                        onChange={(event, value) => setTareaSeleccionada(prevState => ({
                            ...prevState,
                            tipo: value.id
                        }))}
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <ObservacionesElementos
                        idElemento={idElementoSeleccionado}
                        observaciones={observaciones}
                        setObservaciones={setObservaciones}
                        observacion={observacion}
                        setObservacion={setObservacion}
                        observacionEditar={observacionEditar}
                        setObservacionEditar={setObservacionEditar}
                    >

                    </ObservacionesElementos>

                </Grid>

                <Grid item xs={4} md={3}>
                    <div className="file-select" id="src-file3" >
                        <input type="file" name="src-file3" label="PDF instrucciones" onChange={handlePdf} multiple />
                    </div>
                    <Typography>
                        {files.length > 0 ? Array.from(files).map(file => file.name).join(', ') : "Seleccionar un archivo"}
                    </Typography>
                </Grid>
            </>
        )
    };
