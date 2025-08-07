import React, { useState, useEffect, useContext } from "react";
import { Grid, Card, Typography } from '@mui/material';
import { MainLayout } from "../layout/MainLayout";

import { DataGrid } from '@mui/x-data-grid';
import { DATAGRID_LOCALE_TEXT } from '../helpers/datagridLocale';
import { getAnalisis, getElementosPlanta, getParametrosAnalisisPlanta } from "../api";

import { useNavigate  } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

export const TareasPendientesPage = () => {

  const [rows, setRows] = useState([]);

  const [analisis, setAnalisis] = useState([]);
  const [elementosPlanta, setElementosPlanta] = useState([]);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const columns = [
    //visibles
    { headerName: 'Oferta', field: 'oferta', width: 300 },
    { headerName: 'Nombre Cliente', field: 'nombreCliente', width: 450 },
    {
      headerName: 'Elemento',
      field: 'elemento',
      width: 350,
      valueFormatter: (params) => {

        const elemento = elementosPlanta.find((elemento) => elemento.id === params.value);

        if (elemento) {
          if (elemento.descripcion !== null && elemento.descripcion !== undefined) {
            return `${elemento.nombre} ${elemento.descripcion}`;
          } else {
            return `${elemento.nombre} ${elemento.numero}`;
          }
        } else {
          return '';
        }
      }
    },
    {
      headerName: 'Analisis',
      field: 'analisis',
      width: 350,
      valueFormatter: (params) => {
        const analisi = analisis.find((analisi) => analisi.id === params.value);
        return analisi ? analisi.nombre : '';
      }
    },
    {
      headerName: 'Fecha',
      field: 'fecha',
      width: 300,
      valueFormatter: (params) => {
        if (params.value != null) {
          const date = new Date(params.value);
          return date.toLocaleDateString();
        } else {
          const date = "";
          return date;
        }
      }
    },
  ];

  const peticionTareasPendientes = async () => {
    const resp = await getParametrosAnalisisPlanta();
    const today = new Date(); // Obtén la fecha actual
  
    const filteredTasks = resp.filter(tarea => {
      const tareaFecha = new Date(tarea.fecha); // Convierte la fecha de la tarea a un objeto Date
      return (
        tarea.operario === user.id &&
        !tarea.realizado &&
        !tarea.deleted &&
        tareaFecha <= today // Comprueba que la fecha de la tarea sea anterior a hoy
      );
    });
  
    setRows(filteredTasks);
  }

  // Sirve como el componentDidMount, inicia los metodos cuando entra en la página
  useEffect(() => {
    peticionTareasPendientes();
    getAnalisis()
      .then(resp => setAnalisis(resp.filter(an => !an.deleted)));

    getElementosPlanta()
      .then(resp => setElementosPlanta(resp.filter(el => !el.deleted)));

  }, [])

  const handleRowClick = (params) => {
    // Obtener los valores de la fila
    const rowData = params.row;    
    // Navegar a otra página y pasar los valores como parámetros de ruta
    navigate('/', { state: { codigoCliente: rowData.codigoCliente, nombreCliente: rowData.nombreCliente, oferta: rowData.oferta }, replace: true });
  };

  return (
    <>
      <MainLayout title='Tareas Pendientes'>
        <div>
          <Grid container spacing={2}>

            {/* Título y botones de opción */}
            <Grid item xs={12}>
              <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h6'>Listado de Tareas Pendientes</Typography>
              </Card>
            </Grid>
          </Grid>

          {/* Tabla donde se muestran los registros de los clientes */}
          <Grid item xs={12}>
            <Card>
              <DataGrid
                localeText={DATAGRID_LOCALE_TEXT}
                sx={{
                  width: '100%',
                  height: 1000,
                  backgroundColor: '#FFFFFF'
                }}
                rows={rows}
                columns={columns}
                onRowClick={handleRowClick}
              />
            </Card>
          </Grid>
        </div>
      </MainLayout>
    </>
  );

}