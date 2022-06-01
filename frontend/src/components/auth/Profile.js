import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";

const Profile = () => {

    const navigate = useNavigate();

    // Variables del usuario
    const [username, setUsername] = useState("");
    const [email, setMail] = useState("");
    const [id, setId] = useState("");
    const [roles, setRoles] = useState([]);


    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (!user) {
            navigate("/login");
        } else {
            setUsername(user.username);
            setMail(user.email);
            setId(user.id);
            setRoles(user.roles);
        }
    }, []);

    return (
        <div>
            <header>
                <h3>
                    <strong>{username}</strong> Profile
                </h3>
            </header>
            <p>
                <strong>Id:</strong> {id}
            </p>
            <p>
                <strong>Email:</strong> {email}
            </p>
            <strong>Rol:</strong>
            <ul>
                {roles && roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
        </div>
    );
};
export default Profile;
