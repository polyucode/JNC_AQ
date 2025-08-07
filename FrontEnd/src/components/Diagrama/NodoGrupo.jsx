import { Card, CardContent, Typography } from '@mui/material';
import { useCallback } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import OpenWithIcon from '@mui/icons-material/OpenWith';


const dragHandleStyle = {
    display: 'inline-block',
    marginLeft: 5,
    borderRadius: '50%',
    marginLeft:'0px',
    marginTop:'0px'
};

export const NodoGrupo = ({ data }) => {
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    const onConnect = (params) => console.log('handle onConnect', params);
    return (
        <>
            {/* <Handle type="target" position={Position.Left} onConnect={onConnect} /> */}
            <Card sx={{ height: '100%', backgroundColor: '#eeeeee' }} variant='outlined'>
                <CardContent sx={{ p: 1, display:'flex', flexDirection:'row' }}>
                <div className="custom-drag-handle" style={dragHandleStyle}>
                    <OpenWithIcon sx={{width:'16px', height:'16px'}}/>
                </div>
                    <Typography sx={{ fontSize: 10, marginLeft:'4px' }}>{data.label}</Typography>
                </CardContent>

            </Card>
            {/* <Handle type="source" position={Position.Right} /> */}
        </>
    )
}