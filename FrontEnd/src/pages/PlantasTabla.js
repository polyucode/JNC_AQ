import React from 'react';
import { Tab, Box } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';

import './PlantasTabla.css';
import TablaElementosTabla from '../components/TablaElementosTabla';

function PlantasTabla() {

    const planta = {
        idCliente: '00256',
        nombreCliente: 'Seat',
        elementos: [{
            nombre: 'Refrigeración',
            numero: 1,
            posicion: 1,
            nivel: 1,
            propiedades: {
                fisicoQuimico: true,
                aerobios: false,
                legionela: true,
                aguaPotable: true,
                aguasResiduales: false
            },
            plantilla: {
                EsPlantilla: false,
                Comptador: {
                    LimInf: '5',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                PH: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: true,
                    VerInspector: false,
                },
                Temperatura: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'C',
                    Activo: true,
                    VerInspector: false,
                },
                Conductivitat: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: false,
                    VerInspector: false,
                },
                AlcalinitatM: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                AlcalinitatP: {

                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: false,
                },
                DuresaCalcica: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                DuresaTotal: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: true,
                },
                Terbolesa: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: false,
                },
                Fe: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                Clorurs: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: true,
                },
                Sulfots: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: true,
                    VerInspector: true,
                },
                ClorLliure: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'C',
                    Activo: false,
                    VerInspector: false,
                },
                ClorTotal: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: false,
                    VerInspector: false,
                },
                Brom: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'mg/l',
                    Activo: false,
                    VerInspector: false,
                },
                Sulfits: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                Campo1: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: true
                },
                Campo2: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo3: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo4: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo5: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo6: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo7: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo8: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo9: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo10: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo11: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo12: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                }
            }
        },
        {
            nombre: 'Depósito',
            numero: 1,
            posicion: 1,
            nivel: 2,
            propiedades: {
                fisicoQuimico: true,
                aerobios: true,
                legionela: true,
                aguaPotable: true,
                aguasResiduales: false
            },
            plantilla: {
                EsPlantilla: false,
                Comptador: {
                    LimInf: '5',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                PH: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: false,
                    VerInspector: false,
                },
                Temperatura: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'C',
                    Activo: false,
                    VerInspector: false,
                },
                Conductivitat: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: false,
                    VerInspector: false,
                },
                AlcalinitatM: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                AlcalinitatP: {

                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: false,
                },
                DuresaCalcica: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                DuresaTotal: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: true,
                },
                Terbolesa: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: false,
                },
                Fe: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                Clorurs: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: true,
                },
                Sulfots: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: true,
                    VerInspector: true,
                },
                ClorLliure: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'C',
                    Activo: false,
                    VerInspector: false,
                },
                ClorTotal: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: false,
                    VerInspector: false,
                },
                Brom: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'mg/l',
                    Activo: false,
                    VerInspector: false,
                },
                Sulfits: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                Campo1: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo2: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo3: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo4: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo5: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo6: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo7: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo8: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo9: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo10: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo11: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo12: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                }
            }
        },
        {
            nombre: 'Osmosis',
            numero: 1,
            posicion: 2,
            nivel: 2,
            propiedades: {
                fisicoQuimico: false,
                aerobios: false,
                legionela: true,
                aguaPotable: false,
                aguasResiduales: true
            },
            plantilla: {
                EsPlantilla: false,
                Comptador: {
                    LimInf: '5',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: false,
                },
                PH: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: true,
                    VerInspector: false,
                },
                Temperatura: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'C',
                    Activo: true,
                    VerInspector: false,
                },
                Conductivitat: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: true,
                    VerInspector: false,
                },
                AlcalinitatM: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                AlcalinitatP: {

                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: false,
                },
                DuresaCalcica: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                DuresaTotal: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: true,
                },
                Terbolesa: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: false,
                },
                Fe: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: false,
                },
                Clorurs: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: true,
                },
                Sulfots: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: true,
                    VerInspector: true,
                },
                ClorLliure: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'C',
                    Activo: false,
                    VerInspector: false,
                },
                ClorTotal: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: false,
                    VerInspector: false,
                },
                Brom: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'mg/l',
                    Activo: true,
                    VerInspector: false,
                },
                Sulfits: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: false,
                },
                Campo1: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo2: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo3: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                },
                Campo4: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo5: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo6: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo7: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo8: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo9: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo10: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo11: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo12: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                }
            }
        },
        {
            nombre: 'Torre',
            numero: 1,
            posicion: 1,
            nivel: 3,
            propiedades: {
                fisicoQuimico: false,
                aerobios: false,
                legionela: true,
                aguaPotable: true,
                aguasResiduales: true
            },
            plantilla: {
                EsPlantilla: false,
                Comptador: {
                    LimInf: '5',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                PH: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: true,
                    VerInspector: false,
                },
                Temperatura: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'C',
                    Activo: true,
                    VerInspector: false,
                },
                Conductivitat: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: false,
                    VerInspector: false,
                },
                AlcalinitatM: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                AlcalinitatP: {

                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: false,
                },
                DuresaCalcica: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                DuresaTotal: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: true,
                },
                Terbolesa: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: false,
                },
                Fe: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                Clorurs: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: true,
                },
                Sulfots: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: true,
                    VerInspector: true,
                },
                ClorLliure: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'C',
                    Activo: false,
                    VerInspector: false,
                },
                ClorTotal: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: false,
                    VerInspector: false,
                },
                Brom: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'mg/l',
                    Activo: false,
                    VerInspector: false,
                },
                Sulfits: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                Campo1: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo2: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo3: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo4: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo5: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo6: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo7: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo8: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo9: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo10: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo11: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo12: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                }
            }
        },
        {
            nombre: 'Torre',
            numero: 2,
            posicion: 2,
            nivel: 3,
            propiedades: {
                fisicoQuimico: true,
                aerobios: false,
                legionela: false,
                aguaPotable: true,
                aguasResiduales: true
            },
            plantilla: {
                EsPlantilla: false,
                Comptador: {
                    LimInf: '5',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                PH: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: true,
                    VerInspector: false,
                },
                Temperatura: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'C',
                    Activo: true,
                    VerInspector: false,
                },
                Conductivitat: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: false,
                    VerInspector: false,
                },
                AlcalinitatM: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                AlcalinitatP: {

                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: false,
                },
                DuresaCalcica: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                DuresaTotal: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: true,
                },
                Terbolesa: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: false,
                },
                Fe: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                Clorurs: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: true,
                },
                Sulfots: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: true,
                    VerInspector: true,
                },
                ClorLliure: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'C',
                    Activo: false,
                    VerInspector: false,
                },
                ClorTotal: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: false,
                    VerInspector: false,
                },
                Brom: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'mg/l',
                    Activo: false,
                    VerInspector: false,
                },
                Sulfits: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                Campo1: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo2: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo3: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo4: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo5: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo6: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo7: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo8: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo9: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo10: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo11: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo12: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                }
            }
        },
        {
            nombre: 'Caldera',
            numero: 1,
            posicion: 1,
            nivel: 4,
            propiedades: {
                fisicoQuimico: false,
                aerobios: true,
                legionela: true,
                aguaPotable: false,
                aguasResiduales: false
            },
            plantilla: {
                EsPlantilla: false,
                Comptador: {
                    LimInf: '5',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                PH: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: true,
                    VerInspector: false,
                },
                Temperatura: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'C',
                    Activo: true,
                    VerInspector: false,
                },
                Conductivitat: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: false,
                    VerInspector: false,
                },
                AlcalinitatM: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                AlcalinitatP: {

                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: false,
                },
                DuresaCalcica: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                DuresaTotal: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: true,
                },
                Terbolesa: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: false,
                },
                Fe: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                Clorurs: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: true,
                },
                Sulfots: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: true,
                    VerInspector: true,
                },
                ClorLliure: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'C',
                    Activo: false,
                    VerInspector: false,
                },
                ClorTotal: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: false,
                    VerInspector: false,
                },
                Brom: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'mg/l',
                    Activo: false,
                    VerInspector: false,
                },
                Sulfits: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                Campo1: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo2: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo3: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo4: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo5: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo6: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo7: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo8: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo9: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo10: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo11: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo12: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                }
            }
        }]
    }
    let listaElementos = planta.elementos;

    const [value, setValue] = React.useState('0');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
    <div className="contenedor">
        <div className='cliente'>
            <h6>Cliente</h6>
            <hr/>
            <table>
                <tbody>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                    </tr>
                    <tr>
                        <td>{planta.idCliente}</td>
                        <td>{planta.nombreCliente}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList id="tab-list" onChange={handleChange}>
                        {
                            listaElementos.map((elemento,index) => <Tab key={index} label={elemento.nombre+' '+elemento.numero} value={index.toString()} />)
                        }
                    </TabList>
                </Box>

                {
                    listaElementos.map((elemento,index) => <TablaElementosTabla key={index} nombre={elemento.nombre} value={index} plantilla={elemento.plantilla} />)
                }
            </TabContext>
        </Box>
        <div className='botones-menu'>
            <button>Cancelar</button>
            <button>Aceptar</button>
        </div>
    </div>
    );
}

export default PlantasTabla;