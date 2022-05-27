import axios from "axios";

const API_URL = "http://localhost:8090/api/auth/";

const register = (request) => {
    return axios.post(API_URL + "signup", request);
};
const login = (username, password) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                sessionStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};
const logout = () => {
    sessionStorage.removeItem("user");
};
const getCurrentUser = () => {
    return JSON.parse(sessionStorage.getItem("user"));
};
const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};
export default AuthService;