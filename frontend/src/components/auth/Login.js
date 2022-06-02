import React, { useState, useEffect } from "react";
import { Avatar, Button, TextField, Link, Box, IconButton, Typography, Container, InputAdornment, Alert } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AuthService from "../../services/auth.service";

const Login = () => {

    const navigate = useNavigate();

    // Variables usuario y contraseña
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Variables de uso
    const [message, setMessage] = useState("");
    const [showPassword, setshowPassword] = useState(false);

    

    // Funcion que envia usuario y contraseña a la API
    function handleLogin(e) {
        e.preventDefault();
        setMessage("");

        AuthService.login(username, password).then(() => {
            window.location.reload(true);
        }, (error) => {
            const resMessage = (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            setMessage(resMessage);
            setPassword("");
            setUsername("")
        }
        );
    }



    // Al cargar el componentes comprobamos si hay un usuario, si hay, pasamos a la página de inicio
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Iniciar Sesión
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleLogin}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Nombre de usuario"
                        type="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        error={username.length === 0}
                        helperText={
                            username.length === 0
                                ? "Debes introducir un nombre de usuario"
                                : ""
                        }
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Contraseña"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={password.length === 0}
                        helperText={
                            password.length === 0 ? "Debes introducir una contraseña" : ""
                        }
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={(e) => setshowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}

                                    </IconButton>
                                </InputAdornment>
                            )
                        }} />


                    <Button
                        onClick={handleLogin}
                        type="submit"
                        fullWidth
                        disabled={!(password && username)}
                        variant="contained"
                        sx={{ mb: 2 }}
                    >
                        Iniciar Sesión
                    </Button>

                    {message && <Alert severity="error">{message}</Alert>}


                    <Link onClick={(e) => navigate("/signup")} variant="body2">
                        Regístrate
                    </Link>

                </Box>
            </Box>
        </Container>
    );
};

export default Login;