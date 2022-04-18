import { UserContext } from "../context/UserProvider";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { registerUser } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    register,
    handleSumbit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  // const handleSumbit = async (e) => {
  //     e.preventDefault();

  //     try {
  //         await registerUser(values.email, values.password);
  //         navigate("/");
  //     } catch (error) {
  //         console.log(error.code);
  //     }

  //     reset();
  // };

  return (
    <>
      <h1>Formulario de Registro</h1>
      <form onSubmit={handleSumbit(onSubmit)}>
        <input
          type="email"
          placeholder="Ingrese email"
          {...register("email")}
        />
        <input
          type="password"
          placeholder="Ingrese el password"
          {...register("password")}
        />
        <button type="submit">Registrar</button>
      </form>

      <h4>
        {/* {values.email} {values.password} */}
      </h4>
    </>
  );
};
export default Register;
