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
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            alcalinitatP: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            aquaproxAB5310: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            biopolIB200: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            biopolLB5: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            brom: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            clorLliure: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            clorTotal: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            clorurs: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            comptador: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            conductivitat: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            duresaCalcica: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            duresaTotal: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            fe: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            isotiazolona: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            mefacideLG: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            moO4: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            ortofosfatsPO4: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            ph: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            silicats: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            sulfats: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            sulfits: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            tds: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            temperatura: {
                Activo: false,
                Nombre: '',
                LimInf: '',
                LimSup: '',
                Unidades: '',
                VerInspector: false
            },
            terbolesa: {
                Activo: false,
                Nombre: '',
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

    return {
        //* Propiedades
        nuevaParametrizacion,
        //* Métodos
        setDatosParametrizacion,
        cambiarParametros
    }
}