import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

const Navbar = () => {

    const { user, setUser, status, setStatus } = useContext(UserContext);
    
    return (
        <div>
            <ul>
                <NavLink to='/'>Inicio</NavLink>
                <NavLink to='/a'>Otro</NavLink>
                <NavLink to='/login'>Login</NavLink>
                <a>{status ? `  User: ${user.name} conectado` : " OFFLINE"}</a>
                   
            </ul>
        </div>
    );
};
export default Navbar;