import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { errFirebase } from "../utils/errFirebase";
import { formValidate } from "../utils/formValidate";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";

const Login = () => {
    const { loginUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { required, patternEmail, minLength, validateTrim } = formValidate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const onSubmit = async ({ email, password }) => {
        try {
            setLoading(true);
            await loginUser(email, password);
            console.log("Usuario logeado con éxito");
            navigate("/");
        } catch (error) {
            const { code, message } = errFirebase(error.code);
            setError(code, { message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Title text="Login en la App" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type="email"
                    placeholder="Ingrese email"
                    {...register("email", {
                        required: required,
                        pattern: patternEmail,
                    })}
                    label="Ingresa tu correo"
                    error={errors.email}
                >
                    <FormError error={errors.email} />
                </FormInput>
                <FormInput
                    type="password"
                    placeholder="Ingrese el password"
                    {...register("password", {
                        minLength: minLength(6),
                        validate: validateTrim,
                    })}
                    label="Ingresa tu contraseña"
                    error={errors.password}
                >
                    <FormError error={errors.password} />
                </FormInput>

                <Button type="submit" text="Entrar" loading={loading} />
            </form>
        </>
    );
};
export default Login;
