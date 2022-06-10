import { Typography, Link } from "@mui/material";
import React from "react";

export const FooterComponent = () => {
    return (
        <div>
            <footer>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    sx={{ mt: 8, mb: 4 }}
                >
                    {"Copyright © "}
                    <Link color="inherit" href="https://cps.es">
                        CPS
                    </Link>{" "}
                    {new Date().getFullYear()}
                    {"."}
                </Typography>
            </footer>
        </div>
    );
};
