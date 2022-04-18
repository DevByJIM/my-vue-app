import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { useForm } from "../hooks/useForm";

const Login = () => {
    const [values, handleChange, reset] = useForm({
        email: "",
        password: "",
    });

    const { user, loginUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSumbit = async (e) => {
        e.preventDefault();

        try {
            await loginUser(values.email, values.password);
            console.log('CONECTADO CON ÉXITO');
            navigate("/");
        } catch (error) {
            console.log("KO. " + error.code);

        }
        reset();
    };

    return (
        <>
            <form onSubmit={handleSumbit}>
                <input
                    type="text"
                    name="email"
                    value={values.email}
                    placeholder="Ingresa tu email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    value={values.password}
                    placeholder="Ingrese el password"
                    onChange={handleChange}
                />
                <button type="submit">Entrar</button>
            </form>
            <h1>Login: {values.email}</h1>
            <h2>{user ? `Conectado como ${values.password}` : "No Conectado"}</h2>
        </>
    );
};
export default Login;
