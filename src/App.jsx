import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Error404 from "./routes/Error404";
import RequireAuth from "./components/RequireAuth";
import Register from "./routes/Register";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";

const App = () => {

  const { user } = useContext(UserContext);

  if(user === false){
    return <h4>Loading...</h4>
  }

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
                <Route path="/register" element={<Register />} />
                <Route path="/*" element={<Error404 />} />
            </Routes>
        </>
    );
};

export default App;
