import { Checkbox, FormControlLabel } from "@mui/material"
import { useEffect } from "react";
import { useState } from "react"

export const CheckBoxAnalisis = ({ label, name, onChange, elementoSeleccionado, elementosPlanta }) => {

    const [checked, setChecked] = useState( false );

    // Escuchamos cada vez que se cambia el elemento seleccionado para actualizar el check
    useEffect(() => {

        if( elementoSeleccionado.analisis ) {

            if( elementoSeleccionado.analisis[name] ) {
                setChecked( elementoSeleccionado.analisis[name] );
            } else {
                setChecked( false );
            }

        } else {

            setChecked( false );
        }

    },[ elementoSeleccionado ]);

    return (
        <FormControlLabel
            control={
                <Checkbox
                    disabled={ (!elementoSeleccionado || elementosPlanta.length === 0) ? true : false }
                    name={ name }
                    onChange={ onChange }
                    checked={ checked }
                />
            }
            label={ label }
        />
    )
}