import { createUserWithEmailAndPassword,onAuthStateChanged,signInWithEmailAndPassword,signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
export const UserContext = createContext();

const UserProvider = (props) => {
    const [user, setUser] = useState(false);

    useEffect(() =>{
        const unsuscribe = onAuthStateChanged(auth,user =>{
            // console.log(user);
            if(user){
                const { email, photoURL, displayName, uid} = user;
                setUser({email,displayName,photoURL,uid});
            }else{
                setUser(null);
            }
        })
        return () => unsuscribe()
    },[])
    // const [status, setStatus] = useState(true);

    const registerUser = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password);

    const loginUser = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    const logOutUSer = () => signOut(auth);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                registerUser,
                loginUser,
                logOutUSer,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};
export default UserProvider;
