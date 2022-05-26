import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AuthService from "../../services/auth.service";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const theme = createTheme();
    const [showPassword, setshowPassword] = useState(false);

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage("");

        AuthService.login(username, password).then(() => {
            window.location.reload(true);
        }, (error) => {
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            setMessage(resMessage);
            setPassword("");
        }
        );
    };

    const handleClickShowPassword = () => {
        setshowPassword(!showPassword)
    };




    // Al cargar el componentes comprobamos si hay un usuario, si hay, pasamos a la página de inicio
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            navigate("/");
        }
    }, []);

    return (
        <Container  maxWidth="xs">
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
                        label="username"
                        type="username"
                        autoFocus
                        value={username}
                        onChange={onChangeUsername}
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
                        label="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={onChangePassword}
                        error={password.length === 0}
                        helperText={
                            password.length === 0 ? "Debes introducir una contraseña" : ""
                        }
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
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
