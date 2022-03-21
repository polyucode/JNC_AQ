﻿using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class ParametrosElementoPlantaCliente : BaseEntity
    {
        public int? IdCliente { get; set; }
        public int? IdElemento { get; set; }
        public int? IdPlanta { get; set; }
        public bool? EsPlantilla { get; set; }
        public float? Comptador_LimInf { get; set; }
        public float? Comptador_LimSup { get; set; }
        public int? Comptador_Unidades { get; set; }
        public bool? Comptador_Activo { get; set; }
        public bool? Comptador_VerInspector { get; set; }
        public float? PH_LimInf { get; set; }
        public float? PH_LimSup { get; set; }
        public int? PH_Unidades { get; set; }
        public bool? PH_Activo { get; set; }
        public bool? PH_VerInspector { get; set; }
        public float? Temperatura_LimInf { get; set; }
        public float? Temperatura_LimSup { get; set; }
        public int? Temperatura_Unidades { get; set; }
        public bool? Temperatura_Activo { get; set; }
        public bool? Temperatura_VerInspector { get; set; }
        public float? Conductivitat_LimInf { get; set; }
        public float? Conductivitat_LimSup { get; set; }
        public int? Conductivitat_Unidades { get; set; }
        public bool? Conductivitat_Activo { get; set; }
        public bool? Conductivitat_VerInspector { get; set; }
        public float? AlcalinitatM_LimInf { get; set; }
        public float? AlcalinitatM_LimSup { get; set; }
        public int? AlcalinitatM_Unidades { get; set; }
        public bool? AlcalinitatM_Activo { get; set; }
        public bool? AlcalinitatM_VerInspector { get; set; }
        public float? AlcalinitatP_LimInf { get; set; }
        public float? AlcalinitatP_LimSup { get; set; }
        public int? AlcalinitatP_Unidades { get; set; }
        public bool? AlcalinitatP_Activo { get; set; }
        public bool? AlcalinitatP_VerInspector { get; set; }
        public float? DuresaCalcica_LimInf { get; set; }
        public float? DuresaCalcica_LimSup { get; set; }
        public int? DuresaCalcica_Unidades { get; set; }
        public bool? DuresaCalcica_Activo { get; set; }
        public bool? DuresaCalcica_VerInspector { get; set; }
        public float? DuresaTotal_LimInf { get; set; }
        public float? DuresaTotal_LimSup { get; set; }
        public int? DuresaTotal_Unidades { get; set; }
        public bool? DuresaTotal_Activo { get; set; }
        public bool? DuresaTotal_VerInspector { get; set; }
        public float? Terbolesa_LimInf { get; set; }
        public float? Terbolesa_LimSup { get; set; }
        public int? Terbolesa_Unidades { get; set; }
        public bool? Terbolesa_Activo { get; set; }
        public bool? Terbolesa_VerInspector { get; set; }
        public float? Fe_LimInf { get; set; }
        public float? Fe_LimSup { get; set; }
        public int? Fe_Unidades { get; set; }
        public bool? Fe_Activo { get; set; }
        public bool? Fe_VerInspector { get; set; }
        public float? Clorurs_LimInf { get; set; }
        public float? Clorurs_LimSup { get; set; }
        public int? Clorurs_Unidades { get; set; }
        public bool? Clorurs_Activo { get; set; }
        public bool? Clorurs_VerInspector { get; set; }
        public float? Sulfots_LimInf { get; set; }
        public float? Sulfots_LimSup { get; set; }
        public int? Sulfots_Unidades { get; set; }
        public bool? Sulfots_Activo { get; set; }
        public bool? Sulfots_VerInspector { get; set; }
        public float? ClorLliure_LimInf { get; set; }
        public float? ClorLliure_LimSup { get; set; }
        public int? ClorLliure_Unidades { get; set; }
        public bool? ClorLliure_Activo { get; set; }
        public bool? ClorLliure_VerInspector { get; set; }
        public float? ClorTotal_LimInf { get; set; }
        public float? ClorTotal_LimSup { get; set; }
        public int? ClorTotal_Unidades { get; set; }
        public bool? ClorTotal_Activo { get; set; }
        public bool? ClorTotal_VerInspector { get; set; }
        public float? Brom_LimInf { get; set; }
        public float? Brom_LimSup { get; set; }
        public int? Brom_Unidades { get; set; }
        public bool? Brom_Activo { get; set; }
        public bool? Brom_VerInspector { get; set; }
        public float? Sulfits_LimInf { get; set; }
        public float? Sulfits_LimSup { get; set; }
        public int? Sulfits_Unidades { get; set; }
        public bool? Sulfits_Activo { get; set; }
        public bool? Sulfits_VerInspector { get; set; }
        public string Campo1_Nombre { get; set; }
        public float? Campo1_LimInf { get; set; }
        public float? Campo1_LimSup { get; set; }
        public int? Campo1_Unidades { get; set; }
        public bool? Campo1_Activo { get; set; }
        public bool? Campo1_VerInspector { get; set; }
        public string Campo2_Nombre { get; set; }
        public float? Campo2_LimInf { get; set; }
        public float? Campo2_LimSup { get; set; }
        public int? Campo2_Unidades { get; set; }
        public bool? Campo2_Activo { get; set; }
        public bool? Campo2_VerInspector { get; set; }
        public string Campo3_Nombre { get; set; }
        public float? Campo3_LimInf { get; set; }
        public float? Campo3_LimSup { get; set; }
        public int? Campo3_Unidades { get; set; }
        public bool? Campo3_Activo { get; set; }
        public bool? Campo3_VerInspector { get; set; }
        public string Campo4_Nombre { get; set; }
        public float? Campo4_LimInf { get; set; }
        public float? Campo4_LimSup { get; set; }
        public int? Campo4_Unidades { get; set; }
        public bool? Campo4_Activo { get; set; }
        public bool? Campo4_VerInspector { get; set; }
        public string Campo5_Nombre { get; set; }
        public float? Campo5_LimInf { get; set; }
        public float? Campo5_LimSup { get; set; }
        public int? Campo5_Unidades { get; set; }
        public bool? Campo5_Activo { get; set; }
        public bool? Campo5_VerInspector { get; set; }
        public string Campo6_Nombre { get; set; }
        public float? Campo6_LimInf { get; set; }
        public float? Campo6_LimSup { get; set; }
        public int? Campo6_Unidades { get; set; }
        public bool? Campo6_Activo { get; set; }
        public bool? Campo6_VerInspector { get; set; }
        public string Campo7_Nombre { get; set; }
        public float? Campo7_LimInf { get; set; }
        public float? Campo7_LimSup { get; set; }
        public int? Campo7_Unidades { get; set; }
        public bool? Campo7_Activo { get; set; }
        public bool? Campo7_VerInspector { get; set; }
        public string Campo8_Nombre { get; set; }
        public float? Campo8_LimInf { get; set; }
        public float? Campo8_LimSup { get; set; }
        public int? Campo8_Unidades { get; set; }
        public bool? Campo8_Activo { get; set; }
        public bool? Campo8_VerInspector { get; set; }
        public string Campo9_Nombre { get; set; }
        public float? Campo9_LimInf { get; set; }
        public float? Campo9_LimSup { get; set; }
        public int? Campo9_Unidades { get; set; }
        public bool? Campo9_Activo { get; set; }
        public bool? Campo9_VerInspector { get; set; }
        public string Campo10_Nombre { get; set; }
        public float? Campo10_LimInf { get; set; }
        public float? Campo10_LimSup { get; set; }
        public int? Campo10_Unidades { get; set; }
        public bool? Campo10_Activo { get; set; }
        public bool? Campo10_VerInspector { get; set; }
        public string Campo11_Nombre { get; set; }
        public float? Campo11_LimInf { get; set; }
        public float? Campo11_LimSup { get; set; }
        public int? Campo11_Unidades { get; set; }
        public bool? Campo11_Activo { get; set; }
        public bool? Campo11_VerInspector { get; set; }
        public string Campo12_Nombre { get; set; }
        public float? Campo12_LimInf { get; set; }
        public float? Campo12_LimSup { get; set; }
        public int? Campo12_Unidades { get; set; }
        public bool? Campo12_Activo { get; set; }
        public bool? Campo12_VerInspector { get; set; }
    }
}
