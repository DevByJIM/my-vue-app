import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { errFirebase } from "../utils/errFirebase";
import { formValidate } from "../utils/formValidate";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";

const Register = () => {
    const { registerUser } = useContext(UserContext);
    const { navigate } = useNavigate();
    const { required, patternEmail, minLength, validateTrim, validateEquals } =
        formValidate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setError,
    } = useForm();

    const onSubmit = async ({ email, password }) => {
        try {
            await registerUser(email, password);
            console.log("Usuario creado con éxito");
            navigate("/");
        } catch (error) {
            const { code, message } = errFirebase(error.code);
            setError(code, { message });
        }
    };

    return (
        <>
            <Title text="Formulario de registro" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type="email"
                    placeholder="Ingrese email"
                    {...register("email", {
                        required: required,
                        pattern: patternEmail,
                    })}
                    label="Ingresa tu mail"
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
                    label="Ingresa tu mail"
                    error={errors.password}
                >
                    <FormError error={errors.password} />
                </FormInput>
                <FormInput
                    type="password"
                    placeholder="Ingrese Password"
                    {...register("repassword", {
                        validate: validateEquals(getValues("password")),
                    })}
                    label="Repite contraseña"
                    error={errors.repassword}
                >
                    <FormError error={errors.repassword} />
                </FormInput>

                <Button type="submit" text="Registrar" />
            </form>

            <h4>{/* {values.email} {values.password} */}</h4>
        </>
    );
};
export default Register;
