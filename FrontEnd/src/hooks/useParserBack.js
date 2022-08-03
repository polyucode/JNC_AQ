import { useState } from 'react';
import { crearParametrizacionBack } from '../helpers';

export const useParserBack = () => {

    const [ parametrosBack, setParametroBack ] = useState({
        alcalinitatMActivo: false,
        alcalinitatMLimInf: 0,
        alcalinitatMLimSup: 0,
        alcalinitatMNombre: "",
        alcalinitatMUnidades: "",
        alcalinitatMVerInspector: false,
        alcalinitatPActivo: false,
        alcalinitatPLimInf: 0,
        alcalinitatPLimSup: 0,
        alcalinitatPNombre: "",
        alcalinitatPUnidades: "",
        alcalinitatPVerInspector: false,
        aquaproxAB5310Activo: false,
        aquaproxAB5310LimInf: 0,
        aquaproxAB5310LimSup: 0,
        aquaproxAB5310Nombre: "",
        aquaproxAB5310Unidades: "",
        aquaproxAB5310VerInspector: false,
        biopolIB200Activo: false,
        biopolIB200LimInf: 0,
        biopolIB200LimSup: 0,
        biopolIB200Nombre: "",
        biopolIB200Unidades: "",
        biopolIB200VerInspector: false,
        biopolLB5Activo: false,
        biopolLB5LimInf: 0,
        biopolLB5LimSup: 0,
        biopolLB5Nombre: "",
        biopolLB5Unidades: "",
        biopolLB5VerInspector: false,
        bromActivo: false,
        bromLimInf: 0,
        bromLimSup: 0,
        bromNombre: "",
        bromUnidades: "",
        bromVerInspector: false,
        campo1Activo: false,
        campo1LimInf: 0,
        campo1LimSup: 0,
        campo1Nombre: "",
        campo1Unidades: "",
        campo1VerInspector: false,
        campo2Activo: false,
        campo2LimInf: 0,
        campo2LimSup: 0,
        campo2Nombre: "",
        campo2Unidades: "",
        campo2VerInspector: false,
        campo3Activo: false,
        campo3LimInf: 0,
        campo3LimSup: 0,
        campo3Nombre: "",
        campo3Unidades: "",
        campo3VerInspector: false,
        campo4Activo: false,
        campo4LimInf: 0,
        campo4LimSup: 0,
        campo4Nombre: "",
        campo4Unidades: "",
        campo4VerInspector: false,
        campo5Activo: false,
        campo5LimInf: 0,
        campo5LimSup: 0,
        campo5Nombre: "",
        campo5Unidades: "",
        campo5VerInspector: false,
        campo6Activo: false,
        campo6LimInf: 0,
        campo6LimSup: 0,
        campo6Nombre: "",
        campo6Unidades: "",
        campo6VerInspector: false,
        campo7Activo: false,
        campo7LimInf: 0,
        campo7LimSup: 0,
        campo7Nombre: "",
        campo7Unidades: "",
        campo7VerInspector: false,
        campo8Activo: false,
        campo8LimInf: 0,
        campo8LimSup: 0,
        campo8Nombre: "",
        campo8Unidades: "",
        campo8VerInspector: false,
        clorLliureActivo: false,
        clorLliureLimInf: 0,
        clorLliureLimSup: 0,
        clorLliureNombre: "",
        clorLliureUnidades: "",
        clorLliureVerInspector: false,
        clorTotalActivo: false,
        clorTotalLimInf: 0,
        clorTotalLimSup: 0,
        clorTotalNombre: "",
        clorTotalUnidades: "",
        clorTotalVerInspector: false,
        clorursActivo: false,
        clorursLimInf: 0,
        clorursLimSup: 0,
        clorursNombre: "",
        clorursUnidades: "",
        clorursVerInspector: false,
        codigoCliente: 0,
        comptadorActivo: false,
        comptadorLimInf: 0,
        comptadorLimSup: 0,
        comptadorNombre: "",
        comptadorUnidades: "",
        comptadorVerInspector: false,
        conductivitatActivo: false,
        conductivitatLimInf: 0,
        conductivitatLimSup: 0,
        conductivitatNombre: "",
        conductivitatUnidades: "",
        conductivitatVerInspector: false,
        delDate: null,
        delIdUser: null,
        deleted: null,
        duresaCalcicaActivo: false,
        duresaCalcicaLimInf: 0,
        duresaCalcicaLimSup: 0,
        duresaCalcicaNombre: "",
        duresaCalcicaUnidades: "",
        duresaCalcicaVerInspector: false,
        duresaTotalActivo: false,
        duresaTotalLimInf: 0,
        duresaTotalLimSup: 0,
        duresaTotalNombre: "",
        duresaTotalUnidades: "",
        duresaTotalVerInspector: false,
        elemento: "",
        esPlantilla: true,
        feActivo: false,
        feLimInf: 0,
        feLimSup: 0,
        feNombre: "",
        feUnidades: "",
        feVerInspector: false,
        isotiazolonaActivo: false,
        isotiazolonaLimInf: 0,
        isotiazolonaLimSup: 0,
        isotiazolonaNombre: "",
        isotiazolonaUnidades: "",
        isotiazolonaVerInspector: false,
        mefacideLGActivo: false,
        mefacideLGLimInf: 0,
        mefacideLGLimSup: 0,
        mefacideLGNombre: "",
        mefacideLGUnidades: "",
        mefacideLGVerInspector: false,
        moO4Activo: false,
        moO4LimInf: 0,
        moO4LimSup: 0,
        moO4Nombre: "",
        moO4Unidades: "",
        moO4VerInspector: false,
        modDate: null,
        modIdUser: null,
        nombreCliente: "",
        oferta: 0,
        ortofosfatsPO4Activo: false,
        ortofosfatsPO4LimInf: 0,
        ortofosfatsPO4LimSup: 0,
        ortofosfatsPO4Nombre: "",
        ortofosfatsPO4Unidades: "",
        ortofosfatsPO4VerInspector: false,
        phActivo: false,
        phLimInf: 0,
        phLimSup: 0,
        phNombre: "",
        phUnidades: "",
        phVerInspector: false,
        silicatsActivo: false,
        silicatsLimInf: 0,
        silicatsLimSup: 0,
        silicatsNombre: "",
        silicatsUnidades: "",
        silicatsVerInspector: false,
        sulfatsActivo: false,
        sulfatsLimInf: 0,
        sulfatsLimSup: 0,
        sulfatsNombre: "",
        sulfatsUnidades: "",
        sulfatsVerInspector: false,
        sulfitsActivo: false,
        sulfitsLimInf: 0,
        sulfitsLimSup: 0,
        sulfitsNombre: "",
        sulfitsUnidades: "",
        sulfitsVerInspector: false,
        tdsActivo: false,
        tdsLimInf: 0,
        tdsLimSup: 0,
        tdsNombre: "",
        tdsUnidades: "",
        tdsVerInspector: false,
        temperaturaActivo: false,
        temperaturaLimInf: 0,
        temperaturaLimSup: 0,
        temperaturaNombre: "",
        temperaturaUnidades: "",
        temperaturaVerInspector: false,
        terbolesaActivo: false,
        terbolesaLimInf: 0,
        terbolesaLimSup: 0,
        terbolesaNombre: "",
        terbolesaUnidades: "",
        terbolesaVerInspector: false
    });

    const setDatosParametrosBack = ( datosFront ) => {
        console.log( datosFront );
        setParametroBack( crearParametrizacionBack( datosFront ) );
    }

    return {
        //* Propiedades
        parametrosBack,

        //* Métodos
        setDatosParametrosBack
    }



}