import { Card, CardContent, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import InfoIcon from '@mui/icons-material/Info';
import { DashboardContext } from '../../context/DashboardContext';
import { AuthContext } from '../../context/AuthContext';
import { GetIconoElementoPlanta } from '../../api';
import './NodoElemento.css'

export const NodoElementoDashboard = ({ data }) => {

    const { handleSeleccionarElemento } = useContext(DashboardContext);
    const { user } = useContext(AuthContext);
    const [logo, setLogo] = useState("");
    GetIconoElementoPlanta(data.id).then(resp => {
        setLogo(resp);
    });
    
    return (

        <Grid  sx={{ height: '100%', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'row' }}>
            <Grid width={{ width: '30px', height: '100%' }}>
                {
                    logo !== "" ? (
                        <div className='icono-nodo'>
                            <img className='icono-nodo' src={`data:image/png;base64, ${logo}`} alt="Logo" />
                        </div>
                    ) : (
                        <div className="icono-nodo"></div>
                    )
                }
            </Grid >
            <Grid 
                sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', cursor: 'pointer' }}
                onClick={() => handleSeleccionarElemento(data.id)}
            >
                {
                    (data.edges === 0 || data.edges === 1) && (
                        <Handle type="source" position={Position.Right} id={data.label.replace(' ', '-')} />
                    )
                }
                <Grid container justifyContent='center'>
                    <Grid sx={{ width: '80%', height: '100%' }}>
                        <Grid item sx={{ height: '100%' }}>
                            <Typography sx={{ fontSize: 8, margin: 'revert' }}>{data.label}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {
                    user.idPerfil === 4 && data.verInsp === false ?
                        <></>
                        :
                        <Grid item sx={{ marginLeft: 'auto', width: '20%' }}>
                            <Tooltip title="Mostrar información" placement="left">
                                <IconButton
                                    aria-label="info"
                                    size="small"
                                    onClick={() => handleSeleccionarElemento(data.id)}
                                    sx={{ p: 1, marginTop: '5px' }}
                                >
                                    <InfoIcon sx={{ fontSize: 15 }} />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                }

                {
                    (data.edges === 1 || data.edges === 2) && (
                        <Handle type="target" position={Position.Left} />
                    )
                }
            </Grid>
        </Grid>

        // <Card sx={{ height: '100%', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'row' }} variant='outlined'>
        //     {
        //         logo !== "" ? (
        //             <div className='icono-nodo'>
        //                 <img className='icono-nodo' src={`data:image/png;base64, ${logo}`} alt="Logo" />
        //             </div>
        //         ) : (
        //             <div className="icono-nodo"></div>
        //         )
        //     }
        //     <CardContent sx={{ p: 0.5, width: '100%', height:'100%', verticalAlign:'center' }}>

        //         {

        //             (data.edges === 0 || data.edges === 1) && (
        //                 <Handle type="source" position={Position.Right} id={data.label.replace(' ', '-')} />
        //             )
        //         }
        //         <Grid container sx={{ display: 'flex', flexDirection: 'row', height:'100%' }}>

        //             <Grid sx={{ width: '80%', justifyContent: 'space-between', verticalAlign:'center', marginTop:'auto', marginBottom:'auto' }}>
        //                 <Grid item>
        //                     <Typography sx={{ fontSize: 8, fontStretch: 'expanded' }}>{data.label}</Typography>
        //                 </Grid>
        //             </Grid>
        //             {
        //                 user.idPerfil === 4 && data.verInsp === false ?
        //                     <></>
        //                     :
        //                     <Grid item sx={{ marginLeft: 'auto' }}>
        //                         <Tooltip title="Mostrar información" placement="left">
        //                             <IconButton
        //                                 aria-label="info"
        //                                 size="small"
        //                                 onClick={() => handleSeleccionarElemento(data.id)}
        //                                 sx={{ p: 0, mt: -1.5 }}
        //                             >
        //                                 <InfoIcon sx={{ fontSize: 15 }} />
        //                             </IconButton>
        //                         </Tooltip>
        //                     </Grid>
        //             }

        //             {
        //                 (data.edges === 1 || data.edges === 2) && (
        //                     <Handle type="target" position={Position.Left} />
        //                 )
        //             }
        //         </Grid>
        //     </CardContent>
        // </Card>
    )
}