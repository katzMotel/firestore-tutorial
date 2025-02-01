import {createContext, useContext, useState} from "react";

//create a context for the user object
const UserContext = createContext();
export const useUser = () => {
    return useContext(UserContext);
}

export const UserProvider = ({ children }) =>{
    const [user, setUser] = useState({
        name: 'Dylan Giddens',
        age: 30,
    });
    return(
        <UserContext.Provider value = {user}>
            {children}
        </UserContext.Provider>
    )
}