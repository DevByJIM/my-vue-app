import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

const Navbar = () => {
    const { user, logOutUSer } = useContext(UserContext);

    const classButtonBlue =
        "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
    const classButtonRed =
        "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800";

    const handleClickLogOut = async () => {
        try {
            await logOutUSer();
        } catch (error) {
            console.log(error.code);
        }
    };

    return (
        <nav className="bg-teal-600 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link to="/" className="flex items-center">
                    <span className="text-white self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
                        URLsApp ByJIM®2022
                    </span>
                </Link>
                <div className="flex md:order-2">
                    {user ? (
                        <>
                            <NavLink to="/" className={classButtonBlue}>Inicio </NavLink>
                            <button onClick={handleClickLogOut} className={classButtonRed}>LogOut</button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/register" className={classButtonBlue}>Register</NavLink>
                            <NavLink to="/login" className={classButtonBlue}>Login</NavLink>
                        </>
                    )}

                </div>
            </div>
        </nav>
    );
};
export default Navbar;
