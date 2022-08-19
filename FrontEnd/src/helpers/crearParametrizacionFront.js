
export const crearParametrizacionFront = ( datos ) => {

    // Parametros fijos
    let parametros = [
      'alcalinitatM', 'alcalinitatP', 'aquaproxAB5310', 'biopolIB200', 'biopolLB5', 'brom', 'clorLliure', 'clorTotal',
      'clorurs', 'comptador', 'conductivitat', 'duresaCalcica', 'duresaTotal', 'fe', 'id', 'isotiazolona', 'mefacideLG', 'moO4', 'ortofosfatsPO4',
      'ph', 'silicats', 'sulfats', 'sulfits', 'tds', 'temperatura', 'terbolesa',
    ];

    // Preparamos variables necesarias
    let campos = [];
    let valores = [];

    // Preparamos las variables de los bloques de datos
    let cliente = {};
    let parametrosFijos = {};
    let dbInfo = {};
    let parametrosPersonalizados = {};

    // Empezamos a parsear todos los datos
    for ( let parametro in datos ) {

      // Preparamos el bloque de "cliente"
      if(parametro === 'id' || parametro === 'codigoCliente' || parametro === 'elemento' || parametro === 'esPlantilla' || parametro === 'fecha' || parametro === 'nombreCliente' || parametro === 'oferta'){
        cliente = { ...cliente, [parametro]: datos[parametro] }
      }

      // Preparamos el bloque de "dbInfo"
      if(parametro === 'delDate' || parametro === 'delIdUser' || parametro === 'deleted' || parametro === 'modDate' || parametro === 'modIdUser'){
        dbInfo = { ...dbInfo, [parametro]: datos[parametro] }
      }

      // Preparamos el bloque de "parametrosFijos"
      for (let i = 0; i < parametros.length; i++ ) {

        if ( parametro.includes( parametros[i] ) ) {

          if(parametro.includes('LimInf')) {
            valores[i] = { ...valores[i], LimInf: datos[parametro] }
          }
          if(parametro.includes('LimSup')) {
            valores[i] = { ...valores[i], LimSup: datos[parametro] }
          }
          if(parametro.includes('Unidades')) {
            valores[i] = { ...valores[i], Unidades: datos[parametro] }
          }
          if(parametro.includes('Activo')) {
            valores[i] = { ...valores[i], Activo: datos[parametro] }
          }
          if(parametro.includes('VerInspector')) {
            valores[i] = { ...valores[i], VerInspector: datos[parametro] }
          }

          valores[i] = { ...valores[i], Nombre: parametros[i] }

        }

      }
      
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

    // Añadimos los campos fijos
    valores.forEach( valor => {

      parametrosFijos = { ...parametrosFijos, [valor.Nombre]: valor }

    });

    // Añadimos los campos personalizados
    for (let i = 1; i <= 8; i++) {

      const nombreCampoPersonalizado = `campo${ i }`;
      parametrosPersonalizados = { ...parametrosPersonalizados, [nombreCampoPersonalizado]: campos[i] }

    }

    // Seteamos todos los bloques a la variable final
    const nuevaParametrizacion = {
      cliente,
      parametrosFijos,
      parametrosPersonalizados,
      dbInfo
    }

    // Retornamos el resultado
    return nuevaParametrizacion;

}