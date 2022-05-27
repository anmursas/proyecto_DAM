import React, { useState } from "react";
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
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";



const SignUp = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [role, setRole] = useState(["user"])

  const register = {
    username: username,
    nombre: nombre,
    apellidos: apellidos,
    email: email,
    password: password,
    role: role
  }

  const [repeatedPassword, setrepeatedPassword] = useState("");

  const [showPassword, setshowPassword] = useState(false)

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const theme = createTheme();

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword)
  };

  function onChangeRole(e) {
    var checked = e.target.checked;
    if (checked) {
      setRole(["admin"]);
    } else {
      setRole(["user"]);
    }

  }

  function handleSubmit(event) {
    event.preventDefault();
    if (nombre && apellidos && email && password && (password === repeatedPassword)) {
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
                  label="username"
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
                  label="password"
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
                          onClick={handleClickShowPassword}
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
                  label="repeat password"
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
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}

                        </IconButton>
                      </InputAdornment>
                    )
                  }} />
              </Grid>


              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" onClick={(e) => onChangeRole(e)} color="primary" />}
                  label="ADMINISTRADOR"
                />
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
    </ThemeProvider>
  );

}

export default SignUp;

