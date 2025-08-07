import React, { useContext, useState } from 'react';
import { Grid, Card, Typography, Button } from '@mui/material';
import { DATAGRID_LOCALE_TEXT } from '../helpers/datagridLocale';

import { DataGrid } from '@mui/x-data-grid';
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from '../context/AuthContext';
import { ModalLayout } from './ModalLayout';
import { InsertarVisModal1 } from './Modals/InsertarVisModal1';
import { insertarBotonesModal } from '../helpers/insertarBotonesModal';
import { InsertarVisModal } from './Modals/InsertarVisModal';
import { InsertarVisModalAerobio } from './Modals/InsertarVisModalAerobio';
import { EditarVisModal1 } from './Modals/EditarVisModal1';
import { EditarVisModal } from './Modals/EditarVisModal';
import { EditarVisModalAerobio } from './Modals/EditarVisModalAerobio';
import { ModalLayout2 } from './ModalLayout2';

export const AnalisisTable = ({
    title,
    rows,
    data,
    columnas,
    errorFecha,
    setErrorFecha,
    setAnalisisSeleccionado,
    analisisSeleccionado,
    analisiId,
    analisis,
    tipo,
    elementos,
    ficheros,
    operarios,
    peticionPost,
    peticionPut,
    peticionDelete,
    descargarPdf,
    descargarPdfNoFQ,
    handleChangeInput,
    fileChange,
    setFileChange,
    handleChangeCheckbox,
    analisisAutocomplete,
    elementosAutocomplete,
    analisisEditar,
    elementoTareaEditar,
    operarioEditar,
    pdfEditar,
    setAnalisisEliminar,
    setAnalisisEditar,
    setElementoTareaEditar,
    setPdfEditar,
    setOperarioEditar,
    observaciones,
    setObservaciones,
    observacion,
    setObservacion,
    observacionEditar,
    setObservacionEditar,
    handlePdf,
    envioCorreo,
    setContactosEnviarCorreo
}) => {

    const { user } = useContext(AuthContext);
    const [rowsIds, setRowsIds] = useState([]);

    const [modalInsertarFQ, setModalInsertarFQ] = useState(false);
    const [modalInsertarNoFQ, setModalInsertarNoFQ] = useState(false);
    const [modalInsertarAL, setModalInsertarAL] = useState(false);
    const [modalEditarFQ, setModalEditarFQ] = useState(false);
    const [modalEditarNoFQ, setModalEditarNoFQ] = useState(false);
    const [modalEditarAL, setModalEditarAL] = useState(false);
    const [modalEditarOperarioFQ, setModalEditarOperarioFQ] = useState(false);
    const [modalEditarOperarioNoFQ, setModalEditarOperarioNoFQ] = useState(false);
    const [modalEditarOperarioAL, setModalEditarOperarioAL] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);

    const abrirCerrarModalInsertarFQ = () => {
        setErrorFecha(false);
        if (modalInsertarFQ) {
            setAnalisisSeleccionado({
                id: 0,
                codigoCliente: analisisSeleccionado.codigoCliente,
                nombreCliente: analisisSeleccionado.nombreCliente,
                oferta: analisisSeleccionado.oferta,
                pedido: analisisSeleccionado.pedido,
                elemento: analisisSeleccionado.elemento,
                nombreElemento: analisisSeleccionado.nombreElemento,
                periodo: "",
                analisis: 0,
                fecha: null,
                recogido: false,
                fechaRecogido: null,
                realizado: false,
                fechaRealizado: null,
                observaciones: "",
                pdf: 0,
                recibido: false,
                fechaPdf: null,
                resultado: "",
                textoCorreo: "",
                facturado: false,
                numeroFacturado: "",
                operario: 0,
                cancelado: false,
                comentarios: "",
                incorrecto: false,
                noValido: false,
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
                contactosEnviarCorreo: "",
            });
            setModalInsertarFQ(!modalInsertarFQ);
        } else {
            setModalInsertarFQ(!modalInsertarFQ);
        }
    };

    const abrirCerrarModalInsertarAL = () => {
        setErrorFecha(false);
        if (modalInsertarAL) {
            setAnalisisSeleccionado({
                id: 0,
                codigoCliente: analisisSeleccionado.codigoCliente,
                nombreCliente: analisisSeleccionado.nombreCliente,
                oferta: analisisSeleccionado.oferta,
                pedido: analisisSeleccionado.pedido,
                elemento: analisisSeleccionado.elemento,
                nombreElemento: analisisSeleccionado.nombreElemento,
                periodo: "",
                analisis: 0,
                fecha: null,
                recogido: false,
                fechaRecogido: null,
                realizado: false,
                fechaRealizado: null,
                observaciones: "",
                pdf: 0,
                recibido: false,
                fechaPdf: null,
                resultado: "",
                textoCorreo: "",
                facturado: false,
                numeroFacturado: "",
                operario: 0,
                cancelado: false,
                comentarios: "",
                incorrecto: false,
                noValido: false,
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
                contactosEnviarCorreo: "",
            });
            setModalInsertarAL(!modalInsertarAL);
        } else {
            setModalInsertarAL(!modalInsertarAL);
        }
    };

    const abrirCerrarModalInsertarNoFQ = () => {
        setErrorFecha(false);
        if (modalInsertarNoFQ) {
            setAnalisisSeleccionado({
                id: 0,
                codigoCliente: analisisSeleccionado.codigoCliente,
                nombreCliente: analisisSeleccionado.nombreCliente,
                oferta: analisisSeleccionado.oferta,
                pedido: analisisSeleccionado.pedido,
                elemento: analisisSeleccionado.elemento,
                nombreElemento: analisisSeleccionado.nombreElemento,
                periodo: "",
                analisis: 0,
                fecha: null,
                recogido: false,
                fechaRecogido: null,
                realizado: false,
                fechaRealizado: null,
                observaciones: "",
                pdf: 0,
                recibido: false,
                fechaPdf: null,
                resultado: "",
                textoCorreo: "",
                facturado: false,
                numeroFacturado: "",
                operario: 0,
                cancelado: false,
                comentarios: "",
                incorrecto: false,
                noValido: false,
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
                contactosEnviarCorreo: "",
            });
            setModalInsertarNoFQ(!modalInsertarNoFQ);
        } else {
            setModalInsertarNoFQ(!modalInsertarNoFQ);
        }
    };

    const abrirCerrarModalEditarFQ = () => {
        setErrorFecha(false);
        if (modalEditarFQ) {
            setAnalisisSeleccionado({
                id: 0,
                codigoCliente: analisisSeleccionado.codigoCliente,
                nombreCliente: analisisSeleccionado.nombreCliente,
                oferta: analisisSeleccionado.oferta,
                pedido: analisisSeleccionado.pedido,
                elemento: analisisSeleccionado.elemento,
                nombreElemento: analisisSeleccionado.nombreElemento,
                periodo: "",
                analisis: 0,
                fecha: null,
                recogido: false,
                fechaRecogido: null,
                realizado: false,
                fechaRealizado: null,
                observaciones: "",
                pdf: 0,
                recibido: false,
                fechaPdf: null,
                resultado: "",
                textoCorreo: "",
                facturado: false,
                numeroFacturado: "",
                operario: 0,
                cancelado: false,
                comentarios: "",
                incorrecto: false,
                noValido: false,
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
                contactosEnviarCorreo: "",
            });
            setModalEditarFQ(!modalEditarFQ);
        } else {
            setModalEditarFQ(!modalEditarFQ);
        }
    };

    const abrirCerrarModalEditarNoFQ = () => {
        setErrorFecha(false);
        if (modalEditarNoFQ) {
            setAnalisisSeleccionado({
                id: 0,
                codigoCliente: analisisSeleccionado.codigoCliente,
                nombreCliente: analisisSeleccionado.nombreCliente,
                oferta: analisisSeleccionado.oferta,
                pedido: analisisSeleccionado.pedido,
                elemento: analisisSeleccionado.elemento,
                nombreElemento: analisisSeleccionado.nombreElemento,
                periodo: "",
                analisis: 0,
                fecha: null,
                recogido: false,
                fechaRecogido: null,
                realizado: false,
                fechaRealizado: null,
                observaciones: "",
                pdf: 0,
                recibido: false,
                fechaPdf: null,
                resultado: "",
                textoCorreo: "",
                facturado: false,
                numeroFacturado: "",
                operario: 0,
                cancelado: false,
                comentarios: "",
                incorrecto: false,
                noValido: false,
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
                contactosEnviarCorreo: "",
            });
            setModalEditarNoFQ(!modalEditarNoFQ);
        } else {
            setModalEditarNoFQ(!modalEditarNoFQ);
        }
    };

    const abrirCerrarModalEditarAL = () => {
        setErrorFecha(false);
        if (modalEditarAL) {
            setAnalisisSeleccionado({
                id: 0,
                codigoCliente: analisisSeleccionado.codigoCliente,
                nombreCliente: analisisSeleccionado.nombreCliente,
                oferta: analisisSeleccionado.oferta,
                pedido: analisisSeleccionado.pedido,
                elemento: analisisSeleccionado.elemento,
                nombreElemento: analisisSeleccionado.nombreElemento,
                periodo: "",
                analisis: 0,
                fecha: null,
                recogido: false,
                fechaRecogido: null,
                realizado: false,
                fechaRealizado: null,
                observaciones: "",
                pdf: 0,
                recibido: false,
                fechaPdf: null,
                resultado: "",
                textoCorreo: "",
                facturado: false,
                numeroFacturado: "",
                operario: 0,
                cancelado: false,
                comentarios: "",
                incorrecto: false,
                noValido: false,
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
                contactosEnviarCorreo: "",
            });
            setModalEditarAL(!modalEditarAL);
        } else {
            setModalEditarAL(!modalEditarAL);
        }
    };

    const abrirCerrarModalEditarOperarioFQ = () => {
        setErrorFecha(false);
        if (modalEditarOperarioFQ) {
            setAnalisisSeleccionado({
                id: 0,
                codigoCliente: analisisSeleccionado.codigoCliente,
                nombreCliente: analisisSeleccionado.nombreCliente,
                oferta: analisisSeleccionado.oferta,
                pedido: analisisSeleccionado.pedido,
                elemento: analisisSeleccionado.elemento,
                nombreElemento: analisisSeleccionado.nombreElemento,
                periodo: "",
                analisis: 0,
                fecha: null,
                recogido: false,
                fechaRecogido: null,
                realizado: false,
                fechaRealizado: null,
                observaciones: "",
                pdf: 0,
                recibido: false,
                fechaPdf: null,
                resultado: "",
                textoCorreo: "",
                facturado: false,
                numeroFacturado: "",
                operario: 0,
                cancelado: false,
                comentarios: "",
                incorrecto: false,
                noValido: false,
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
                contactosEnviarCorreo: "",
            });
            setModalEditarOperarioFQ(!modalEditarOperarioFQ);
        } else {
            setModalEditarOperarioFQ(!modalEditarOperarioFQ);
        }
    };

    const abrirCerrarModalEditarOperarioNoFQ = () => {
        setErrorFecha(false);
        if (modalEditarOperarioNoFQ) {
            setAnalisisSeleccionado({
                id: 0,
                codigoCliente: analisisSeleccionado.codigoCliente,
                nombreCliente: analisisSeleccionado.nombreCliente,
                oferta: analisisSeleccionado.oferta,
                pedido: analisisSeleccionado.pedido,
                elemento: analisisSeleccionado.elemento,
                nombreElemento: analisisSeleccionado.nombreElemento,
                periodo: "",
                analisis: 0,
                fecha: null,
                recogido: false,
                fechaRecogido: null,
                realizado: false,
                fechaRealizado: null,
                observaciones: "",
                pdf: 0,
                recibido: false,
                fechaPdf: null,
                resultado: "",
                textoCorreo: "",
                facturado: false,
                numeroFacturado: "",
                operario: 0,
                cancelado: false,
                comentarios: "",
                incorrecto: false,
                noValido: false,
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
                contactosEnviarCorreo: "",
            });
            setModalEditarOperarioNoFQ(!modalEditarOperarioNoFQ);
        } else {
            setModalEditarOperarioNoFQ(!modalEditarOperarioNoFQ);
        }
    };

    const abrirCerrarModalEditarOperarioAL = () => {
        setErrorFecha(false);
        if (modalEditarOperarioAL) {
            setAnalisisSeleccionado({
                id: 0,
                codigoCliente: analisisSeleccionado.codigoCliente,
                nombreCliente: analisisSeleccionado.nombreCliente,
                oferta: analisisSeleccionado.oferta,
                pedido: analisisSeleccionado.pedido,
                elemento: analisisSeleccionado.elemento,
                nombreElemento: analisisSeleccionado.nombreElemento,
                periodo: "",
                analisis: 0,
                fecha: null,
                recogido: false,
                fechaRecogido: null,
                realizado: false,
                fechaRealizado: null,
                observaciones: "",
                pdf: 0,
                recibido: false,
                fechaPdf: null,
                resultado: "",
                textoCorreo: "",
                facturado: false,
                numeroFacturado: "",
                operario: 0,
                cancelado: false,
                comentarios: "",
                incorrecto: false,
                noValido: false,
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
                contactosEnviarCorreo: "",
            });
            setModalEditarOperarioAL(!modalEditarOperarioAL);
        } else {
            setModalEditarOperarioAL(!modalEditarOperarioAL);
        }
    };

    const abrirCerrarModalEliminar = () => {
        setErrorFecha(false);
        setFileChange();
        if (modalEliminar) {
            setAnalisisSeleccionado({
                id: 0,
                codigoCliente: analisisSeleccionado.codigoCliente,
                nombreCliente: analisisSeleccionado.nombreCliente,
                oferta: analisisSeleccionado.oferta,
                pedido: analisisSeleccionado.pedido,
                elemento: analisisSeleccionado.elemento,
                nombreElemento: analisisSeleccionado.nombreElemento,
                periodo: "",
                analisis: 0,
                fecha: null,
                recogido: false,
                fechaRecogido: null,
                realizado: false,
                fechaRealizado: null,
                observaciones: "",
                pdf: 0,
                recibido: false,
                fechaPdf: null,
                resultado: "",
                textoCorreo: "",
                facturado: false,
                numeroFacturado: "",
                operario: 0,
                cancelado: false,
                comentarios: "",
                incorrecto: false,
                noValido: false,
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
                contactosEnviarCorreo: "",
            });
            setModalEliminar(!modalEliminar);
        } else {
            setModalEliminar(!modalEliminar);
        }
    };


    const handleSelectRow = (ids) => {
        if (ids.length > 0) {
            setAnalisisSeleccionado(data.filter((tarea) => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }
        setRowsIds(ids);
    };

    return (
        <>
            {
                user.idPerfil === 1004 ?
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='h6'>{title}</Typography>
                            </Card>
                        </Grid>

                        {/* Tabla donde se muestran los registros */}
                        <Grid item xs={12}>
                            <Card>
                                <DataGrid
                                    localeText={DATAGRID_LOCALE_TEXT}
                                    sx={{
                                        width: '100%',
                                        height: 700,
                                        backgroundColor: '#FFFFFF'
                                    }}
                                    rows={rows}
                                    columns={columnas}
                                    pageSize={12}
                                    rowsPerPageOptions={[12]}
                                    initialState={{
                                        sorting: {
                                            sortModel: [{ field: 'fecha', sort: 'asc' }]
                                        }
                                    }}
                                    onSelectionModelChange={(ids) => handleSelectRow(ids)}
                                    onRowClick={(analisisSeleccionado, evt) => {
                                        setAnalisisSeleccionado(analisisSeleccionado.row)
                                        setOperarioEditar(operarios.filter(operario => operario.id === analisisSeleccionado.row.operario));
                                        setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.row.analisis));
                                        setElementoTareaEditar(elementos.filter(elemento => elemento.id === analisisSeleccionado.row.elemento));
                                        setPdfEditar(ficheros.filter(fich => fich.id === analisisSeleccionado.row.pdf))

                                        if (tipo === 0) {
                                            abrirCerrarModalEditarOperarioFQ();
                                        } else if (tipo === 1) {
                                            abrirCerrarModalEditarOperarioNoFQ();
                                        } else {
                                            abrirCerrarModalEditarOperarioAL();
                                        }
                                    }}
                                />
                            </Card>
                        </Grid>
                    </Grid>
                    :
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='h6'>{title}</Typography>
                                {(rowsIds.length > 0) ? (
                                    <Button
                                        sx={{ mr: 2 }}
                                        color='error'
                                        variant='contained'
                                        startIcon={<DeleteIcon />}
                                        onClick={() => {
                                            setAnalisisEliminar(rowsIds);
                                            abrirCerrarModalEliminar();
                                        }}
                                    >
                                        Eliminar
                                    </Button>
                                ) : (
                                    <Button
                                        color="success"
                                        variant="contained"
                                        startIcon={<AddIcon />}
                                        onClick={() => {
                                            if (tipo === 0) {
                                                abrirCerrarModalInsertarFQ();
                                            } else if (tipo === 1) {
                                                abrirCerrarModalInsertarNoFQ();
                                            } else {
                                                abrirCerrarModalInsertarAL();
                                            }
                                        }}
                                    >
                                        Añadir
                                    </Button>
                                )}
                            </Card>
                        </Grid>

                        {/* Tabla donde se muestran los registros */}
                        <Grid item xs={12}>
                            <Card>
                                <DataGrid
                                    localeText={DATAGRID_LOCALE_TEXT}
                                    sx={{
                                        width: '100%',
                                        height: 700,
                                        backgroundColor: '#FFFFFF'
                                    }}
                                    rows={rows}
                                    columns={columnas}
                                    pageSize={12}
                                    rowsPerPageOptions={[12]}
                                    initialState={{
                                        sorting: {
                                            sortModel: [{ field: 'fecha', sort: 'asc' }]
                                        }
                                    }}
                                    checkboxSelection
                                    disableSelectionOnClick
                                    onSelectionModelChange={(ids) => handleSelectRow(ids)}
                                    onRowClick={(analisisSeleccionado, evt) => {
                                        setAnalisisSeleccionado(analisisSeleccionado.row)
                                        setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.row.analisis));
                                        setOperarioEditar(operarios.filter(operario => operario.id === analisisSeleccionado.row.operario));
                                        setElementoTareaEditar(elementos.filter(elemento => elemento.id === analisisSeleccionado.row.elemento));
                                        setPdfEditar(ficheros.filter(fich => fich.id === analisisSeleccionado.row.pdf))
                                        if (tipo === 0) {
                                            abrirCerrarModalEditarFQ();
                                        } else if (tipo === 1) {
                                            abrirCerrarModalEditarNoFQ();
                                        } else {
                                            abrirCerrarModalEditarAL();
                                        }
                                    }}
                                />
                            </Card>
                        </Grid>
                    </Grid>
            }

            {/* Modal Añadir Tarea */}

            <ModalLayout
                titulo="Agregar nueva Tarea"
                contenido={
                    <InsertarVisModal1
                        change={handleChangeInput}
                        analisisSeleccionado={analisisSeleccionado}
                        analisisid={analisiId}
                        setAnalisisSeleccionado={setAnalisisSeleccionado}
                        analisis={analisis}
                        errorFecha={errorFecha}
                    />
                }
                botones={[
                    insertarBotonesModal(
                        <AddIcon />,
                        "Insertar",
                        async () => {
                            peticionPost();
                        }
                    ),
                ]}
                open={modalInsertarFQ}
                onClose={abrirCerrarModalInsertarFQ}
            />

            <ModalLayout
                titulo="Agregar nueva Tarea"
                contenido={
                    <InsertarVisModal
                        change={handleChangeInput}
                        analisisSeleccionado={analisisSeleccionado}
                        analisisid={analisiId}
                        setAnalisisSeleccionado={setAnalisisSeleccionado}
                        analisis={analisis}
                        errorFecha={errorFecha}
                    />
                }
                botones={[
                    insertarBotonesModal(
                        <AddIcon />,
                        "Insertar",
                        async () => {
                            peticionPost();
                        }
                    ),
                ]}
                open={modalInsertarNoFQ}
                onClose={abrirCerrarModalInsertarNoFQ}
            />

            <ModalLayout
                titulo="Agregar nueva Tarea"
                contenido={
                    <InsertarVisModalAerobio
                        change={handleChangeInput}
                        analisisSeleccionado={analisisSeleccionado}
                        analisisid={analisiId}
                        setAnalisisSeleccionado={
                            setAnalisisSeleccionado
                        }
                        analisis={analisis}
                        errorFecha={errorFecha}
                    />
                }
                botones={[
                    insertarBotonesModal(
                        <AddIcon />,
                        "Insertar",
                        async () => {
                            peticionPost();
                        }
                    ),
                ]}
                open={modalInsertarAL}
                onClose={abrirCerrarModalInsertarAL}
            />

            {/* Modal Editar Tarea*/}

            <ModalLayout
                titulo="Editar tarea"
                contenido={
                    <EditarVisModal1
                        analisisSeleccionado={analisisSeleccionado}
                        change={handleChangeInput}
                        setAnalisisSeleccionado={
                            setAnalisisSeleccionado
                        }
                        handleChangeCheckbox={handleChangeCheckbox}
                        analisisAutocomplete={analisisAutocomplete}
                        analisisEditar={analisisEditar}
                        elementoTareaEditar={elementoTareaEditar}
                        elementosAutocomplete={elementosAutocomplete}
                        operarios={operarios}
                        operarioEditar={operarioEditar}
                        pdfEditar={pdfEditar}
                        observaciones={observaciones}
                        setObservaciones={setObservaciones}
                        observacion={observacion}
                        setObservacion={setObservacion}
                        observacionEditar={observacionEditar}
                        setObservacionEditar={setObservacionEditar}
                    />
                }
                botones={[
                    insertarBotonesModal(
                        <PictureAsPdfIcon />,
                        "Descargar Pdf",
                        async () => {
                            descargarPdf();
                        }
                    ),
                    insertarBotonesModal(
                        <AddIcon />,
                        "Guardar",
                        async () => {
                            peticionPut();
                        }
                    ),
                ]}
                open={modalEditarFQ}
                onClose={abrirCerrarModalEditarFQ}
            />

            <ModalLayout2
                titulo="Editar tarea"
                contenido={
                    <EditarVisModal1
                        analisisSeleccionado={analisisSeleccionado}
                        change={handleChangeInput}
                        setAnalisisSeleccionado={
                            setAnalisisSeleccionado
                        }
                        handleChangeCheckbox={handleChangeCheckbox}
                        analisisAutocomplete={analisisAutocomplete}
                        analisisEditar={analisisEditar}
                        elementoTareaEditar={elementoTareaEditar}
                        elementosAutocomplete={elementosAutocomplete}
                        operarios={operarios}
                        operarioEditar={operarioEditar}
                        pdfEditar={pdfEditar}
                        observaciones={observaciones}
                        setObservaciones={setObservaciones}
                        observacion={observacion}
                        setObservacion={setObservacion}
                        observacionEditar={observacionEditar}
                        setObservacionEditar={setObservacionEditar}
                    />
                }
                botones={[
                    insertarBotonesModal(
                        <PictureAsPdfIcon />,
                        "Descargar Pdf",
                        async () => {
                            descargarPdf();
                        }
                    ),
                    insertarBotonesModal(
                        <AddIcon />,
                        "Guardar",
                        async () => {
                            peticionPut();
                        }
                    ),
                ]}
                open={modalEditarOperarioFQ}
                onClose={abrirCerrarModalEditarOperarioFQ}
            />

            <ModalLayout
                titulo="Editar tarea"
                contenido={
                    <EditarVisModal
                        analisisSeleccionado={analisisSeleccionado}
                        change={handleChangeInput}
                        setAnalisisSeleccionado={setAnalisisSeleccionado}
                        handleChangeCheckbox={handleChangeCheckbox}
                        analisisAutocomplete={analisisAutocomplete}
                        analisisEditar={analisisEditar}
                        elementoTareaEditar={elementoTareaEditar}
                        elementosAutocomplete={elementosAutocomplete}
                        handlePdf={handlePdf}
                        fileChange={fileChange}
                        mandarCorreo={envioCorreo}
                        operarios={operarios}
                        operarioEditar={operarioEditar}
                        pdfEditar={pdfEditar}
                        observaciones={observaciones}
                        setObservaciones={setObservaciones}
                        observacion={observacion}
                        setObservacion={setObservacion}
                        observacionEditar={observacionEditar}
                        setObservacionEditar={setObservacionEditar}
                        setContactosEnviarCorreo={setContactosEnviarCorreo}
                    />
                }
                botones={[
                    insertarBotonesModal(
                        <PictureAsPdfIcon />,
                        "Descargar Pdf",
                        async () => {
                            descargarPdfNoFQ();
                        }
                    ),
                    insertarBotonesModal(
                        <AddIcon />,
                        "Guardar",
                        async () => {
                            peticionPut();
                        }
                    ),
                ]}
                open={modalEditarNoFQ}
                onClose={abrirCerrarModalEditarNoFQ}
            />

            <ModalLayout2
                titulo="Editar tarea"
                contenido={
                    <EditarVisModal
                        analisisSeleccionado={analisisSeleccionado}
                        change={handleChangeInput}
                        setAnalisisSeleccionado={setAnalisisSeleccionado}
                        handleChangeCheckbox={handleChangeCheckbox}
                        analisisAutocomplete={analisisAutocomplete}
                        analisisEditar={analisisEditar}
                        elementoTareaEditar={elementoTareaEditar}
                        elementosAutocomplete={elementosAutocomplete}
                        handlePdf={handlePdf}
                        fileChange={fileChange}
                        mandarCorreo={envioCorreo}
                        operarios={operarios}
                        operarioEditar={operarioEditar}
                        pdfEditar={pdfEditar}
                        observaciones={observaciones}
                        setObservaciones={setObservaciones}
                        observacion={observacion}
                        setObservacion={setObservacion}
                        observacionEditar={observacionEditar}
                        setObservacionEditar={setObservacionEditar}
                        setContactosEnviarCorreo={setContactosEnviarCorreo}
                    />
                }
                botones={[
                    insertarBotonesModal(
                        <PictureAsPdfIcon />,
                        "Descargar Pdf",
                        async () => {
                            descargarPdfNoFQ();
                        }
                    ),
                    insertarBotonesModal(
                        <AddIcon />,
                        "Guardar",
                        async () => {
                            peticionPut();
                        }
                    ),
                ]}
                open={modalEditarOperarioNoFQ}
                onClose={abrirCerrarModalEditarOperarioNoFQ}
            />

            <ModalLayout
                titulo="Editar tarea"
                contenido={
                    <EditarVisModalAerobio
                        analisisSeleccionado={analisisSeleccionado}
                        change={handleChangeInput}
                        setAnalisisSeleccionado={
                            setAnalisisSeleccionado
                        }
                        handleChangeCheckbox={handleChangeCheckbox}
                        analisisAutocomplete={analisisAutocomplete}
                        analisisEditar={analisisEditar}
                        elementoTareaEditar={elementoTareaEditar}
                        elementosAutocomplete={elementosAutocomplete}
                        handlePdf={handlePdf}
                        fileChange={fileChange}
                        mandarCorreo={envioCorreo}
                        pdfEditar={pdfEditar}
                        operarios={operarios}
                        operarioEditar={operarioEditar}
                        observaciones={observaciones}
                        setObservaciones={setObservaciones}
                        observacion={observacion}
                        setObservacion={setObservacion}
                        observacionEditar={observacionEditar}
                        setObservacionEditar={setObservacionEditar}
                        setContactosEnviarCorreo={
                            setContactosEnviarCorreo
                        }
                    />
                }
                botones={[
                    insertarBotonesModal(
                        <PictureAsPdfIcon />,
                        "Descargar Pdf",
                        async () => {
                            descargarPdf();
                        }
                    ),
                    insertarBotonesModal(
                        <AddIcon />,
                        "Guardar",
                        async () => {
                            peticionPut();
                        }
                    ),
                ]}
                open={modalEditarAL}
                onClose={abrirCerrarModalEditarAL}
            />

            <ModalLayout2
                titulo="Editar tarea"
                contenido={
                    <EditarVisModalAerobio
                        analisisSeleccionado={analisisSeleccionado}
                        change={handleChangeInput}
                        setAnalisisSeleccionado={setAnalisisSeleccionado}
                        handleChangeCheckbox={handleChangeCheckbox}
                        analisisAutocomplete={analisisAutocomplete}
                        analisisEditar={analisisEditar}
                        elementoTareaEditar={elementoTareaEditar}
                        elementosAutocomplete={elementosAutocomplete}
                        handlePdf={handlePdf}
                        fileChange={fileChange}
                        mandarCorreo={envioCorreo}
                        pdfEditar={pdfEditar}
                        operarios={operarios}
                        operarioEditar={operarioEditar}
                        observaciones={observaciones}
                        setObservaciones={setObservaciones}
                        observacion={observacion}
                        setObservacion={setObservacion}
                        observacionEditar={observacionEditar}
                        setObservacionEditar={setObservacionEditar}
                        setContactosEnviarCorreo={setContactosEnviarCorreo}
                    />
                }
                botones={[
                    insertarBotonesModal(
                        <PictureAsPdfIcon />,
                        "Descargar Pdf",
                        async () => {
                            descargarPdf();
                        }
                    ),
                    insertarBotonesModal(
                        <AddIcon />,
                        "Guardar",
                        async () => {
                            peticionPut();
                        }
                    ),
                ]}
                open={modalEditarOperarioAL}
                onClose={abrirCerrarModalEditarOperarioAL}
            />

            {/* Modal Eliminar */}

            <ModalLayout
                titulo="Eliminar tarea"
                contenido={
                    rowsIds.length > 1 ? (
                        <Grid item xs={12}>
                            <Typography>
                                ¿Estás seguro que deseas eliminar las <b>{rowsIds.length}</b> tareas seleccionadas?
                            </Typography>
                        </Grid>
                    ) : (
                        <>
                            <Grid item xs={12}>
                                <Typography>
                                    Estás seguro que deseas eliminar la tarea?
                                </Typography>
                            </Grid>
                        </>
                    )
                }
                botones={[
                    insertarBotonesModal(
                        <DeleteIcon />,
                        "Eliminar",
                        async () => {
                            await peticionDelete();
                            abrirCerrarModalEliminar();
                        },
                        "error"
                    ),
                ]}
                open={modalEliminar}
                onClose={abrirCerrarModalEliminar}
            />
        </>
    );
};