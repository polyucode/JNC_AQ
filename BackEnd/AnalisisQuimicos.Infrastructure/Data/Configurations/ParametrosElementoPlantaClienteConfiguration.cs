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

            builder.Property(e => e.EsPlantilla).HasColumnName("EsPlantilla");


            builder.Property(e => e.Comptador_LimInf).HasColumnName("Comptador_LimInf");

            builder.Property(e => e.Comptador_LimSup).HasColumnName("Comptador_LimSup");

            builder.Property(e => e.Comptador_Unidades).HasColumnName("Comptador_Unidades");

            builder.Property(e => e.Comptador_Activo).HasColumnName("Comptador_Activo");

            builder.Property(e => e.Comptador_VerInspector).HasColumnName("Comptador_VerInspector");


            builder.Property(e => e.PH_LimInf).HasColumnName("PH_LimInf");

            builder.Property(e => e.PH_LimSup).HasColumnName("PH_LimSup");

            builder.Property(e => e.PH_Unidades).HasColumnName("PH_Unidades");

            builder.Property(e => e.PH_Activo).HasColumnName("PH_Activo");

            builder.Property(e => e.PH_VerInspector).HasColumnName("PH_VerInspector");


            builder.Property(e => e.Temperatura_LimInf).HasColumnName("Temperatura_LimInf");

            builder.Property(e => e.Temperatura_LimSup).HasColumnName("Temperatura_LimSup");

            builder.Property(e => e.Temperatura_Unidades).HasColumnName("Temperatura_Unidades");

            builder.Property(e => e.Temperatura_Activo).HasColumnName("Temperatura_Activo");

            builder.Property(e => e.Temperatura_VerInspector).HasColumnName("Temperatura_VerInspector");


            builder.Property(e => e.Conductivitat_LimInf).HasColumnName("Conductivitat_LimInf");

            builder.Property(e => e.Conductivitat_LimSup).HasColumnName("Conductivitat_LimSup");

            builder.Property(e => e.Conductivitat_Unidades).HasColumnName("Conductivitat_Unidades");

            builder.Property(e => e.Conductivitat_Activo).HasColumnName("Conductivitat_Activo");

            builder.Property(e => e.Conductivitat_VerInspector).HasColumnName("Conductivitat_VerInspector");


            builder.Property(e => e.TDS_LimInf).HasColumnName("TDS_LimInf");

            builder.Property(e => e.TDS_LimSup).HasColumnName("TDS_LimSup");

            builder.Property(e => e.TDS_Unidades).HasColumnName("TDS_Unidades");

            builder.Property(e => e.TDS_Activo).HasColumnName("TDS_Activo");

            builder.Property(e => e.TDS_VerInspector).HasColumnName("TDS_VerInspector");


            builder.Property(e => e.AlcalinitatM_LimInf).HasColumnName("AlcalinitatM_LimInf");

            builder.Property(e => e.AlcalinitatM_LimSup).HasColumnName("AlcalinitatM_LimSup");

            builder.Property(e => e.AlcalinitatM_Unidades).HasColumnName("AlcalinitatM_Unidades");

            builder.Property(e => e.AlcalinitatM_Activo).HasColumnName("AlcalinitatM_Activo");

            builder.Property(e => e.AlcalinitatM_VerInspector).HasColumnName("AlcalinitatM_VerInspector");


            builder.Property(e => e.AlcalinitatP_LimInf).HasColumnName("AlcalinitatP_LimInf");

            builder.Property(e => e.AlcalinitatP_LimSup).HasColumnName("AlcalinitatP_LimSup");

            builder.Property(e => e.AlcalinitatP_Unidades).HasColumnName("AlcalinitatP_Unidades");

            builder.Property(e => e.AlcalinitatP_Activo).HasColumnName("AlcalinitatP_Activo");

            builder.Property(e => e.AlcalinitatP_VerInspector).HasColumnName("AlcalinitatP_VerInspector");


            builder.Property(e => e.DuresaCalcica_LimInf).HasColumnName("DuresaCalcica_LimInf");

            builder.Property(e => e.DuresaCalcica_LimSup).HasColumnName("DuresaCalcica_LimSup");

            builder.Property(e => e.DuresaCalcica_Unidades).HasColumnName("DuresaCalcica_Unidades");

            builder.Property(e => e.DuresaCalcica_Activo).HasColumnName("DuresaCalcica_Activo");

            builder.Property(e => e.DuresaCalcica_VerInspector).HasColumnName("DuresaCalcica_VerInspector");


            builder.Property(e => e.DuresaTotal_LimInf).HasColumnName("DuresaTotal_LimInf");

            builder.Property(e => e.DuresaTotal_LimSup).HasColumnName("DuresaTotal_LimSup");

            builder.Property(e => e.DuresaTotal_Unidades).HasColumnName("DuresaTotal_Unidades");

            builder.Property(e => e.DuresaTotal_Activo).HasColumnName("DuresaTotal_Activo");

            builder.Property(e => e.DuresaTotal_VerInspector).HasColumnName("DuresaTotal_VerInspector");


            builder.Property(e => e.Terbolesa_LimInf).HasColumnName("Terbolesa_LimInf");

            builder.Property(e => e.Terbolesa_LimSup).HasColumnName("Terbolesa_LimSup");

            builder.Property(e => e.Terbolesa_Unidades).HasColumnName("Terbolesa_Unidades");

            builder.Property(e => e.Terbolesa_Activo).HasColumnName("Terbolesa_Activo");

            builder.Property(e => e.Terbolesa_VerInspector).HasColumnName("Terbolesa_VerInspector");


            builder.Property(e => e.Fe_LimInf).HasColumnName("Fe_LimInf");

            builder.Property(e => e.Fe_LimSup).HasColumnName("Fe_LimSup");

            builder.Property(e => e.Fe_Unidades).HasColumnName("Fe_Unidades");

            builder.Property(e => e.Fe_Activo).HasColumnName("Fe_Activo");

            builder.Property(e => e.Fe_VerInspector).HasColumnName("Fe_VerInspector");


            builder.Property(e => e.Clorurs_LimInf).HasColumnName("Clorurs_LimInf");

            builder.Property(e => e.Clorurs_LimSup).HasColumnName("Clorurs_LimSup");

            builder.Property(e => e.Clorurs_Unidades).HasColumnName("Clorurs_Unidades");

            builder.Property(e => e.Clorurs_Activo).HasColumnName("Clorurs_Activo");

            builder.Property(e => e.Clorurs_VerInspector).HasColumnName("Clorurs_VerInspector");


            builder.Property(e => e.Sulfats_LimInf).HasColumnName("Sulfats_LimInf");

            builder.Property(e => e.Sulfats_LimSup).HasColumnName("Sulfats_LimSup");

            builder.Property(e => e.Sulfats_Unidades).HasColumnName("Sulfats_Unidades");

            builder.Property(e => e.Sulfats_Activo).HasColumnName("Sulfats_Activo");

            builder.Property(e => e.Sulfats_VerInspector).HasColumnName("Sulfats_VerInspector");


            builder.Property(e => e.Silicats_LimInf).HasColumnName("Silicats_LimInf");

            builder.Property(e => e.Silicats_LimSup).HasColumnName("Silicats_LimSup");

            builder.Property(e => e.Silicats_Unidades).HasColumnName("Silicats_Unidades");

            builder.Property(e => e.Silicats_Activo).HasColumnName("Silicats_Activo");

            builder.Property(e => e.Silicats_VerInspector).HasColumnName("Silicats_VerInspector");


            builder.Property(e => e.ClorLliure_LimInf).HasColumnName("ClorLliure_LimInf");

            builder.Property(e => e.ClorLliure_LimSup).HasColumnName("ClorLliure_LimSup");

            builder.Property(e => e.ClorLliure_Unidades).HasColumnName("ClorLliure_Unidades");

            builder.Property(e => e.ClorLliure_Activo).HasColumnName("ClorLliure_Activo");

            builder.Property(e => e.ClorLliure_VerInspector).HasColumnName("ClorLliure_VerInspector");


            builder.Property(e => e.ClorTotal_LimInf).HasColumnName("ClorTotal_LimInf");

            builder.Property(e => e.ClorTotal_LimSup).HasColumnName("ClorTotal_LimSup");

            builder.Property(e => e.ClorTotal_Unidades).HasColumnName("ClorTotal_Unidades");

            builder.Property(e => e.ClorTotal_Activo).HasColumnName("ClorTotal_Activo");

            builder.Property(e => e.ClorTotal_VerInspector).HasColumnName("ClorTotal_VerInspector");


            builder.Property(e => e.Brom_LimInf).HasColumnName("Brom_LimInf");

            builder.Property(e => e.Brom_LimSup).HasColumnName("Brom_LimSup");

            builder.Property(e => e.Brom_Unidades).HasColumnName("Brom_Unidades");

            builder.Property(e => e.Brom_Activo).HasColumnName("Brom_Activo");

            builder.Property(e => e.Brom_VerInspector).HasColumnName("Brom_VerInspector");


            builder.Property(e => e.Sulfits_LimInf).HasColumnName("Sulfits_LimInf");

            builder.Property(e => e.Sulfits_LimSup).HasColumnName("Sulfits_LimSup");

            builder.Property(e => e.Sulfits_Unidades).HasColumnName("Sulfits_Unidades");

            builder.Property(e => e.Sulfits_Activo).HasColumnName("Sulfits_Activo");

            builder.Property(e => e.Sulfits_VerInspector).HasColumnName("Sulfits_VerInspector");


            builder.Property(e => e.Ortofosfats_LimInf).HasColumnName("Ortofosfats_LimInf");

            builder.Property(e => e.Ortofosfats_LimSup).HasColumnName("Ortofosfats_LimSup");

            builder.Property(e => e.Ortofosfats_Unidades).HasColumnName("Ortofosfats_Unidades");

            builder.Property(e => e.Ortofosfats_Activo).HasColumnName("Ortofosfats_Activo");

            builder.Property(e => e.Ortofosfats_VerInspector).HasColumnName("Ortofosfats_VerInspector");


            builder.Property(e => e.Mo_LimInf).HasColumnName("Mo_LimInf");

            builder.Property(e => e.Mo_LimSup).HasColumnName("Mo_LimSup");

            builder.Property(e => e.Mo_Unidades).HasColumnName("Mo_Unidades");

            builder.Property(e => e.Mo_Activo).HasColumnName("Mo_Activo");

            builder.Property(e => e.Mo_VerInspector).HasColumnName("Mo_VerInspector");


            builder.Property(e => e.Isotiazolona_LimInf).HasColumnName("Isotiazolona_LimInf");

            builder.Property(e => e.Isotiazolona_LimSup).HasColumnName("Isotiazolona_LimSup");

            builder.Property(e => e.Isotiazolona_Unidades).HasColumnName("Isotiazolona_Unidades");

            builder.Property(e => e.Isotiazolona_Activo).HasColumnName("Isotiazolona_Activo");

            builder.Property(e => e.Isotiazolona_VerInspector).HasColumnName("Isotiazolona_VerInspector");


            builder.Property(e => e.Campo1_Nombre).HasColumnName("Campo1_Nombre");

            builder.Property(e => e.Campo1_LimInf).HasColumnName("Campo1_LimInf");

            builder.Property(e => e.Campo1_LimSup).HasColumnName("Campo1_LimSup");

            builder.Property(e => e.Campo1_Unidades).HasColumnName("Campo1_Unidades");

            builder.Property(e => e.Campo1_Activo).HasColumnName("Campo1_Activo");

            builder.Property(e => e.Campo1_VerInspector).HasColumnName("Campo1_VerInspector");


            builder.Property(e => e.Campo2_Nombre).HasColumnName("Campo2_Nombre");

            builder.Property(e => e.Campo2_LimInf).HasColumnName("Campo2_LimInf");

            builder.Property(e => e.Campo2_LimSup).HasColumnName("Campo2_LimSup");

            builder.Property(e => e.Campo2_Unidades).HasColumnName("Campo2_Unidades");

            builder.Property(e => e.Campo2_Activo).HasColumnName("Campo2_Activo");

            builder.Property(e => e.Campo2_VerInspector).HasColumnName("Campo2_VerInspector");


            builder.Property(e => e.Campo3_Nombre).HasColumnName("Campo3_Nombre");

            builder.Property(e => e.Campo3_LimInf).HasColumnName("Campo3_LimInf");

            builder.Property(e => e.Campo3_LimSup).HasColumnName("Campo3_LimSup");

            builder.Property(e => e.Campo3_Unidades).HasColumnName("Campo3_Unidades");

            builder.Property(e => e.Campo3_Activo).HasColumnName("Campo3_Activo");

            builder.Property(e => e.Campo3_VerInspector).HasColumnName("Campo3_VerInspector");


            builder.Property(e => e.Campo4_Nombre).HasColumnName("Campo4_Nombre");

            builder.Property(e => e.Campo4_LimInf).HasColumnName("Campo4_LimInf");

            builder.Property(e => e.Campo4_LimSup).HasColumnName("Campo4_LimSup");

            builder.Property(e => e.Campo4_Unidades).HasColumnName("Campo4_Unidades");

            builder.Property(e => e.Campo4_Activo).HasColumnName("Campo4_Activo");

            builder.Property(e => e.Campo4_VerInspector).HasColumnName("Campo4_VerInspector");


            builder.Property(e => e.Campo5_Nombre).HasColumnName("Campo5_Nombre");

            builder.Property(e => e.Campo5_LimInf).HasColumnName("Campo5_LimInf");

            builder.Property(e => e.Campo5_LimSup).HasColumnName("Campo5_LimSup");

            builder.Property(e => e.Campo5_Unidades).HasColumnName("Campo5_Unidades");

            builder.Property(e => e.Campo5_Activo).HasColumnName("Campo5_Activo");

            builder.Property(e => e.Campo5_VerInspector).HasColumnName("Campo5_VerInspector");


            builder.Property(e => e.Campo6_Nombre).HasColumnName("Campo6_Nombre");

            builder.Property(e => e.Campo6_LimInf).HasColumnName("Campo6_LimInf");

            builder.Property(e => e.Campo6_LimSup).HasColumnName("Campo6_LimSup");

            builder.Property(e => e.Campo6_Unidades).HasColumnName("Campo6_Unidades");

            builder.Property(e => e.Campo6_Activo).HasColumnName("Campo6_Activo");

            builder.Property(e => e.Campo6_VerInspector).HasColumnName("Campo6_VerInspector");


            builder.Property(e => e.Campo7_Nombre).HasColumnName("Campo7_Nombre");

            builder.Property(e => e.Campo7_LimInf).HasColumnName("Campo7_LimInf");

            builder.Property(e => e.Campo7_LimSup).HasColumnName("Campo7_LimSup");

            builder.Property(e => e.Campo7_Unidades).HasColumnName("Campo7_Unidades");

            builder.Property(e => e.Campo7_Activo).HasColumnName("Campo7_Activo");

            builder.Property(e => e.Campo7_VerInspector).HasColumnName("Campo7_VerInspector");


            builder.Property(e => e.Campo8_Nombre).HasColumnName("Campo8_Nombre");

            builder.Property(e => e.Campo8_LimInf).HasColumnName("Campo8_LimInf");

            builder.Property(e => e.Campo8_LimSup).HasColumnName("Campo8_LimSup");

            builder.Property(e => e.Campo8_Unidades).HasColumnName("Campo8_Unidades");

            builder.Property(e => e.Campo8_Activo).HasColumnName("Campo8_Activo");

            builder.Property(e => e.Campo8_VerInspector).HasColumnName("Campo8_VerInspector");


            builder.Property(e => e.Campo9_Nombre).HasColumnName("Campo9_Nombre");

            builder.Property(e => e.Campo9_LimInf).HasColumnName("Campo9_LimInf");

            builder.Property(e => e.Campo9_LimSup).HasColumnName("Campo9_LimSup");

            builder.Property(e => e.Campo9_Unidades).HasColumnName("Campo9_Unidades");

            builder.Property(e => e.Campo9_Activo).HasColumnName("Campo9_Activo");

            builder.Property(e => e.Campo9_VerInspector).HasColumnName("Campo9_VerInspector");


            builder.Property(e => e.Campo10_Nombre).HasColumnName("Campo10_Nombre");

            builder.Property(e => e.Campo10_LimInf).HasColumnName("Campo10_LimInf");

            builder.Property(e => e.Campo10_LimSup).HasColumnName("Campo10_LimSup");

            builder.Property(e => e.Campo10_Unidades).HasColumnName("Campo10_Unidades");

            builder.Property(e => e.Campo10_Activo).HasColumnName("Campo10_Activo");

            builder.Property(e => e.Campo10_VerInspector).HasColumnName("Campo10_VerInspector");


            builder.Property(e => e.Campo11_Nombre).HasColumnName("Campo11_Nombre");

            builder.Property(e => e.Campo11_LimInf).HasColumnName("Campo11_LimInf");

            builder.Property(e => e.Campo11_LimSup).HasColumnName("Campo11_LimSup");

            builder.Property(e => e.Campo11_Unidades).HasColumnName("Campo11_Unidades");

            builder.Property(e => e.Campo11_Activo).HasColumnName("Campo11_Activo");

            builder.Property(e => e.Campo11_VerInspector).HasColumnName("Campo11_VerInspector");


            builder.Property(e => e.Campo12_Nombre).HasColumnName("Campo12_Nombre");

            builder.Property(e => e.Campo12_LimInf).HasColumnName("Campo12_LimInf");

            builder.Property(e => e.Campo12_LimSup).HasColumnName("Campo12_LimSup");

            builder.Property(e => e.Campo12_Unidades).HasColumnName("Campo12_Unidades");

            builder.Property(e => e.Campo12_Activo).HasColumnName("Campo12_Activo");

            builder.Property(e => e.Campo12_VerInspector).HasColumnName("Campo12_VerInspector");

        }
    }
}
