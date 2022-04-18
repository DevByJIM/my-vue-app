import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useForm } from "../hooks/useForm";

const Login = () => {
    const [values, handleChange, reset] = useForm({
        email: "",
        password: "",
    });

    const { user, setUser, status, loginUser } = useContext(UserContext);

    const handleSumbit = async (e) => {
        e.preventDefault();
        setUser({
            email: values.email,
            password: values.password
        });

        try {
            await loginUser(values.email, values.password);
            console.log(user.email + '. CONECTADO CON ÉXITO');
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
            <h2>{status ? `Conectado como ${values.password}` : "No Conectado"}</h2>
        </>
    );
};
export default Login;
