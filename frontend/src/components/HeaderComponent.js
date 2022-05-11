import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../resources/logo.png'
import { Settings } from '@mui/icons-material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, Radio, RadioGroup, Switch, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ValuesService from '../services/ValuesService';
import AuthService from '../services/auth.service';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';



function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
        return null;
    }
}


const HeaderComponent = () => {

    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [rol, setRol] = useState("")




    let navigate = useNavigate();

    const profile = () => {
        navigate("/profile")
        setAnchorEl(null)
    }

    const isAdmin = () => {
        const user = AuthService.getCurrentUser();
        if (user) {           

            if (rol) {
                console.log("EAAA")

                return <div>
                    <MenuItem onClick={(e) => profile(e)}>Profile</MenuItem>
                    <MenuItem onClick={(e) => handleOpen(e)}>Add Candidatos</MenuItem>
                </div>


            } else {
                console.log("EAAA")

                return <MenuItem onClick={(e) => profile(e)}>Profile</MenuItem>

            }

        }

    }

    const logOut = () => {
        AuthService.logout();
        navigate("/login")
        setCurrentUser("")
        setShowAdminBoard(false)
        setShowModeratorBoard(false)
    };
    // New/Update Candidato
    const [candi_name, setCandName] = useState('');
    const [candi_ape, setCandApe] = useState('');
    const [candi_sexo, setCandSex] = useState('');

    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false)

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false)
    };

    function handleSubmit() {
        const candi = {
            "nombre": candi_name,
            "apellido1": candi_ape,
            "sexo": candi_sexo
        };
        ValuesService.createCandidato(candi).then((response) => {
        }).catch(error => {
            console.log(error);
        });
        setOpen(false);

    }

    function handleOpen(e) {
        setAnchorEl(null)
        setOpen(true)
        ValuesService.getAllCandidatos().then((response) => {
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })
    }

    function goTo(e) {
        navigate('/')
    }

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            console.log(user)
            setCurrentUser(user);
            console.log("EAAA")
            const decodedJwt = parseJwt(user.accessToken);
            console.log("EAAA")

            setRol(decodedJwt.sub)
            console.log("EAAA")
        }

    }, []);





    return (
        <Box sx={{ flexGrow: 1 }}>
            <FormGroup>

            </FormGroup>
            <AppBar position="static" style={{ background: '#ffffffff' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={(e) => goTo()}
                    >
                        <img alt='logo' src={logo} width="180" />
                    </IconButton>

                    <Typography color="common.black" variant="h6" component="div" sx={{ flexGrow: 1 }}>

                    </Typography>



                    {currentUser ? (
                        <div>
                            <Typography color="common.black" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                {currentUser.username}
                            </Typography>
                            <Button onClick={logOut}>
                                <LogoutIcon />
                                Cerrar sesión
                            </Button>
                        </div>

                    ) : (
                        <div>
                            <Button onClick={(e) => navigate("/login")}>
                                <LoginIcon />
                                Iniciar Sesión
                            </Button>
                            {/* <a href="/login">Iniciar Sesión</a> */}
                        </div>
                    )

                    }


                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            sx={{ flexGrow: 1 }}
                        >
                            <Settings />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >

                            {isAdmin()}
                        </Menu>
                    </div>

                </Toolbar>
            </AppBar>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Candidato</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Candidato Nuevo
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nombre"
                        label="Nombre"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setCandName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Apellido"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setCandApe(e.target.value)}

                    />
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel onChange={(e) => setCandSex(e.target.value)} value="F" control={<Radio />} label="Mujer" />
                        <FormControlLabel onChange={(e) => setCandSex(e.target.value)} value="M" control={<Radio />} label="Hombre" />
                    </RadioGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={!(candi_name && candi_ape && candi_sexo)} onClick={handleSubmit}>Crear</Button>
                </DialogActions>
            </Dialog>
        </Box >


    )
}

export default HeaderComponent;