﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnalisisQuimicos.Core.Entities
{
    public partial class ParametrosElementoPlantaCliente : BaseEntity
    {
        public int? CodigoCliente { get; set; }
        public string NombreCliente { get; set; }
        public int? Oferta { get; set; }
        public string Elemento { get; set; }
        public DateTime? Fecha { get; set; }
        public bool? EsPlantilla { get; set; }
        public int? ComptadorLimInf { get; set; }
        public int? ComptadorLimSup { get; set; }
        public string ComptadorUnidades { get; set; }
        public bool? ComptadorActivo { get; set; }
        public bool? ComptadorVerInspector { get; set; }
        public int? PHLimInf { get; set; }
        public int? PHLimSup { get; set; }
        public string PHUnidades { get; set; }
        public bool? PHActivo { get; set; }
        public bool? PHVerInspector { get; set; }
        public int? TemperaturaLimInf { get; set; }
        public int? TemperaturaLimSup { get; set; }
        public string TemperaturaUnidades { get; set; }
        public bool? TemperaturaActivo { get; set; }
        public bool? TemperaturaVerInspector { get; set; }
        public int? ConductivitatLimInf { get; set; }
        public int? ConductivitatLimSup { get; set; }
        public string ConductivitatUnidades { get; set; }
        public bool? ConductivitatActivo { get; set; }
        public bool? ConductivitatVerInspector { get; set; }
        public int? TDSLimInf { get; set; }
        public int? TDSLimSup { get; set; }
        public string TDSUnidades { get; set; }
        public bool? TDSActivo { get; set; }
        public bool? TDSVerInspector { get; set; }
        public int? AlcalinitatMLimInf { get; set; }
        public int? AlcalinitatMLimSup { get; set; }
        public string AlcalinitatMUnidades { get; set; }
        public bool? AlcalinitatMActivo { get; set; }
        public bool? AlcalinitatMVerInspector { get; set; }
        public int? AlcalinitatPLimInf { get; set; }
        public int? AlcalinitatPLimSup { get; set; }
        public string AlcalinitatPUnidades { get; set; }
        public bool? AlcalinitatPActivo { get; set; }
        public bool? AlcalinitatPVerInspector { get; set; }
        public int? DuresaCalcicaLimInf { get; set; }
        public int? DuresaCalcicaLimSup { get; set; }
        public string DuresaCalcicaUnidades { get; set; }
        public bool? DuresaCalcicaActivo { get; set; }
        public bool? DuresaCalcicaVerInspector { get; set; }
        public int? DuresaTotalLimInf { get; set; }
        public int? DuresaTotalLimSup { get; set; }
        public string DuresaTotalUnidades { get; set; }
        public bool? DuresaTotalActivo { get; set; }
        public bool? DuresaTotalVerInspector { get; set; }
        public int? TerbolesaLimInf { get; set; }
        public int? TerbolesaLimSup { get; set; }
        public string TerbolesaUnidades { get; set; }
        public bool? TerbolesaActivo { get; set; }
        public bool? TerbolesaVerInspector { get; set; }
        public int? FeLimInf { get; set; }
        public int? FeLimSup { get; set; }
        public string FeUnidades { get; set; }
        public bool? FeActivo { get; set; }
        public bool? FeVerInspector { get; set; }
        public int? ClorursLimInf { get; set; }
        public int? ClorursLimSup { get; set; }
        public string ClorursUnidades { get; set; }
        public bool? ClorursActivo { get; set; }
        public bool? ClorursVerInspector { get; set; }
        public int? SulfatsLimInf { get; set; }
        public int? SulfatsLimSup { get; set; }
        public string SulfatsUnidades { get; set; }
        public bool? SulfatsActivo { get; set; }
        public bool? SulfatsVerInspector { get; set; }
        public int? SilicatsLimInf { get; set; }
        public int? SilicatsLimSup { get; set; }
        public string SilicatsUnidades { get; set; }
        public bool? SilicatsActivo { get; set; }
        public bool? SilicatsVerInspector { get; set; }
        public int? ClorLliureLimInf { get; set; }
        public int? ClorLliureLimSup { get; set; }
        public string ClorLliureUnidades { get; set; }
        public bool? ClorLliureActivo { get; set; }
        public bool? ClorLliureVerInspector { get; set; }
        public int? ClorTotalLimInf { get; set; }
        public int? ClorTotalLimSup { get; set; }
        public string ClorTotalUnidades { get; set; }
        public bool? ClorTotalActivo { get; set; }
        public bool? ClorTotalVerInspector { get; set; }
        public int? BromLimInf { get; set; }
        public int? BromLimSup { get; set; }
        public string BromUnidades { get; set; }
        public bool? BromActivo { get; set; }
        public bool? BromVerInspector { get; set; }
        public int? SulfitsLimInf { get; set; }
        public int? SulfitsLimSup { get; set; }
        public string SulfitsUnidades { get; set; }
        public bool? SulfitsActivo { get; set; }
        public bool? SulfitsVerInspector { get; set; }
        public int? OrtofosfatsPO4LimInf { get; set; }
        public int? OrtofosfatsPO4LimSup { get; set; }
        public string OrtofosfatsPO4Unidades { get; set; }
        public bool? OrtofosfatsPO4Activo { get; set; }
        public bool? OrtofosfatsPO4VerInspector { get; set; }
        public int? MoO4LimInf { get; set; }
        public int? MoO4LimSup { get; set; }
        public string MoO4Unidades { get; set; }
        public bool? MoO4Activo { get; set; }
        public bool? MoO4VerInspector { get; set; }
        public int? IsotiazolonaLimInf { get; set; }
        public int? IsotiazolonaLimSup { get; set; }
        public string IsotiazolonaUnidades { get; set; }
        public bool? IsotiazolonaActivo { get; set; }
        public bool? IsotiazolonaVerInspector { get; set; }
        public int? AquaproxAB5310LimInf { get; set; }
        public int? AquaproxAB5310LimSup { get; set; }
        public string AquaproxAB5310Unidades { get; set; }
        public bool? AquaproxAB5310Activo { get; set; }
        public bool? AquaproxAB5310VerInspector { get; set; }
        public int? BiopolLB5LimInf { get; set; }
        public int? BiopolLB5LimSup { get; set; }
        public string BiopolLB5Unidades { get; set; }
        public bool? BiopolLB5Activo { get; set; }
        public bool? BiopolLB5VerInspector { get; set; }
        public int? MefacideLGLimInf { get; set; }
        public int? MefacideLGLimSup { get; set; }
        public string MefacideLGUnidades { get; set; }
        public bool? MefacideLGActivo { get; set; }
        public bool? MefacideLGVerInspector { get; set; }
        public int? BiopolIB200LimInf { get; set; }
        public int? BiopolIB200LimSup { get; set; }
        public string BiopolIB200Unidades { get; set; }
        public bool? BiopolIB200Activo { get; set; }
        public bool? BiopolIB200VerInspector { get; set; }
        public string Campo1Nombre { get; set; }
        public int? Campo1LimInf { get; set; }
        public int? Campo1LimSup { get; set; }
        public string Campo1Unidades { get; set; }
        public bool? Campo1Activo { get; set; }
        public bool? Campo1VerInspector { get; set; }
        public string Campo2Nombre { get; set; }
        public int? Campo2LimInf { get; set; }
        public int? Campo2LimSup { get; set; }
        public string Campo2Unidades { get; set; }
        public bool? Campo2Activo { get; set; }
        public bool? Campo2VerInspector { get; set; }
        public string Campo3Nombre { get; set; }
        public int? Campo3LimInf { get; set; }
        public int? Campo3LimSup { get; set; }
        public string Campo3Unidades { get; set; }
        public bool? Campo3Activo { get; set; }
        public bool? Campo3VerInspector { get; set; }
        public string Campo4Nombre { get; set; }
        public int? Campo4LimInf { get; set; }
        public int? Campo4LimSup { get; set; }
        public string Campo4Unidades { get; set; }
        public bool? Campo4Activo { get; set; }
        public bool? Campo4VerInspector { get; set; }
        public string Campo5Nombre { get; set; }
        public int? Campo5LimInf { get; set; }
        public int? Campo5LimSup { get; set; }
        public string Campo5Unidades { get; set; }
        public bool? Campo5Activo { get; set; }
        public bool? Campo5VerInspector { get; set; }
        public string Campo6Nombre { get; set; }
        public int? Campo6LimInf { get; set; }
        public int? Campo6LimSup { get; set; }
        public string Campo6Unidades { get; set; }
        public bool? Campo6Activo { get; set; }
        public bool? Campo6VerInspector { get; set; }
        public string Campo7Nombre { get; set; }
        public int? Campo7LimInf { get; set; }
        public int? Campo7LimSup { get; set; }
        public string Campo7Unidades { get; set; }
        public bool? Campo7Activo { get; set; }
        public bool? Campo7VerInspector { get; set; }
        public string Campo8Nombre { get; set; }
        public int? Campo8LimInf { get; set; }
        public int? Campo8LimSup { get; set; }
        public string Campo8Unidades { get; set; }
        public bool? Campo8Activo { get; set; }
        public bool? Campo8VerInspector { get; set; }

    }
}
