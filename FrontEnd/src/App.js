
import { AppTheme } from './theme';
import { AppRouter } from './router/AppRouter';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App() {

  let datos = {
    alcalinitatMActivo: false,
    alcalinitatMLimInf: 0,
    alcalinitatMLimSup: 0,
    alcalinitatMUnidades: "",
    alcalinitatMVerInspector: false,
    alcalinitatPActivo: false,
    alcalinitatPLimInf: 0,
    alcalinitatPLimSup: 0,
    alcalinitatPUnidades: "",
    alcalinitatPVerInspector: false,
    aquaproxAB5310Activo: false,
    aquaproxAB5310LimInf: 0,
    aquaproxAB5310LimSup: 0,
    aquaproxAB5310Unidades: "",
    aquaproxAB5310VerInspector: false,
    biopolIB200Activo: false,
    biopolIB200LimInf: 0,
    biopolIB200LimSup: 0,
    biopolIB200Unidades: "",
    biopolIB200VerInspector: false,
    biopolLB5Activo: false,
    biopolLB5LimInf: 0,
    biopolLB5LimSup: 0,
    biopolLB5Unidades: "",
    biopolLB5VerInspector: false,
    bromActivo: false,
    bromLimInf: 0,
    bromLimSup: 0,
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
    campo3LimInf: 3,
    campo3LimSup: 6,
    campo3Nombre: "Prueba",
    campo3Unidades: "Un.",
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
    campo8Activo: true,
    campo8LimInf: 50,
    campo8LimSup: 80,
    campo8Nombre: "Último campo",
    campo8Unidades: "prueba",
    campo8VerInspector: false,
    clorLliureActivo: false,
    clorLliureLimInf: 0,
    clorLliureLimSup: 0,
    clorLliureUnidades: "",
    clorLliureVerInspector: false,
    clorTotalActivo: false,
    clorTotalLimInf: 0,
    clorTotalLimSup: 0,
    clorTotalUnidades: "",
    clorTotalVerInspector: false,
    clorursActivo: false,
    clorursLimInf: 0,
    clorursLimSup: 0,
    clorursUnidades: "",
    clorursVerInspector: false,
    codigoCliente: 5,
    comptadorActivo: true,
    comptadorLimInf: 1,
    comptadorLimSup: 2,
    comptadorUnidades: "Un. pH",
    comptadorVerInspector: false,
    conductivitatActivo: false,
    conductivitatLimInf: 0,
    conductivitatLimSup: 0,
    conductivitatUnidades: "",
    conductivitatVerInspector: false,
    delDate: null,
    delIdUser: null,
    deleted: null,
    duresaCalcicaActivo: false,
    duresaCalcicaLimInf: 0,
    duresaCalcicaLimSup: 0,
    duresaCalcicaUnidades: "",
    duresaCalcicaVerInspector: false,
    duresaTotalActivo: false,
    duresaTotalLimInf: 0,
    duresaTotalLimSup: 0,
    duresaTotalUnidades: "",
    duresaTotalVerInspector: false,
    elemento: "Caldera 1",
    esPlantilla: true,
    feActivo: false,
    feLimInf: 0,
    feLimSup: 0,
    feUnidades: "",
    feVerInspector: false,
    id: 86,
    isotiazolonaActivo: false,
    isotiazolonaLimInf: 0,
    isotiazolonaLimSup: 0,
    isotiazolonaUnidades: "",
    isotiazolonaVerInspector: false,
    mefacideLGActivo: false,
    mefacideLGLimInf: 0,
    mefacideLGLimSup: 0,
    mefacideLGUnidades: "",
    mefacideLGVerInspector: false,
    moO4Activo: false,
    moO4LimInf: 0,
    moO4LimSup: 0,
    moO4Unidades: "",
    moO4VerInspector: false,
    modDate: null,
    modIdUser: null,
    nombreCliente: "Castellar Vidrio",
    oferta: 4567,
    ortofosfatsPO4Activo: false,
    ortofosfatsPO4LimInf: 0,
    ortofosfatsPO4LimSup: 0,
    ortofosfatsPO4Unidades: "",
    ortofosfatsPO4VerInspector: false,
    phActivo: false,
    phLimInf: 0,
    phLimSup: 0,
    phUnidades: "",
    phVerInspector: false,
    silicatsActivo: false,
    silicatsLimInf: 0,
    silicatsLimSup: 0,
    silicatsUnidades: "",
    silicatsVerInspector: false,
    sulfatsActivo: false,
    sulfatsLimInf: 0,
    sulfatsLimSup: 0,
    sulfatsUnidades: "",
    sulfatsVerInspector: false,
    sulfitsActivo: false,
    sulfitsLimInf: 0,
    sulfitsLimSup: 0,
    sulfitsUnidades: "",
    sulfitsVerInspector: false,
    tdsActivo: false,
    tdsLimInf: 0,
    tdsLimSup: 0,
    tdsUnidades: "",
    tdsVerInspector: false,
    temperaturaActivo: false,
    temperaturaLimInf: 0,
    temperaturaLimSup: 0,
    temperaturaUnidades: "",
    temperaturaVerInspector: false,
    terbolesaActivo: false,
    terbolesaLimInf: 0,
    terbolesaLimSup: 0,
    terbolesaUnidades: "",
    terbolesaVerInspector: false
  };

  const crearParametrizacion = ( datos ) => {

    // Preparamos variables necesarias
    const parametros = [
      'alcalinitatM','alcalinitatP','aquaproxAB5310','biopolIB200','biopolLB5','brom','clorLliure','clorTotal','clorurs',
      'comptador','conductivitat','duresaCalcica','duresaTotal','fe','isotiazolona','mefacideLG','moO4','ortofosfatsPO4',
      'ph','silicats','sulfats','sulfits','tds','temperatura','terbolesa'
    ];
    let campos = [];

    // Preparamos las variables de los bloques de datos
    let cliente = {};
    let parametrosFijos = {};
    let parametrosPersonalizados = {};
    let dbInfo = {};

    // Empezamos a parsear todos los datos
    for(let parametro in datos){

      // Preparamos el bloque de "cliente"
      if(parametro === 'codigoCliente' || parametro === 'elemento' || parametro === 'esPlantilla' || parametro === 'nombreCliente' || parametro === 'oferta'){
        cliente = { ...cliente, [parametro]: datos[parametro] }
      }

      // Preparamos el bloque de "dbInfo"
      if(parametro === 'delDate' || parametro === 'delIdUser' || parametro === 'deleted' || parametro === 'modDate' || parametro === 'modIdUser'){
        dbInfo = { ...dbInfo, [parametro]: datos[parametro] }
      }

      // Preparamos el bloque de "parametrosFijos"
      // TODO: parametrosFijos hay que parsearlo
      
      // Preparamos el bloque de "parametrosPersonalizados"
      if( parametro.includes('campo')) {

        // Repetimos el bucle la cantidad de campos personalizados que hayan
        for(let i = 1; i <= 8; i++){

          // Creamos el objecto del campo
          let nombreCampoPersonalizado = `campo${ i }`;

          // Filtramos por el campo que nos interesa
          if( parametro.includes( nombreCampoPersonalizado )) {

            // Ahora comprobamos por campo las propiedades (LimInf, LimSup, Unidades, Activo, VerInspector)
            if(parametro.includes('Nombre')) {
              campos[i] = { ...campos[i], Nombre: datos[parametro] }
            }
            if(parametro.includes('LimInf')) {
              campos[i] = { ...campos[i], LimInf: datos[parametro] }
            }
            if(parametro.includes('LimSup')) {
              campos[i] = { ...campos[i], LimSup: datos[parametro] }
            }
            if(parametro.includes('Unidades')) {
              campos[i] = { ...campos[i], Unidades: datos[parametro] }
            }
            if(parametro.includes('Activo')) {
              campos[i] = { ...campos[i], Activo: datos[parametro] }
            }
            if(parametro.includes('VerInspector')) {
              campos[i] = { ...campos[i], VerInspector: datos[parametro] }
            }

          }

        }

      }

    }

    // Añadimos los campos personalizados
    for(let i = 1; i <= 8; i++) {

      const nombreCampoPersonalizado = `campo${ i }`;
      parametrosPersonalizados = { ...parametrosPersonalizados, [nombreCampoPersonalizado]: campos[i] }

    }

    // Seteamos todos los bloques a la variable final
    const nuevaParametrizacion = {
      cliente,
      parametrosPersonalizados,
      dbInfo
    }

    // Para ver el resultado final
    console.log({nuevaParametrizacion});

  }
  
  crearParametrizacion( datos );

  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  );
}


