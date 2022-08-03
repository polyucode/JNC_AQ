
import { AppTheme } from './theme';
import { AppRouter } from './router/AppRouter';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useParserFront, useParserBack } from './hooks';


export default function App() {

  const { parametrosFront, cambiarCampoFijo } = useParserFront();
  const { parametrosBack, setDatosParametrosBack } = useParserBack();

  const prueba = () => {

    const campo = {
      ...parametrosFront.parametrosFijos.alcalinitatM
    }
  
    cambiarCampoFijo('alcalinitatM', campo, 'LimSup', 20 );

  }

  const prueba2 = () => {

    setDatosParametrosBack( parametrosFront );
  
    console.log( parametrosBack );

  }

  return (
    <>
    <button onClick={ () => prueba() }>Click me</button>
    <button onClick={ () => prueba2() }>Backend</button>
    {/* <AppTheme>
      <AppRouter />
    </AppTheme> */}
    </>
  );
}


