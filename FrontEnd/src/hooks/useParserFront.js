import { useState } from 'react';
import { crearParametrizacionFront } from '../helpers';

export const useParserFront = () => {

    const [ parametrosFront, setParametrosFront ] = useState({
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
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            alcalinitatP: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            aquaproxAB5310: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            biopolIB200: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            biopolLB5: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            brom: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            clorLliure: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            clorTotal: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            clorurs: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            comptador: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            conductivitat: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            duresaCalcica: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            duresaTotal: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            fe: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            isotiazolona: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            mefacideLG: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            moO4: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            ortofosfatsPO4: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            ph: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            silicats: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            sulfats: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            sulfits: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            tds: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            temperatura: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            terbolesa: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            }
        },
        parametrosPersonalizados: {
            campo1: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            campo2: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            campo3: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            campo4: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            campo5: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            campo6: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            campo7: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
                Unidades: '',
                VerInspector: false
            },
            campo8: {
                Activo: false,
                Nombre: '',
                LimInf: 0,
                LimSup: 0,
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

    const setDatosParametrosFront = ( parametrosBack ) => {

        setParametrosFront( crearParametrizacionFront( parametrosBack ) );

    };

    const cambiarCampoFijo = ( nombreCampo, objeto, nombreParametro, dato ) => {

        console.log( objeto );
        
        setParametrosFront({
            ...parametrosFront,
            parametrosFijos: {
                ...parametrosFront.parametrosFijos,
                [nombreCampo]: {
                    ...objeto,
                    [nombreParametro]: dato
                }
            }
        });

    }

    return {
        //* Propiedades
        parametrosFront,

        //* Métodos
        setDatosParametrosFront,
        cambiarCampoFijo
    }
}