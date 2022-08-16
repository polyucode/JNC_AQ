import React from 'react';
import { FormControl, Grid, Card, CardActions, CardContent, CardMedia, Button, TextField, Typography, Alert, AlertTitle } from '@mui/material';
import { LoginLayout } from '../layout/LoginLayout';
import { useLoginForm } from '../hooks/useLoginForm';


export const LoginPage = () => {

    const { loginData, loginError, handleChange, handleSubmit } = useLoginForm();    

    return (

        <LoginLayout title="Login">

            <Grid
                container
                justifyContent="center"
                sx={{ mt: 8 }}
            >

                <Grid item xs={12} sm={7} md={5} lg={4} >

                    <Card
                        sx={{
                            p: { xs: 2, sm: 2, md: 5 }
                        }}
                        className="animate__animated animate__fadeInLeft"
                    >
                        <CardMedia
                            component="img"
                            width="80"
                            image="/img/logo2.svg"
                            alt="Logo JNegre"
                        />
                        <CardContent sx={{ p: 0, mb: 2 }}>
                            <FormControl sx={{ width: '100%' }}>

                                <Typography sx={{
                                    mt: 4,
                                    mb: 1,
                                    fontSize: 20,
                                    textAlign: { xs: 'center', sm: 'center', md: 'left' }
                                }}>
                                    Nombre de usuario
                                </Typography>
                                <TextField
                                    id="usuario"
                                    hiddenLabel
                                    variant="filled"
                                    value={ loginData.usuario }
                                    name="usuario"
                                    onChange={ handleChange }
                                    sx={{ mb: 2 }}
                                />

                                <Typography sx={{
                                    mt: 2,
                                    mb: 1,
                                    fontSize: 20,
                                    textAlign: { xs: 'center', sm: 'center', md: 'left' }
                                }}>
                                    Contraseña
                                </Typography>
                                <TextField
                                    id="contrasena"
                                    hiddenLabel
                                    variant="filled"
                                    type="password"
                                    value={ loginData.contrasena }
                                    name="contrasena"
                                    onChange={ handleChange }
                                    sx={{ mb: 2 }}
                                />

                            </FormControl>

                            {
                                loginError.error && (
                                    <Alert severity="error" className="animate__animated animate__bounceIn">
                                        <AlertTitle>Error</AlertTitle>
                                        { loginError.errorMessage }
                                    </Alert>
                                )
                            }

                        </CardContent>
                        <CardActions
                            sx={{
                                p: 0,
                                justifyContent: { xs: 'center', md: 'left' }
                            }}
                        >
                            <Button
                                variant='contained'
                                sx={{
                                    width: { xs: '60%', md: 'auto' },
                                    mt: 1,
                                    mb: { xs: 2, md: 0 }
                                }}
                                onClick={ handleSubmit }
                            >
                                Iniciar sesión
                            </Button>
                        </CardActions>
                    </Card>

                </Grid>

            </Grid>

        </LoginLayout>
    );
}