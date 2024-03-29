import { useState } from 'react';
import { crearParametrizacionFront } from '../helpers';

export const useParserFront = () => {

    const [ parametrosFront, setParametrosFront ] = useState({
        cliente: {
            id: 0,
            codigoCliente: 0,
            elemento: '',
            esPlantilla: true,
            nombreCliente: '',
            oferta: 0,
            fecha: null
        },
        parametrosFijos: {
            alcalinitatM: {
                Activo: false,
                Nombre: 'alcalinitatM',
                LimInf: 0,
                LimSup: 0,
                Unidades: 'mg/l CaCO3',
                VerInspector: false
            },
            alcalinitatP: {
                Activo: false,
                Nombre: 'alcalinitatP',
                LimInf: 0,
                LimSup: 0,
                Unidades: 'mg/l CaCO3',
                VerInspector: false
            },
            aquaproxAB5310: {
                Activo: false,
                Nombre: 'aquaproxAB5310',
                LimInf: 0,
                LimSup: 0,
                Unidades: 'mg/l',
                VerInspector: false
            },
            biopolIB200: {
                Activo: false,
                Nombre: 'biopolIB200',
                LimInf: 0,
                LimSup: 0,
                Unidades: 'mg/l',
                VerInspector: false
            },
            biopolLB5: {
                Activo: false,
                Nombre: 'biopolLB5',
                LimInf: 0,
                LimSup: 0,
                Unidades: 'mg/l',
                VerInspector: false
            },
            brom: {
                Activo: false,
                Nombre: 'brom',
                LimInf: 0,
                LimSup: 0,
                Unidades: 'mg/l',
                VerInspector: false
            },
            clorLliure: {
                Activo: false,
                Nombre: 'clorLliure',
                LimInf: 0,
                LimSup: 0,
                Unidades: 'mg/l',
                VerInspector: false
            },
            clorTotal: {
                Activo: false,
                Nombre: 'clorTotal',
                LimInf: 0,
                LimSup: 0,
                Unidades: 'mg/l',
                VerInspector: false
            },
            clorurs: {
                Activo: false,
                Nombre: 'clorurs',
                LimInf: 0,
                LimSup: 0,
                Unidades: 'mg/l',
                VerInspector: false
            },
            comptador: {
                Activo: false,
                Nombre: 'comptador',
                LimInf: 0,
                LimSup: 0,
                Unidades: 'm3',
                VerInspector: false
            },
            conductivitat: {
                Activo: false,
                Nombre: 'conductivitat',
                LimInf: 0,
                LimSup: 0,
                Unidades: 'µS/cm',
                VerInspector: false
            },
            duresaCalcica: {
                Activo: false,
                Nombre: 'duresaCalcica',
                LimInf: 0,
                LimSup: 0,
                Unidades: 'mg/l CaCO3',
                VerInspector: false
            },
            duresaTotal: {
                Activo: false,
                Nombre: 'duresaTotal',
                LimInf: 0,
                LimSup: 0,
                Unidades: 'mg/l CaCO3',
                VerInspector: false
            },
            fe: {
                Activo: false,
                Nombre: 'fe',
                LimInf: 0,
                LimSup: 0,
                Unidades: 'mg/l',
                VerInspector: false
            },
            isotiazolona: {
                Activo: false,
                Nombre: 'isotiazolona',
                LimInf: 0,
                LimSup: 0,
                Unidades: 'mg/l',
                VerInspector: false
            },
            mefacideLG: {
                Activo: false,
                Nombre: 'mefacideLG',
                LimInf: 0,
                LimSup: 0,
                Unidades: 'mg/l',
                VerInspector: false
            },
            moO4: {
                Activo: false,
                Nombre: 'moO4',
                LimInf: 0,
                LimSup: 0,
                Unidades: 'mg/l',
                VerInspector: false
            },
            ortofosfatsPO4: {
                Activo: false,
                Nombre: 'ortofosfatsPO4',
                LimInf: 0,
                LimSup: 0,
                Unidades: 'mg/l',
                VerInspector: false
            },
            ph: {
                Activo: false,
                Nombre: 'ph',
                LimInf: 0,
                LimSup: 0,
                Unidades: 'Un. pH',
                VerInspector: false
            },
            silicats: {
                Activo: false,
                Nombre: 'silicats',
                LimInf: 0,
                LimSup: 0,
                Unidades: 'mg/l',
                VerInspector: false
            },
            sulfats: {
                Activo: false,
                Nombre: 'sulfats',
                LimInf: 0,
                LimSup: 0,
                Unidades: 'mg/l',
                VerInspector: false
            },
            sulfits: {
                Activo: false,
                Nombre: 'sulfits',
                LimInf: 0,
                LimSup: 0,
                Unidades: 'mg/l',
                VerInspector: false
            },
            tds: {
                Activo: false,
                Nombre: 'tds',
                LimInf: 0,
                LimSup: 0,
                Unidades: 'mg/l',
                VerInspector: false
            },
            temperatura: {
                Activo: false,
                Nombre: 'temperatura',
                LimInf: 0,
                LimSup: 0,
                Unidades: 'ºC',
                VerInspector: false
            },
            terbolesa: {
                Activo: false,
                Nombre: 'terbolesa',
                LimInf: 0,
                LimSup: 0,
                Unidades: 'N.T.U',
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

    };

    const cambiarCampoPersonalizado = ( nombreCampo, objeto, nombreParametro, dato ) => {
        
        setParametrosFront({
            ...parametrosFront,
            parametrosPersonalizados: {
                ...parametrosFront.parametrosPersonalizados,
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
        cambiarCampoFijo,
        cambiarCampoPersonalizado
    }
}