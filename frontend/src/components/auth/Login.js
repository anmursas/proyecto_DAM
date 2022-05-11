import React, { useState, useRef, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AuthService from "../../services/auth.service"
import { textAlign } from "@mui/system";





const Login = () => {
    

    let navigate = useNavigate();
    const checkBtn = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


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

        AuthService.login(username, password).then((response) => {
            window.location.reload(true);
        },
            (error) => {
                const resMessage =
                    (
                        error.response &&
                        error.response.data &&
                        error.response.data.message
                    ) || error.message || error.toString();
                setMessage(resMessage);
                setPassword("")
            }
        );



    };


    const theme = createTheme();


    function Copyright(props) {
        return (
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © '}
                <Link color="inherit" href="https://mui.com/">
                    Your Website
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }


    useEffect(() => {
        const user = AuthService.getCurrentUser()
        if (user) {
            navigate("/")
        }
    }, [])


    useEffect(() => {
        if (username.length <= 4 && username.length > 0) {
            setErrorMessage("username not valid")
        }

        if (username.length == 0) {
            setErrorMessage("debes introducir un usuario")
        }
    }, [username])

    useEffect(() => {
        if (username.length > 4 && errorMessage) {
            setErrorMessage("")
        }
    }, [username, errorMessage])



    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="username"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={username}
                            onChange={onChangeUsername}
                            error={username.length == 0}
                            helperText={textAlign.length == 0 ? "Debes introducir un nombre de usuario" : ""}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={onChangePassword}
                            error={password.length == 0}
                            helperText={password.length == 0 ? "Debes introducir una contraseña" : ""}
                        />
                        <FormControlLabel
                            control={<Checkbox ref={checkBtn} value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            onClick={handleLogin}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>

                        {message && (
                            <Alert severity="error">
                                {message}
                            </Alert>
                        )}

                        <Grid container>
                           
                            <Grid item>
                                <Link href="/singup" variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    )
}

export default Login;

