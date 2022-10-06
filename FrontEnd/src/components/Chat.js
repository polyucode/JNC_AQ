
export const Chat = () => {

    return (
        <div className='col3'>
            <h5>Comentarios del Elemento de Planta</h5>
            <hr />
            <div className='box-com-contenedor'>
                <List>
                    <ListItem
                        alignItems="flex-start"
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Hola, esto es un mensaje de prueba"
                            secondary="Usuario Random"
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem
                        alignItems="flex-start"
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Hola, esto es un mensaje de prueba"
                            secondary="Usuario Random"
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem
                        alignItems="flex-start"
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Hola, esto es un mensaje de prueba"
                            secondary="Usuario Random"
                        />
                    </ListItem>
                </List>
            </div>
            <div className='box-com-crear'>
                <TextField
                    id="filled-multiline-static"
                    label="Introduce un comentario"
                    multiline
                    rows={4}
                    variant="filled"
                    style={{ marginBottom: '18px' }}
                />
                <Button
                    variant="contained"
                    startIcon={<AddOutlinedIcon />}
                    style={{ width: '100%' }}
                >Añadir</Button>
            </div>
        </div>
    )
}