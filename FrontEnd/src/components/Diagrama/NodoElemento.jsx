import { Card, CardContent, Typography } from '@mui/material';
import { memo, useCallback, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import './NodoElemento.css'
import { GetIconoElementoPlanta } from '../../api';

function NodoElemento({ data }) {
    const [logo, setLogo] = useState("");
    GetIconoElementoPlanta(data.id).then(resp =>{
        setLogo(resp);
    });
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    return (
        <>
            <Card sx={{ height: '100%', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'row' }} variant='outlined'>
                {
                    logo!==""?(
                        <img className='icono-nodo' src={`data:image/png;base64, ${logo}`} alt="Logo" />
                    ):(
                        <div className="icono-nodo"></div>
                    )
                }

                <CardContent sx={{ p: 1 }} className='contenido-nodo' >
                    {/* <Handle type="source" position={Position.Top} /> */}
                    {
                        (data.edges === 0 || data.edges === 1) && (
                            <Handle type="source" position={Position.Right} id={data.label.replace(' ', '-')} />
                        )
                    }
                    {/* <Handle type="source" position={Position.Bottom} /> */}
                    <Typography sx={{ fontSize: 8 }}>{data.label}</Typography>
                    {
                        (data.edges === 1 || data.edges === 2) && (
                            <Handle type="target" position={Position.Left} />
                        )
                    }
                </CardContent>
            </Card>
        </>
    )
}

export default memo(NodoElemento);