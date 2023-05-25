import * as Yup from "yup"

export const signUpSchema = Yup.object({
    name: Yup.string().min(2).max(20).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).max(8).required("Please enter your password")
});

export const signInSchema = Yup.object({
    Email: Yup.string().email().required("Please enter your email"),
    Password: Yup.string().min(6).required("Please enter your password")
})