import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Error404 from "./routes/Error404";
import RequireAuth from "./components/RequireAuth";

const App = () => {
    return (
        <>
            <Navbar />
            <h1>App Vite</h1>
            <Routes>
                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <Home />
                        </RequireAuth>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/*" element={<Error404 />} />
            </Routes>
        </>
    );
};

export default App;
