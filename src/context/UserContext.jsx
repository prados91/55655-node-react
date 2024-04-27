import { createContext, useState } from "react";

export const UserContext = createContext([]);

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [prem, setPrem] = useState(false)
    const [role, setRole] = useState("")
    const [userName, setUserName] = useState("")
    const [id, setId] = useState("")


    return (
        <UserContext.Provider value={{ user, setUser, admin, setAdmin, role, setRole, prem, setPrem, userName, setUserName, id, setId }}>
            {children}
        </UserContext.Provider>
    );

}

export default UserProvider;