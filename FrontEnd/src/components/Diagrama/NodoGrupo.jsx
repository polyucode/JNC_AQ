import { Card, CardContent, Typography } from '@mui/material';
import { useCallback } from 'react';
import { Handle, Position } from 'react-flow-renderer';

export const NodoGrupo = ({ data }) => {

    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    return (
        <Card sx={{ height: '100%', backgroundColor: '#eeeeee' }} variant='outlined'>
            <CardContent sx={{ p: 1 }}>
                <Typography sx={{ fontSize: 10 }}>{ data.label }</Typography>
            </CardContent>
        </Card>
    )
}