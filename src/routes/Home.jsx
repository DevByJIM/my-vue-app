import { useState, useEffect } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { formValidate } from "../utils/formValidate";
import { set, useForm } from "react-hook-form";
import Button from "../components/Button";
import Title from "../components/Title";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";
import { errFirebase } from "../utils/errFirebase";

const Home = () => {
    const { required, patternURL } = formValidate();
    const { data, error, loading, getData, addData, delData, updateData } =
        useFirestore();
    const {
        register,
        handleSubmit,
        resetField,
        setValue,
        formState: { errors },
        setError,
    } = useForm();

    const [newURL, setNewURL] = useState();
    const [copy, setCopy] = useState({});

    useEffect(() => {
        getData();
        console.log("--->Datos");
    }, []);

    if (loading.getData) return <p>Loading datas.....</p>;
    if (error) return <p>{error}</p>;

    const onSubmit = async ({ url }) => {
        try {
            if (url !== "") {
                if (newURL) {
                    await updateData(newURL, url);
                    setNewURL("");
                } else {
                    await addData(url);
                }
                resetField("url");
            }
        } catch (error) {
            const { code, message } = errFirebase(error.code);
            setError(code, { message });
        }
    };

    const pathURL = window.location.href;

    const handleClickDelete = async (nanoid) => {
        await delData(nanoid);
    };

    const handleClickEdit = async (item) => {
        setValue("url", item.origin);
        setNewURL(item.nanoid);
    };

    const handleClickCopy = async (nanoid) => {
        navigator.clipboard.writeText(pathURL + nanoid);
        setCopy({ [nanoid]: true });
        console.log("copiado");
    };

    return (
        <>
            <Title text="HOME" />

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type="text"
                    placeholder="http:"
                    {...register("url", {
                        required: required,
                        pattern: patternURL,
                    })}
                    label="Ingresa tu URL"
                    error={errors.url}
                >
                    <FormError error={errors.url} />
                </FormInput>

                {newURL ? (
                    <Button
                        type="submit"
                        text="EDIT URL"
                        color="yellow"
                        loading={loading.addData}
                    />
                ) : (
                    <Button
                        type="submit"
                        text="ADD URL"
                        loading={loading.addData}
                    />
                )}
            </form>

            {data.map((item) => (
                <div
                    key={item.nanoid}
                    className="p-6  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 my-2"
                >
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {pathURL + item.nanoid}
                        </h5>
                    </a>
                    <h5 className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {item.origin}
                    </h5>
                    <div className="flex mt-3 justify-end">
                        <Button
                            type="button"
                            text="Delete"
                            color="red"
                            loading={loading[item.nanoid]}
                            onClick={() => handleClickDelete(item.nanoid)}
                        />
                        <Button
                            type="button"
                            text="Edit"
                            color="green"
                            onClick={() => handleClickEdit(item)}
                        />
                        <Button
                            type="button"
                            text={copy[item.nanoid] ? "Copied" : "Copy"}
                            color="blue"
                            onClick={() => handleClickCopy(item.nanoid)}
                        />
                    </div>
                </div>
            ))}
        </>
    );
};
export default Home;
