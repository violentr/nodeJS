import axios from 'axios';
const API_URL = "http://localhost:4000/api";

const signup = ({firstName, lastName, username, email, password}) => {
    return axios.post(`${API_URL}/signup`, {
        firstName,
        lastName,
        username,
        email,
        password,
    })
}

const login = ({emailOUsername, password}) =>{
    return axios
    .post(`${API_URL}/login/`,{emailOUsername, password})
    .then((res) =>{
        localStorage.setItem("user", JSON.parse(res.data));
        return res.data;
    })
}

const logout = () => {
    localStorage.removeItem("user");
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

const AuthService ={
    signup,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;