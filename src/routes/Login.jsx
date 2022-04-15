import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import {useForm} from "../hooks/useForm";

const Login = () => {

    const [values, handleChange, reset] = useForm({
        name: '',
        password: ''
    });

    const { user, setUser, status, setStatus } = useContext(UserContext);

    const handleSumbit = (e) => {
        e.preventDefault();
        setUser({
            name:values.name
        })
    };


    return (
        <>
            <form onSubmit={handleSumbit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Ingresa tu nombre"
                    onChange={handleChange}                 
                />
                <button type="submit">Entrar</button>
            </form>
            <h1>Login: {user.name}</h1>
            <h2>{status ? `Conectado como ${user.name}` : "No Conectado"}</h2>
        </>
    );
};
export default Login;
