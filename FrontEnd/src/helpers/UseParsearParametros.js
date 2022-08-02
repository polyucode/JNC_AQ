import { useState } from 'react';
import { CrearParametrizacion } from './CrearParametrizacion';

export const useParsearParametros = () => {

    const [nuevaParametrizacion, setNuevaParametrizacion] = useState({
        cliente: {
            codigoCliente: 0,
            elemento: '',
            esPlantilla: true,
            nombreCliente: '',
            oferta: 0
        },
        parametrosFijos: {
            alcalinitatM: {
                Activo: false,
                Nombre: 'alcalinitatM',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            alcalinitatP: {
                Activo: false,
                Nombre: 'alcalinitatP',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            aquaproxAB5310: {
                Activo: false,
                Nombre: 'aquaproxAB5310',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            biopolIB200: {
                Activo: false,
                Nombre: 'biopolIB200',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            biopolLB5: {
                Activo: false,
                Nombre: 'biopolLB5',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            brom: {
                Activo: false,
                Nombre: 'brom',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            clorLliure: {
                Activo: false,
                Nombre: 'clorLliure',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            clorTotal: {
                Activo: false,
                Nombre: 'clorTotal',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            clorurs: {
                Activo: false,
                Nombre: 'clorurs',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            comptador: {
                Activo: false,
                Nombre: 'comptador',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            conductivitat: {
                Activo: false,
                Nombre: 'conductivitat',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            duresaCalcica: {
                Activo: false,
                Nombre: 'duresaCalcica',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            duresaTotal: {
                Activo: false,
                Nombre: 'duresaTotal',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            fe: {
                Activo: false,
                Nombre: 'fe',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            isotiazolona: {
                Activo: false,
                Nombre: 'isotiazolona',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            mefacideLG: {
                Activo: false,
                Nombre: 'mefacideLG',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            moO4: {
                Activo: false,
                Nombre: 'moO4',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            ortofosfatsPO4: {
                Activo: false,
                Nombre: 'ortofosfatsPO4',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            ph: {
                Activo: false,
                Nombre: 'ph',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            silicats: {
                Activo: false,
                Nombre: 'silicats',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            sulfats: {
                Activo: false,
                Nombre: 'sulfats',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            sulfits: {
                Activo: false,
                Nombre: 'sulfits',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            tds: {
                Activo: false,
                Nombre: 'tds',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            temperatura: {
                Activo: false,
                Nombre: 'temperatura',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            terbolesa: {
                Activo: false,
                Nombre: 'terbolesa',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            }
        },
        parametrosPersonalizados: {
            campo1: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            campo2: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            campo3: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            campo4: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            campo5: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            campo6: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            campo7: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            campo8: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            }
        },
        dbInfo: {
            delDate: null,
            delIdUser: null,
            deleted: null,
            modDate: null,
            modIdUser: null
        }
    });

    const setDatosParametrizacion = (datos) => {
        setNuevaParametrizacion(CrearParametrizacion(datos));
    };

    const cambiarParametros = (datos) => {
        setNuevaParametrizacion(datos);
    }

    const cambiarCampoFijo = ( nombreCampo, objeto, nombreParametro, dato ) => {

        setNuevaParametrizacion({
            ...nuevaParametrizacion,
            parametrosFijos: {
                ...nuevaParametrizacion.parametrosFijos,
                [nombreCampo]: {
                    ...objeto,
                    [nombreParametro]: dato
                }
            }
        });
        
    }

    return {
        //* Propiedades
        nuevaParametrizacion,
        //* Métodos
        setDatosParametrizacion,
        cambiarParametros,
        cambiarCampoFijo
    }
}