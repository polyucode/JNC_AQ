
export const crearParametrizacionBack = ( datos ) => {

    // Declaramos la variable principal que vamos a devolver
    let parametrosBack = {};

    // Esparcimos los datos de los bloques "cliente" y "dbInfo"
    parametrosBack = {
        ...parametrosBack,
        ...datos.cliente,
        ...datos.dbInfo
    }

    // Recorremos los campos fijos
    for ( let campo in datos.parametrosFijos ) {

        const datosCampo = datos.parametrosFijos[campo];

        for ( let parametro in datosCampo ) {

            const nombreParametro = campo + parametro;

            parametrosBack = {
                ...parametrosBack,
                [nombreParametro]: datosCampo[parametro]
            } 

        }

    }

    // Recorremos los campos personalizados
    for ( let campo in datos.parametrosPersonalizados ) {

        const datosCampo = datos.parametrosPersonalizados[campo];

        for ( let parametro in datosCampo ) {

            const nombreParametro = campo + parametro;

            parametrosBack = {
                ...parametrosBack,
                [nombreParametro]: datosCampo[parametro]
            } 

        }

    }

    // Retornamos el resultado
    return parametrosBack;

}