import React, { useState, useEffect } from "react";
import { FormGroup, MenuItem, Button, AppBar, Box, Toolbar, IconButton, Typography, Menu } from "@mui/material";

import logo from "../resources/logo.png";
import { Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ValuesService from "../services/ValuesService";
import AuthService from "../services/auth.service";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

const HeaderComponent = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [admin, setAdmin] = useState("");
    let navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);

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
    }


    function handleOpen(e) {
        navigate("/candidatos")
        setAnchorEl(null);
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
        </Box>
    );
};

export default HeaderComponent;
