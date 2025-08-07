export const calcularValorParametroCalculado = (parametro,valoresParametrosDependientesOrdenados) =>{
    let result = 0.0;
    switch (parametro){
        //PH SATURACION
        case 1:
            result = calcularPhSaturacion(valoresParametrosDependientesOrdenados, true);
            break;
        //PH EQ
        case 2:
            result = calcularPhEq(valoresParametrosDependientesOrdenados, true);
            break;
        //Índice de Puckorius
        case 3:
            result = calcularIndiceDePuckorius(valoresParametrosDependientesOrdenados);
            break;
        //Índice de Riznar
        case 4:
            result = calcularIndiceDeRiznar(valoresParametrosDependientesOrdenados);
            break;
        //Índice de Langelier
        case 5:
            result = calcularIndiceDeLangelier(valoresParametrosDependientesOrdenados);
            break;
        //Hidróxidos
        case 6:
            result = calcularHidroxidos(valoresParametrosDependientesOrdenados);
            break;
        //Carbonatos
        case 7:
            result = calcularCarbonatos(valoresParametrosDependientesOrdenados);
            break;
        // Bicarbonatos
        case 8:
            result = calcularBicarbonatos(valoresParametrosDependientesOrdenados);
            break;
        default:
            console.log('Llega parámetro con id desconocido :'+parametro);
            break;
    }
    return result;
}


const calcularPhSaturacion = (valoresParametrosDependientesOrdenados, redondear) =>{
    if (valoresParametrosDependientesOrdenados.length !== 4) {
        return -100;
    }
    let hayValor0 = false
    valoresParametrosDependientesOrdenados.map(valor =>{
        if (valor === 0) {
            hayValor0 = true;
        }
    })
    if (hayValor0 === true) {
        return -100
    }
    const tds = valoresParametrosDependientesOrdenados[0];
    const temperatura = valoresParametrosDependientesOrdenados[1];
    const durezaCalcica = valoresParametrosDependientesOrdenados[2];
    const alcalinidadM = valoresParametrosDependientesOrdenados[3];

    let result = +(9.3+(Math.log10(tds)-1)/10)+(-13.12)*Math.log10(temperatura+273)+(34.55)-(Math.log10(durezaCalcica)-0.4 + Math.log10(alcalinidadM));
    if (redondear === true) {
        return (Number(result.toFixed(1)));
    }else{
        return Number(result);
    }

}

const calcularPhEq = (valoresParametrosDependientesOrdenados, redondear) =>{
    if (valoresParametrosDependientesOrdenados.length !== 1) {
        return -100
    }

    const alcalinidadM = valoresParametrosDependientesOrdenados[0];

    if (alcalinidadM === 0) {
        return -100;
    }

    let result = 1.465*Math.log10(alcalinidadM)+4.54;
    if (redondear === true) {
        return (Number(result.toFixed(1)));
    }else{
        return Number(result)
    }
}

const calcularIndiceDePuckorius = (valoresParametrosDependientesOrdenados) =>{
    if (valoresParametrosDependientesOrdenados.length !== 4) {
        return -100
    }
    const tds = valoresParametrosDependientesOrdenados[0];
    const temperatura = valoresParametrosDependientesOrdenados[1];
    const durezaCalcica = valoresParametrosDependientesOrdenados[2];
    const alcalinidadM = valoresParametrosDependientesOrdenados[3];

    const phSaturacion = calcularPhSaturacion([tds,temperatura,durezaCalcica,alcalinidadM], false);
    const phEq = calcularPhEq([alcalinidadM], false)
    if (phSaturacion === -100 || phEq === -100) {
        return -100;
    }

    let result = 2*phSaturacion-phEq;
    return (Number(result.toFixed(1)));
}

const calcularIndiceDeRiznar = (valoresParametrosDependientesOrdenados) =>{
    if (valoresParametrosDependientesOrdenados.length !== 5) {
        return -100
    }

    const tds = valoresParametrosDependientesOrdenados[0];
    const temperatura = valoresParametrosDependientesOrdenados[1];
    const durezaCalcica = valoresParametrosDependientesOrdenados[2];
    const alcalinidadM = valoresParametrosDependientesOrdenados[3];

    const phSaturacion = calcularPhSaturacion([tds,temperatura,durezaCalcica,alcalinidadM], false);
    const ph = valoresParametrosDependientesOrdenados[4];

    if (phSaturacion === -100 || ph === -100) {
        return -100;
    }

    let result = 2*phSaturacion-ph;
    return (Number(result.toFixed(1)));
}

