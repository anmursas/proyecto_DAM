import { Typography } from "@mui/material";
import React from "react";
import Link from "@mui/material/Link";

export const FooterComponent = () => {
    return (
        <div>
            <footer className="footer">
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
