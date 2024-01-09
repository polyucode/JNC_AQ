import React, { useState } from 'react';
import { Grid, Card, Typography, Button } from '@mui/material';
import { DATAGRID_LOCALE_TEXT } from '../helpers/datagridLocale';

import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export const AnalisisTable = ({
    title,
    rowsIds,
    rows,
    columnas,
    handleSelectRow,
    setAnalisisEliminar,
    setAnalisisEditar,
    setElementoTareaEditar,
    setAnalisisSeleccionado,
    abrirCerrarModalEditar,
    abrirCerrarModalEliminar,
    abrirCerrarModalInsertar,
    analisis,
    elementos
}) => {

    return (
        <>
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
                                color='success'
                                variant='contained'
                                startIcon={<AddIcon />}
                                onClick={() => {
                                    abrirCerrarModalInsertar()
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
                                setElementoTareaEditar(elementos.filter(elemento => elemento.id === analisisSeleccionado.row.elemento));
                                abrirCerrarModalEditar();
                            }}
                        />
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};