import { createContext, useContext, useState } from "react";

export const UserContext = createContext();



const UserProvider = (props) => {
    
    const [user, setUser] = useState({
        name: 'ByJIM',
        password: '1234'
    });
    const [status, setStatus] = useState(true);

    return (    
            <UserContext.Provider value={{user, setUser, status, setStatus}}>
                {props.children}
            </UserContext.Provider>

    );
};
export default UserProvider;