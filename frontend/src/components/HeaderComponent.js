import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";

import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import logo from "../resources/logo.png";
import { Settings } from "@mui/icons-material";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ValuesService from "../services/ValuesService";
import AuthService from "../services/auth.service";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

const HeaderComponent = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [admin, setAdmin] = useState("");
    let navigate = useNavigate();

    // New/Update Candidato
    const [candi_name, setCandName] = useState("");
    const [candi_ape, setCandApe] = useState("");
    const [candi_sexo, setCandSex] = useState("");

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    function profile() {
        navigate("/profile");
        setAnchorEl(null);
    }

    function isAdmin() {
        const user = AuthService.getCurrentUser();
        if (user) {
            if (admin) {
                return (
                    <div>
                        <MenuItem onClick={(e) => profile(e)}>Profile</MenuItem>
                        <MenuItem onClick={(e) => handleOpen(e)}>Candidatos</MenuItem>
                    </div>
                );
            } else {
                return <MenuItem onClick={(e) => profile(e)}>Profile</MenuItem>;
            }
        }
    }

    function logOut() {
        AuthService.logout();
        navigate("/login");
        setCurrentUser("");
    }


    function handleMenu(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
        setOpen(false);
    }

    function handleSubmit() {
        const candi = {
            nombre: candi_name,
            apellido1: candi_ape,
            sexo: candi_sexo,
        };
        ValuesService.createCandidato(candi)
            .then((response) => { })
            .catch((error) => {
                console.log(error);
            });
        setOpen(false);
    }

    function handleOpen(e) {
        navigate("/candidatos")
        setAnchorEl(null);
        // setOpen(true);
    }

    function goTo(e) {
        navigate("/");
    }

    useEffect(() => {
        var user = AuthService.getCurrentUser();

        setCurrentUser(user);

        var admins = false;
        ValuesService.isAdmin().then((response) => {
            admins = response.data;
            setAdmin(admins);
        });
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <FormGroup></FormGroup>
            <AppBar position="static" style={{ background: "#ffffffff" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={(e) => goTo()}
                    >
                        <img alt="logo" src={logo} width="180" />
                    </IconButton>

                    <Typography
                        color="common.black"
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    ></Typography>

                    {currentUser ? (
                        <div>
                            <Typography
                                color="common.black"
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1 }}
                            >
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
                    )}

                    <div>
                        {currentUser ? (
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
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    {isAdmin()}
                                </Menu>
                            </div>
                        ) : (
                            <div> </div>
                        )}
                    </div>
                </Toolbar>
            </AppBar>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Candidato</DialogTitle>
                <DialogContent>
                    <DialogContentText>Candidato Nuevo</DialogContentText>
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
                        <FormControlLabel
                            onChange={(e) => setCandSex(e.target.value)}
                            value="F"
                            control={<Radio />}
                            label="Mujer"
                        />
                        <FormControlLabel
                            onChange={(e) => setCandSex(e.target.value)}
                            value="M"
                            control={<Radio />}
                            label="Hombre"
                        />
                    </RadioGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        disabled={!(candi_name && candi_ape && candi_sexo)}
                        onClick={handleSubmit}
                    >
                        Crear
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default HeaderComponent;
