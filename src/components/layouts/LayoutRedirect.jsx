import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useFirestore } from "../../hooks/useFirestore";
import Title from "../Title";

const LayoutRedirect = () => {
    const [loading, setLoading] = useState(true);
    const { searchData } = useFirestore();
    const {nanoid} = useParams();

    useEffect(() => {
        searchData(nanoid).then((res) => {
            if (res.exists()) {
                window.location.href = res.data().origin;
            } else {
                setLoading(false);
            }
        });
    }, []);

    if (loading) return <Title text="Cargando redirección..." />;

    return <Outlet />;
};

export default LayoutRedirect;

