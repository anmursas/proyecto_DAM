import React from "react";
import AuthService from "../../services/auth.service"


const Profile = () => {
    const currentUser = AuthService.getCurrentUser();

    return (
        <div>
            <h3>{currentUser.username}</h3>
            <p>
                Token: {currentUser.accessToken.substring(0, 20)} ...{" "}
                {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
            </p>

            <p>
                <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>
            <strong>Authorities:</strong>
            <ul>
                {currentUser.roles &&
                    currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
        </div>
    )
}
export default Profile;