import React, { useEffect, useState } from 'react'
import { getContactosByCodigoCliente } from '../../api'
import { Checkbox, Grid } from '@mui/material';

import './SeleccionarContacto.css'

function SeleccionarContactos({ codigoCliente, correosSeleccionados, setCorreosSeleccionados }) {

    const [contactosDisponibles, setContactosDisponibles] = useState([]);
    const [arrayCorreosSeleccionados, setArrayCorreosSeleccionados] = useState([]);

    useEffect(async () => {
        await getContactosByCodigoCliente(codigoCliente).then(resp => {
            setContactosDisponibles(resp);
        });
        setArrayCorreosSeleccionados(correosSeleccionados.split(';'));
    }, [])

    const comprobarCorreoSeleccionado = (email) =>{
        if (arrayCorreosSeleccionados.includes(email)) {
            return true;
        }else{
            return false;
        }
    }

    const seleccionarCorreo = (email) =>{
        if (arrayCorreosSeleccionados.includes(email)) {
            setArrayCorreosSeleccionados(arrayCorreosSeleccionados.filter((correo) => correo !== email));
            let aux = correosSeleccionados.replace(email,'');
            setCorreosSeleccionados(limpiarPuntosCadenaContactos(aux));
        }else{
            let auxCorreos = [];
            arrayCorreosSeleccionados.map(correo =>{
                auxCorreos.push(correo);
            });
            auxCorreos.push(email);
            if (correosSeleccionados.length === 0) {
                setCorreosSeleccionados(email);
            }else{
                let aux = limpiarPuntosCadenaContactos(correosSeleccionados+';'+email);
                setCorreosSeleccionados(aux);
            }
            setArrayCorreosSeleccionados(auxCorreos);
        }
    }

    const limpiarPuntosCadenaContactos = (cadena) =>{
        let aux = cadena;
        console.log(aux,'ENTRO EN LIMPIAR PUNTOS');
        if (aux[aux.length-1] === ';') {
            console.log(aux[aux.length-1],'COMPRUEBO ULTIMO CARACTER');
            aux = reemplazarCadena(aux,cadena.length, '');
            console.log(aux,'QUITO PUNTOS DEL FINAL');
        }
        if (aux[0] === ';') {
            console.log(aux[0],'COMPRUEBO PRIMER CARACTER');
            aux = aux.replace(';','');
            console.log(aux,'QUITO PUNTOS DEL COMIENZO');
        }
        aux = aux.replace(';;',';');
        console.log(aux,'QUITO DOBLES PUNTOS');
        return aux;
    }

    const reemplazarCadena = (string,index, replacement) => {
        return string.substring(0, index) + replacement + string.substring(index + replacement.length);
    }

    return (
        <Grid container>
            {
                contactosDisponibles.map((contacto) => {
                    return (
                        <Grid md={12} className='contacto-container'
                            key={contacto.id}>
                            <p>{contacto.nombre}</p>
                            <p>{contacto.email}</p>
                            <Checkbox checked={comprobarCorreoSeleccionado(contacto.email)}
                            onClick={() =>seleccionarCorreo(contacto.email)}>

                            </Checkbox>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

export default SeleccionarContactos