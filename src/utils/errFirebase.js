export const errFirebase = (code) => {
    switch (code) {
        case "auth/email-already-in-use":
            return {
                code: "email",
                message:"Usuario ya registrado"
            }

        case "auth/invalid-email":
            return {
                code: "email",
                message:"Formato email no válido"
            }

        case "auth/wrong-password":
            return {
                code: "email",
                message:"Contraseña incorrecta"
            }

        case "auth/user-not-found":
            return {
                code: "email",
                message:"Usuario no encontrado"
            }

        default:
            return {
                code: "email",
                message:"Ocurrió un error en el server"
            }

    }
}