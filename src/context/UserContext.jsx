import { createContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Swal from "sweetalert2";

export const UserContext = createContext([]);

export const UserProvider = ({ children }) => {

    const API_USER = "http://localhost:8080/api/sessions/me"
    const verifyUser = async () => {
        try {
            let cookie = document.cookie.split("; ")
            cookie = cookie.find(each => each.split("=")[0] === "token")
            const res = await axios.post(API_USER, cookie)
            return res.data.response
        } catch (error) {
            Swal.fire({
                title: `${error.message}`,
                icon: "error",
                text: "Please, try again in a while.",
            }).then(() => {
                location.replace('/');
            });
        }

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