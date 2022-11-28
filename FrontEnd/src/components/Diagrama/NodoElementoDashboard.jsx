import { Card, CardContent, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { useCallback, useContext } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import InfoIcon from '@mui/icons-material/Info';
import { DashboardContext } from '../../context/DashboardContext';

export const NodoElementoDashboard = ({ data }) => {

    const { handleSeleccionarElemento } = useContext( DashboardContext );

    return (
        <Card sx={{ height: '100%', backgroundColor: '#ffffff' }} variant='outlined'>
            <CardContent sx={{ p: 1 }}>
                {
                    (data.edges === 0 || data.edges === 1) && (
                        <Handle type="source" position={ Position.Right } id={ data.label.replace(' ', '-') } />
                    )
                }
                <Grid container sx={{ width: '100%', justifyContent: 'space-between' }}>
                    <Grid item>
                        <Typography sx={{ fontSize: 8 }}>{ data.label }</Typography>
                    </Grid>
                    <Grid item>
                        <Tooltip title="Mostrar información" placement="left">
                            <IconButton
                                aria-label="info"
                                size="small"
                                onClick={ () => handleSeleccionarElemento( data.id ) }
                                sx={{ p: 0, mt: -1.5 }}
                            >
                                <InfoIcon sx={{ fontSize: 15 }} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
                {
                    (data.edges === 1 || data.edges === 2) && (
                        <Handle type="target" position={ Position.Left } />
                    )
                }
            </CardContent>
        </Card>
    )
}