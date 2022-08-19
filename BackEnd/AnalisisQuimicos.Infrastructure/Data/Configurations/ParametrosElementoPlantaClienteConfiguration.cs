using AnalisisQuimicos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnalisisQuimicos.Infrastructure.Data.Configurations
{
    public class ParametrosElementoPlantaClienteConfiguration : IEntityTypeConfiguration<ParametrosElementoPlantaCliente>
    {
        public void Configure(EntityTypeBuilder<ParametrosElementoPlantaCliente> builder)
        {

            builder.ToTable("GES_ParametrosElementoPlantaCliente");

            builder.HasKey(e => e.Id);

            builder.Property(e => e.AddDate).HasColumnType("datetime");

            builder.Property(e => e.DelDate).HasColumnType("datetime");

            builder.Property(e => e.ModDate).HasColumnType("datetime");

            builder.Property(e => e.CodigoCliente).HasColumnName("CodigoCliente");

            builder.Property(e => e.NombreCliente).HasColumnName("NombreCliente");

            builder.Property(e => e.Elemento).HasColumnName("Elemento");

            builder.Property(e => e.Oferta).HasColumnName("Oferta");

            builder.Property(e => e.Fecha).HasColumnName("Fecha");

            builder.Property(e => e.EsPlantilla).HasColumnName("EsPlantilla");


            builder.Property(e => e.ComptadorLimInf).HasColumnName("ComptadorLimInf");

            builder.Property(e => e.ComptadorLimSup).HasColumnName("ComptadorLimSup");

            builder.Property(e => e.ComptadorUnidades).HasColumnName("ComptadorUnidades");

            builder.Property(e => e.ComptadorActivo).HasColumnName("ComptadorActivo");

            builder.Property(e => e.ComptadorVerInspector).HasColumnName("ComptadorVerInspector");


            builder.Property(e => e.PHLimInf).HasColumnName("PHLimInf");

            builder.Property(e => e.PHLimSup).HasColumnName("PHLimSup");

            builder.Property(e => e.PHUnidades).HasColumnName("PHUnidades");

            builder.Property(e => e.PHActivo).HasColumnName("PHActivo");

            builder.Property(e => e.PHVerInspector).HasColumnName("PHVerInspector");


            builder.Property(e => e.TemperaturaLimInf).HasColumnName("TemperaturaLimInf");

            builder.Property(e => e.TemperaturaLimSup).HasColumnName("TemperaturaLimSup");

            builder.Property(e => e.TemperaturaUnidades).HasColumnName("TemperaturaUnidades");

            builder.Property(e => e.TemperaturaActivo).HasColumnName("TemperaturaActivo");

            builder.Property(e => e.TemperaturaVerInspector).HasColumnName("TemperaturaVerInspector");


            builder.Property(e => e.ConductivitatLimInf).HasColumnName("ConductivitatLimInf");

            builder.Property(e => e.ConductivitatLimSup).HasColumnName("ConductivitatLimSup");

            builder.Property(e => e.ConductivitatUnidades).HasColumnName("ConductivitatUnidades");

            builder.Property(e => e.ConductivitatActivo).HasColumnName("ConductivitatActivo");

            builder.Property(e => e.ConductivitatVerInspector).HasColumnName("ConductivitatVerInspector");


            builder.Property(e => e.TDSLimInf).HasColumnName("TDSLimInf");

            builder.Property(e => e.TDSLimSup).HasColumnName("TDSLimSup");

            builder.Property(e => e.TDSUnidades).HasColumnName("TDSUnidades");

            builder.Property(e => e.TDSActivo).HasColumnName("TDSActivo");

            builder.Property(e => e.TDSVerInspector).HasColumnName("TDSVerInspector");


            builder.Property(e => e.AlcalinitatMLimInf).HasColumnName("AlcalinitatMLimInf");

            builder.Property(e => e.AlcalinitatMLimSup).HasColumnName("AlcalinitatMLimSup");

            builder.Property(e => e.AlcalinitatMUnidades).HasColumnName("AlcalinitatMUnidades");

            builder.Property(e => e.AlcalinitatMActivo).HasColumnName("AlcalinitatMActivo");

            builder.Property(e => e.AlcalinitatMVerInspector).HasColumnName("AlcalinitatMVerInspector");


            builder.Property(e => e.AlcalinitatPLimInf).HasColumnName("AlcalinitatPLimInf");

            builder.Property(e => e.AlcalinitatPLimSup).HasColumnName("AlcalinitatPLimSup");

            builder.Property(e => e.AlcalinitatPUnidades).HasColumnName("AlcalinitatPUnidades");

            builder.Property(e => e.AlcalinitatPActivo).HasColumnName("AlcalinitatPActivo");

            builder.Property(e => e.AlcalinitatPVerInspector).HasColumnName("AlcalinitatPVerInspector");


            builder.Property(e => e.DuresaCalcicaLimInf).HasColumnName("DuresaCalcicaLimInf");

            builder.Property(e => e.DuresaCalcicaLimSup).HasColumnName("DuresaCalcicaLimSup");

            builder.Property(e => e.DuresaCalcicaUnidades).HasColumnName("DuresaCalcicaUnidades");

            builder.Property(e => e.DuresaCalcicaActivo).HasColumnName("DuresaCalcicaActivo");

            builder.Property(e => e.DuresaCalcicaVerInspector).HasColumnName("DuresaCalcicaVerInspector");


            builder.Property(e => e.DuresaTotalLimInf).HasColumnName("DuresaTotalLimInf");

            builder.Property(e => e.DuresaTotalLimSup).HasColumnName("DuresaTotalLimSup");

            builder.Property(e => e.DuresaTotalUnidades).HasColumnName("DuresaTotalUnidades");

            builder.Property(e => e.DuresaTotalActivo).HasColumnName("DuresaTotalActivo");

            builder.Property(e => e.DuresaTotalVerInspector).HasColumnName("DuresaTotalVerInspector");


            builder.Property(e => e.TerbolesaLimInf).HasColumnName("TerbolesaLimInf");

            builder.Property(e => e.TerbolesaLimSup).HasColumnName("TerbolesaLimSup");

            builder.Property(e => e.TerbolesaUnidades).HasColumnName("TerbolesaUnidades");

            builder.Property(e => e.TerbolesaActivo).HasColumnName("TerbolesaActivo");

            builder.Property(e => e.TerbolesaVerInspector).HasColumnName("TerbolesaVerInspector");


            builder.Property(e => e.FeLimInf).HasColumnName("FeLimInf");

            builder.Property(e => e.FeLimSup).HasColumnName("FeLimSup");

            builder.Property(e => e.FeUnidades).HasColumnName("FeUnidades");

            builder.Property(e => e.FeActivo).HasColumnName("FeActivo");

            builder.Property(e => e.FeVerInspector).HasColumnName("FeVerInspector");


            builder.Property(e => e.ClorursLimInf).HasColumnName("ClorursLimInf");

            builder.Property(e => e.ClorursLimSup).HasColumnName("ClorursLimSup");

            builder.Property(e => e.ClorursUnidades).HasColumnName("ClorursUnidades");

            builder.Property(e => e.ClorursActivo).HasColumnName("ClorursActivo");

            builder.Property(e => e.ClorursVerInspector).HasColumnName("ClorursVerInspector");


            builder.Property(e => e.SulfatsLimInf).HasColumnName("SulfatsLimInf");

            builder.Property(e => e.SulfatsLimSup).HasColumnName("SulfatsLimSup");

            builder.Property(e => e.SulfatsUnidades).HasColumnName("SulfatsUnidades");

            builder.Property(e => e.SulfatsActivo).HasColumnName("SulfatsActivo");

            builder.Property(e => e.SulfatsVerInspector).HasColumnName("SulfatsVerInspector");


            builder.Property(e => e.SilicatsLimInf).HasColumnName("SilicatsLimInf");

            builder.Property(e => e.SilicatsLimSup).HasColumnName("SilicatsLimSup");

            builder.Property(e => e.SilicatsUnidades).HasColumnName("SilicatsUnidades");

            builder.Property(e => e.SilicatsActivo).HasColumnName("SilicatsActivo");

            builder.Property(e => e.SilicatsVerInspector).HasColumnName("SilicatsVerInspector");


            builder.Property(e => e.ClorLliureLimInf).HasColumnName("ClorLliureLimInf");

            builder.Property(e => e.ClorLliureLimSup).HasColumnName("ClorLliureLimSup");

            builder.Property(e => e.ClorLliureUnidades).HasColumnName("ClorLliureUnidades");

            builder.Property(e => e.ClorLliureActivo).HasColumnName("ClorLliureActivo");

            builder.Property(e => e.ClorLliureVerInspector).HasColumnName("ClorLliureVerInspector");


            builder.Property(e => e.ClorTotalLimInf).HasColumnName("ClorTotalLimInf");

            builder.Property(e => e.ClorTotalLimSup).HasColumnName("ClorTotalLimSup");

            builder.Property(e => e.ClorTotalUnidades).HasColumnName("ClorTotalUnidades");

            builder.Property(e => e.ClorTotalActivo).HasColumnName("ClorTotalActivo");

            builder.Property(e => e.ClorTotalVerInspector).HasColumnName("ClorTotalVerInspector");


            builder.Property(e => e.BromLimInf).HasColumnName("BromLimInf");

            builder.Property(e => e.BromLimSup).HasColumnName("BromLimSup");

            builder.Property(e => e.BromUnidades).HasColumnName("BromUnidades");

            builder.Property(e => e.BromActivo).HasColumnName("BromActivo");

            builder.Property(e => e.BromVerInspector).HasColumnName("BromVerInspector");


            builder.Property(e => e.SulfitsLimInf).HasColumnName("SulfitsLimInf");

            builder.Property(e => e.SulfitsLimSup).HasColumnName("SulfitsLimSup");

            builder.Property(e => e.SulfitsUnidades).HasColumnName("SulfitsUnidades");

            builder.Property(e => e.SulfitsActivo).HasColumnName("SulfitsActivo");

            builder.Property(e => e.SulfitsVerInspector).HasColumnName("SulfitsVerInspector");


            builder.Property(e => e.OrtofosfatsPO4LimInf).HasColumnName("OrtofosfatsPO4LimInf");

            builder.Property(e => e.OrtofosfatsPO4LimSup).HasColumnName("OrtofosfatsPO4LimSup");

            builder.Property(e => e.OrtofosfatsPO4Unidades).HasColumnName("OrtofosfatsPO4Unidades");

            builder.Property(e => e.OrtofosfatsPO4Activo).HasColumnName("OrtofosfatsPO4Activo");

            builder.Property(e => e.OrtofosfatsPO4VerInspector).HasColumnName("OrtofosfatsPO4VerInspector");


            builder.Property(e => e.MoO4LimInf).HasColumnName("MoO4LimInf");

            builder.Property(e => e.MoO4LimSup).HasColumnName("MoO4LimSup");

            builder.Property(e => e.MoO4Unidades).HasColumnName("MoO4Unidades");

            builder.Property(e => e.MoO4Activo).HasColumnName("MoO4Activo");

            builder.Property(e => e.MoO4VerInspector).HasColumnName("MoO4VerInspector");


            builder.Property(e => e.IsotiazolonaLimInf).HasColumnName("IsotiazolonaLimInf");

            builder.Property(e => e.IsotiazolonaLimSup).HasColumnName("IsotiazolonaLimSup");

            builder.Property(e => e.IsotiazolonaUnidades).HasColumnName("IsotiazolonaUnidades");

            builder.Property(e => e.IsotiazolonaActivo).HasColumnName("IsotiazolonaActivo");

            builder.Property(e => e.IsotiazolonaVerInspector).HasColumnName("IsotiazolonaVerInspector");


            builder.Property(e => e.AquaproxAB5310LimInf).HasColumnName("AquaproxAB5310LimInf");

            builder.Property(e => e.AquaproxAB5310LimSup).HasColumnName("AquaproxAB5310LimSup");

            builder.Property(e => e.AquaproxAB5310Unidades).HasColumnName("AquaproxAB5310Unidades");

            builder.Property(e => e.AquaproxAB5310Activo).HasColumnName("AquaproxAB5310Activo");

            builder.Property(e => e.AquaproxAB5310VerInspector).HasColumnName("AquaproxAB5310VerInspector");


            builder.Property(e => e.BiopolLB5LimInf).HasColumnName("BiopolLB5LimInf");

            builder.Property(e => e.BiopolLB5LimSup).HasColumnName("BiopolLB5LimSup");

            builder.Property(e => e.BiopolLB5Unidades).HasColumnName("BiopolLB5Unidades");

            builder.Property(e => e.BiopolLB5Activo).HasColumnName("BiopolLB5Activo");

            builder.Property(e => e.BiopolLB5VerInspector).HasColumnName("BiopolLB5VerInspector");


            builder.Property(e => e.MefacideLGLimInf).HasColumnName("MefacideLGLimInf");

            builder.Property(e => e.MefacideLGLimSup).HasColumnName("MefacideLGLimSup");

            builder.Property(e => e.MefacideLGUnidades).HasColumnName("MefacideLGUnidades");

            builder.Property(e => e.MefacideLGActivo).HasColumnName("MefacideLGActivo");

            builder.Property(e => e.MefacideLGVerInspector).HasColumnName("MefacideLGVerInspector");


            builder.Property(e => e.BiopolIB200LimInf).HasColumnName("BiopolIB200LimInf");

            builder.Property(e => e.BiopolIB200LimSup).HasColumnName("BiopolIB200LimSup");

            builder.Property(e => e.BiopolIB200Unidades).HasColumnName("BiopolIB200Unidades");

            builder.Property(e => e.BiopolIB200Activo).HasColumnName("BiopolIB200Activo");

            builder.Property(e => e.BiopolIB200VerInspector).HasColumnName("BiopolIB200VerInspector");


            builder.Property(e => e.Campo1Nombre).HasColumnName("Campo1Nombre");

            builder.Property(e => e.Campo1LimInf).HasColumnName("Campo1LimInf");

            builder.Property(e => e.Campo1LimSup).HasColumnName("Campo1LimSup");

            builder.Property(e => e.Campo1Unidades).HasColumnName("Campo1Unidades");

            builder.Property(e => e.Campo1Activo).HasColumnName("Campo1Activo");

            builder.Property(e => e.Campo1VerInspector).HasColumnName("Campo1VerInspector");


            builder.Property(e => e.Campo2Nombre).HasColumnName("Campo2Nombre");

            builder.Property(e => e.Campo2LimInf).HasColumnName("Campo2LimInf");

            builder.Property(e => e.Campo2LimSup).HasColumnName("Campo2LimSup");

            builder.Property(e => e.Campo2Unidades).HasColumnName("Campo2Unidades");

            builder.Property(e => e.Campo2Activo).HasColumnName("Campo2Activo");

            builder.Property(e => e.Campo2VerInspector).HasColumnName("Campo2VerInspector");


            builder.Property(e => e.Campo3Nombre).HasColumnName("Campo3Nombre");

            builder.Property(e => e.Campo3LimInf).HasColumnName("Campo3LimInf");

            builder.Property(e => e.Campo3LimSup).HasColumnName("Campo3LimSup");

            builder.Property(e => e.Campo3Unidades).HasColumnName("Campo3Unidades");

            builder.Property(e => e.Campo3Activo).HasColumnName("Campo3Activo");

            builder.Property(e => e.Campo3VerInspector).HasColumnName("Campo3VerInspector");


            builder.Property(e => e.Campo4Nombre).HasColumnName("Campo4Nombre");

            builder.Property(e => e.Campo4LimInf).HasColumnName("Campo4LimInf");

            builder.Property(e => e.Campo4LimSup).HasColumnName("Campo4LimSup");

            builder.Property(e => e.Campo4Unidades).HasColumnName("Campo4Unidades");

            builder.Property(e => e.Campo4Activo).HasColumnName("Campo4Activo");

            builder.Property(e => e.Campo4VerInspector).HasColumnName("Campo4VerInspector");


            builder.Property(e => e.Campo5Nombre).HasColumnName("Campo5Nombre");

            builder.Property(e => e.Campo5LimInf).HasColumnName("Campo5LimInf");

            builder.Property(e => e.Campo5LimSup).HasColumnName("Campo5LimSup");

            builder.Property(e => e.Campo5Unidades).HasColumnName("Campo5Unidades");

            builder.Property(e => e.Campo5Activo).HasColumnName("Campo5Activo");

            builder.Property(e => e.Campo5VerInspector).HasColumnName("Campo5VerInspector");


            builder.Property(e => e.Campo6Nombre).HasColumnName("Campo6Nombre");

            builder.Property(e => e.Campo6LimInf).HasColumnName("Campo6LimInf");

            builder.Property(e => e.Campo6LimSup).HasColumnName("Campo6LimSup");

            builder.Property(e => e.Campo6Unidades).HasColumnName("Campo6Unidades");

            builder.Property(e => e.Campo6Activo).HasColumnName("Campo6Activo");

            builder.Property(e => e.Campo6VerInspector).HasColumnName("Campo6VerInspector");


            builder.Property(e => e.Campo7Nombre).HasColumnName("Campo7Nombre");

            builder.Property(e => e.Campo7LimInf).HasColumnName("Campo7LimInf");

            builder.Property(e => e.Campo7LimSup).HasColumnName("Campo7LimSup");

            builder.Property(e => e.Campo7Unidades).HasColumnName("Campo7Unidades");

            builder.Property(e => e.Campo7Activo).HasColumnName("Campo7Activo");

            builder.Property(e => e.Campo7VerInspector).HasColumnName("Campo7VerInspector");


            builder.Property(e => e.Campo8Nombre).HasColumnName("Campo8Nombre");

            builder.Property(e => e.Campo8LimInf).HasColumnName("Campo8LimInf");

            builder.Property(e => e.Campo8LimSup).HasColumnName("Campo8LimSup");

            builder.Property(e => e.Campo8Unidades).HasColumnName("Campo8Unidades");

            builder.Property(e => e.Campo8Activo).HasColumnName("Campo8Activo");

            builder.Property(e => e.Campo8VerInspector).HasColumnName("Campo8VerInspector");


        }
    }
}
