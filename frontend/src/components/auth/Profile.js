import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import ValuesService from "../../services/ValuesService";

const Profile = () => {

    const navigate = useNavigate();

    // Variables del usuario
    const [username, setUsername] = useState("");
    const [email, setMail] = useState("");
    const [id, setId] = useState("");
    const [roles, setRoles] = useState([]);

    const [user, setUser] = useState("")

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (!user) {
            navigate("/login");
        } else {
            ValuesService.getUserByReqyest().then((response) => {
                setUser(response.data)
                console.log(response.data)
            })

        }
    }, []);

    return (
        <Paper >
            <header>
                <h3>PERFIL DE USUARIO</h3>
            </header>
            <p >
                <strong>Nombre de usuario:</strong> {user.username}
            </p>
            <p >
                <strong>Id:</strong> {user.id}
            </p>
            <p >
                <strong>Email:</strong> {user.email}
            </p>
            <p >
                <strong>Nombre y apellidos:</strong> {user.nombre}, {user.apellidos}
            </p>
            <strong>Rol:</strong>
            <ul>
                {user.roles && user.roles.map((role, index) => <li key={index}>{role.name}</li>)}
            </ul>
        </Paper>
    );
};
export default Profile;