const calcularIndiceDeLangelier = (valoresParametrosDependientesOrdenados) =>{
    if (valoresParametrosDependientesOrdenados.length !== 5) {
        return -100
    }

    const tds = valoresParametrosDependientesOrdenados[1];
    const temperatura = valoresParametrosDependientesOrdenados[2];
    const durezaCalcica = valoresParametrosDependientesOrdenados[3];
    const alcalinidadM = valoresParametrosDependientesOrdenados[4];

    const ph = valoresParametrosDependientesOrdenados[0];
    const phSaturacion = calcularPhSaturacion([tds,temperatura,durezaCalcica,alcalinidadM], false);

    if (phSaturacion === -100 || ph === -100) {
        return -100;
    }

    let result = +ph-phSaturacion;
    return (Number(result.toFixed(1)));
}

const calcularHidroxidos = (valoresParametrosDependientesOrdenados) =>{
    if (valoresParametrosDependientesOrdenados.length !== 2) {
        return -100;
    }

    const alcalinidadM = valoresParametrosDependientesOrdenados[0];
    const alcalinidadP = valoresParametrosDependientesOrdenados[1];

    if (alcalinidadM === 0 || alcalinidadP === 0) {
        return -100;
    }

    let result = 0;
    if(alcalinidadM === alcalinidadP){
        result = alcalinidadM;
    }else{
        if (alcalinidadP > (alcalinidadM/2)) {
            result = 2*alcalinidadP-alcalinidadM; 
        }else{
            if(alcalinidadP === (alcalinidadM/2)){
                result = 0;
            }else{
              if(alcalinidadP < (alcalinidadM/2)){
                result = 0;
              }else{
                if (alcalinidadP === 0) {
                    result = 0;
                }
              }
            }
        }
    }
    return (Number(result.toFixed(1)));
}

const calcularCarbonatos = (valoresParametrosDependientesOrdenados) =>{
    if (valoresParametrosDependientesOrdenados.length !== 2) {
        return -100;
    }

    const alcalinidadM = valoresParametrosDependientesOrdenados[0];
    const alcalinidadP = valoresParametrosDependientesOrdenados[1];

    if (alcalinidadM === 0 || alcalinidadP === 0) {
        return -100;
    }

    let result = 0;
    if (alcalinidadP === alcalinidadM) {
        result = 0;
    }else{
        if (alcalinidadP > (alcalinidadM/2)) {
            result = 2*(alcalinidadM - alcalinidadP);
        }else{
            if (alcalinidadP === (alcalinidadM/2)) {
                result = alcalinidadM;
            }else{
                if (alcalinidadP < (alcalinidadM/2)) {
                    result = 2* alcalinidadP;
                }else{
                    if (alcalinidadP == 0) {
                        result = 0;
                    }
                }
            }
        }
    }

    return result;
}

const calcularBicarbonatos = (valoresParametrosDependientesOrdenados) =>{
    if (valoresParametrosDependientesOrdenados.length !== 2) {
        return -100;
    }

    const alcalinidadM = valoresParametrosDependientesOrdenados[0];
    const alcalinidadP = valoresParametrosDependientesOrdenados[1];

    if (alcalinidadM === 0 || alcalinidadP === 0) {
        return -100;
    }

    let result = 0;
    if (alcalinidadP === alcalinidadM) {
        result = 0;
    }else{
        if (alcalinidadP > (alcalinidadM/2)) {
            result = 0;
        }else{
            if (alcalinidadP === (alcalinidadM/2)) {
                result = 0;
            }else{
                if(alcalinidadP < (alcalinidadM/2)){
                    return alcalinidadM - 2 * alcalinidadP;
                }else{
                    if (alcalinidadP === 0) {
                        result = alcalinidadM;
                    }
                }
            }
        }
    }

    return result;
}