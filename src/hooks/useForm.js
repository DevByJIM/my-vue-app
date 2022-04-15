import { useState } from 'react'

export const useForm = (initialState = {}) => {
  
    const [values, setValues] = useState(initialState);
  
    const handleChange = (e) => {
        const objeto = e.target;
        setValues({
            ...values,
            [objeto.name]:
                objeto.type === "checkbox" ? objeto.checked : objeto.value,
        });
    };

    const reset = () =>{
        setValues(initialState);
    }
  
    return [values, handleChange, reset];
}

