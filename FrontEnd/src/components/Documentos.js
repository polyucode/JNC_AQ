
export const Documentos = () => {

    return (
        <div className='col4'>
            <h5>Documentos</h5>
            <hr />
            <div className='documentos-contenedor'>
                <List component="nav" aria-labelledby="nested-list-subheader">

                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary="Carpeta principal" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItemButton sx={{ pl: 4 }} onClick={handleClick}>
                                <ListItemIcon>
                                    <FolderIcon />
                                </ListItemIcon>
                                <ListItemText primary="GENERALES" />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>

                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>

                                    <ListItemButton onContextMenu={handleContextMenu} sx={{ pl: 6 }}>
                                        <ListItemIcon>
                                            <InsertDriveFileIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Archivo 1.pdf" />
                                    </ListItemButton>

                                    <ListItemButton sx={{ pl: 6 }}>
                                        <ListItemIcon>
                                            <InsertDriveFileIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Archivo 2.pdf" />
                                    </ListItemButton>

                                </List>
                            </Collapse>

                            <ListItemButton onClick={handleClick}>
                                <ListItemIcon>
                                    <FolderIcon />
                                </ListItemIcon>
                                <ListItemText primary="Carpeta 2" />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>

                        </List>
                    </Collapse>
                </List>
                <Menu
                    open={contextMenu !== null}
                    onClose={handleClose}
                    anchorReference="anchorPosition"
                    anchorPosition={
                        contextMenu !== null
                            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                            : undefined
                    }
                >
                    <MenuItem onClick={handleClose}>Crear carpeta</MenuItem>
                    <MenuItem onClick={handleClose}>Cambiar nombre</MenuItem>
                    <MenuItem onClick={handleClose}>Subir documento</MenuItem>
                    <MenuItem onClick={handleClose}>Abrir</MenuItem>
                </Menu>
            </div>
        </div>
    )
}