import React, { useState } from "react";
import { IconButton, InputAdornment, Typography, Box, Container, Alert, Avatar, Button, CssBaseline, TextField, Link, Grid } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import AuthService from "../../services/auth.service"

const SignUp = () => {

  const navigate = useNavigate();

  // Variables de usuario
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [role, setRole] = useState(["user"])

  // Variables de componente
  const [repeatedPassword, setrepeatedPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false)
  const [message, setMessage] = useState("");

  // Usuario a registrar
  const register = {
    username: username,
    nombre: nombre,
    apellidos: apellidos,
    email: email,
    password: password,
    role: role
  }

  // Envía petición POST a la API para dar de alta un nuevo usuario 
  function handleSubmit(event) {
    event.preventDefault(); // Para que no haga el submit directamente
    if (nombre && apellidos && email && password && (password === repeatedPassword)) { // Comprobamos que los valores son correctos
      AuthService.register(register).then((response) => {
        navigate("/login");
      }, (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
      });
    } else {

    }
  }
  
  return (
    <Container component="main" maxWidth="xs">
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Nombre"
                autoFocus
                value={nombre}
                onChange={(e => setNombre(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Apellido(s)"
                value={apellidos}
                onChange={(e => setApellidos(e.target.value))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email"
                value={email}
                onChange={(e => setEmail(e.target.value))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Nombre de usuario"
                name="email"
                autoComplete="email"
                value={username}
                onChange={(e => setUsername(e.target.value))}
                error={username.length === 0}
                helperText={username.length === 0 ? "Debes introducir un nombre de usuario" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={password}
                onChange={(e => setPassword(e.target.value))}
                error={password.length === 0 || password.length <= 8}
                helperText={password.length === 0 || password.length <= 8 ? "La contraseña debe tener mínimo 8 caracteres" : ""}
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
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Repita la contraseña"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={repeatedPassword}
                error={password !== repeatedPassword}
                onChange={(e => setrepeatedPassword(e.target.value))}
                helperText={password !== repeatedPassword ? "Las contraseñas no coinciden" : ""}
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
            </Grid>
          </Grid>
          {message && (
            <Alert severity="error">
              {message}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            disabled={!(nombre && apellidos && email && password && (password === repeatedPassword))}
          >
            Sign Up
          </Button>

          <Link onClick={(e) => navigate("/login")} variant="body2">
            Already have an account? Sign in
          </Link>

        </Box>
      </Box>
    </Container>
  );

}

export default SignUp;

