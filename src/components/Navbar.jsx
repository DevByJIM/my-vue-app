import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

const Navbar = () => {
    const { user, logOutUSer } = useContext(UserContext);

    const handleClickLogOut = async () => {
        try {
            await logOutUSer();
        } catch (error) {
            console.log(error.code);
        }
    };

    return (
        <div>
            <ul>
                <NavLink to="/">Inicio | </NavLink>
                {user ? (
                    <>
                        <button onClick={handleClickLogOut}>LogOut</button>
                    </>
                ) : (
                    <>
                        <NavLink to="/register"> | Register | </NavLink>
                        <NavLink to="/login">Login |</NavLink>
                    </>
                )}
            </ul>
        </div>
    );
};
export default Navbar;
