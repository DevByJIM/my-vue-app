import { UserContext } from "./context/UserProvider";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";

import Error404 from "./routes/Error404";
import Navbar from "./components/Navbar";
import Register from "./routes/Register";
import Perfil from "./routes/Perfil";
import Login from "./routes/Login";
import Home from "./routes/Home";

import LayoutRequireAuth from "./components/layouts/LayoutRequireAuth";
import LayoutContainerForm from "./components/layouts/LayoutContainerForm";
import LayoutRedirect from "./components/layouts/LayoutRedirect";

const App = () => {
    const { user } = useContext(UserContext);

    if (user === false) {
        return <h4>Loading...</h4>;
    }

    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<LayoutRequireAuth />}>
                    <Route index element={<Home />} />
                    <Route path="perfil" element={<Perfil />} />
                </Route>

                <Route path="/" element={<LayoutContainerForm />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route path="/:nanoid" element={<LayoutRedirect />}>
                    <Route index element={<Error404 />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
