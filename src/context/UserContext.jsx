import { createContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const UserContext = createContext([]);

export const UserProvider = ({ children }) => {

    const API_USER = "https://coderbasketstore.up.railway.app//api/sessions/me"
    const verifyUser = async () => {
        let cookie = document.cookie.split("; ")
        cookie = cookie.find(each => each.split("=")[0] === "token")
        const res = await axios.post(API_USER, cookie)
        return res.data.response
    }
    return (
        <UserContext.Provider value={{ verifyUser }}>
            {children}
        </UserContext.Provider>
    );
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserProvider;