import { UserContext } from "../context/UserProvider";
import { useContext } from "react";
import { useForm } from "../hooks/useForm";

const Register = () => {
    const initialState = {
        email: "",
        password: "",
    };
    const [values, handleChange, reset] = useForm(initialState);
    const { registerUser } = useContext(UserContext);

    const handleSumbit = async (e) => {
        e.preventDefault();

        try {
            await registerUser(values.email, values.password);
        } catch (error) {
            console.log(error.code);
        }

        // reset();
    };

    return (
        <>
            <h1>Formulario de Registro</h1>
            <form onSubmit={handleSumbit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Ingrese email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Ingrese el password"
                    onChange={handleChange}
                />
                <button type="submit">Registrar</button>
            </form>

            <h4>
                {values.email} {values.password}
            </h4>
        </>
    );
};
export default Register;
