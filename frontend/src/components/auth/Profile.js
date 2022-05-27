import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";

const Profile = () => {
    const [accessToken, setAccessToken] = useState("");
    const [username, setUsername] = useState("");
    const [email, setMail] = useState("");
    const [id, setId] = useState("");
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (!user) {
            navigate("/login");
        } else {
            setAccessToken(user.accessToken);
            setUsername(user.username);
            setMail(user.email);
            setId(user.id);
            setRoles(user.roles);

        }
    }, [navigate]);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{username}</strong> Profile
                </h3>
            </header>
            <p>
                <strong>Token:</strong> {accessToken.substring(0, 20)} ...{" "}
                {accessToken.substr(accessToken.length - 20)}
            </p>
            <p>
                <strong>Id:</strong> {id}
            </p>
            <p>
                <strong>Email:</strong> {email}
            </p>
            <strong>Authorities:</strong>
            <ul>
                {roles && roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
        </div>
    );
};
export default Profile;
