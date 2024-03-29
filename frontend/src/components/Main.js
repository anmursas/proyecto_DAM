import * as React from "react";
import { Button, Box, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddProcesoComponent from "./AddProcesoComponent";
import ListProcesoComponent from "./ListProcesoComponent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ValuesService from "../services/ValuesService";

function getStepContent(step) {
    switch (step) {
        case 0:
            return <ListProcesoComponent />;
        case 1:
            return <AddProcesoComponent />;
        default:
            throw new Error("Unknown step");
    }
}

const theme = createTheme();

export default function Checkout() {
    const [activeStep, setActiveStep] = useState(0);
    const [admin, setAdmin] = useState(false);
    let navigate = useNavigate();

    const handleNext = () => {
        if (activeStep < 1) {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    function mostrando_() {
        if (activeStep === 0) {
            if (admin) {
                return (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Typography
                            sx={{ flex: "1 1 100%", paddingTop: 2 }}
                            variant="h4"
                            id="tableTitle"
                            style={{ fontWeight: "bold" }}
                        >
                            Procesos de selección
                        </Typography>

                        <Button onClick={handleNext} sx={{ mt: 2, ml: 1, mr: 2 }}>
                            <svg
                                data-v-1f90038a=""
                                viewBox="0 0 16 16"
                                width="1em"
                                height="1em"
                                focusable="false"
                                role="img"
                                alt="icon"
                                id="nueva-imputacion"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="rgb(31, 17, 97)"
                                style={{ height: 32, width: 32 }}
                            >
                                <g>
                                    <path
                                        fillRule="evenodd"
                                        d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z"
                                        clipRule="evenodd"
                                    ></path>
                                    <path
                                        fillRule="evenodd"
                                        d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z"
                                        clipRule="evenodd"
                                    ></path>
                                    <path
                                        fillRule="evenodd"
                                        d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z"
                                        clipRule="evenodd"
                                    ></path>
                                </g>
                            </svg>
                        </Button>
                    </Box>
                );
            } else if (!admin) {
                return (
                    <Typography
                        sx={{ flex: "1 1 100%", paddingTop: 2 }}
                        variant="h4"
                        id="tableTitle"
                        style={{ fontWeight: "bold" }}
                    >
                        Procesos de selección
                    </Typography>
                );
            }
        } else if (activeStep === 1) {
            return (
                <Box sx={{ display: "row", justifyContent: "center" }}>
                    <Typography
                        sx={{ flex: "1 1 100%", paddingTop: 2 }}
                        variant="h4"
                        id="tableTitle"
                        style={{ fontWeight: "bold" }}
                    >
                        Nuevo Proceso de selección
                    </Typography>
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1, mb: -2 }}>
                        <ArrowBackIcon />
                    </Button>
                </Box>
            );
        }
    }

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        var admin = false;

        if (!user) {
            navigate("/login");
        } else {
            ValuesService.isAdmin().then((response) => {
                setAdmin(response.data);
                admin = response.data;
            });
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            {mostrando_()}

            {getStepContent(activeStep)}
        </ThemeProvider>
    );
}
