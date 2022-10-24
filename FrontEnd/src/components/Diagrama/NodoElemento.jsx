import { Card, CardContent, Typography } from '@mui/material';
import { useCallback } from 'react';
import { Handle, Position } from 'react-flow-renderer';

export const NodoElemento = ({ data }) => {

    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    return (
        <Card sx={{ height: '100%', backgroundColor: '#ffffff' }} variant='outlined'>
            <CardContent sx={{ p: 1 }}>
                {
                    (data.edges === 0 || data.edges === 1) && (
                        <Handle type="source" position={ Position.Right } id={ data.label.replace(' ', '-') } />
                    )
                }
                <Typography sx={{ fontSize: 10 }}>{ data.label }</Typography>
                {
                    (data.edges === 1 || data.edges === 2) && (
                        <Handle type="target" position={ Position.Left } />
                    )
                }
            </CardContent>
        </Card>
    )
}