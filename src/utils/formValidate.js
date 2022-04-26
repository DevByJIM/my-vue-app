export const formValidate = () => {
    return {
        required: {
            value: true,
            message: "Campo obligatorio",
        },
        patternEmail: {
            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message: "Formato de email incorrecto",
        },
        patternURL: {
            value:  /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
            message: "Formato de URL incorrecto",
        },
        minLength(value) {
            return{
                value: value,
                message: "Mínimo " + value + " carácteres",
            }
        },
        validateTrim: {
            trim: (v) => {
                if (!v.trim()) {
                    return "No seas 🤡, escribe algo";
                }
                return true;
            },
        },
        validateEquals(value) {
            return {
                equals: (v) => v === value || "No coinciden las contraseñas😥",
            }
        
        },
    }
}