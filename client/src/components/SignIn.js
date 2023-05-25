import React ,{useContext} from 'react'
import { useFormik } from "formik";
import axios from "axios";
import { signInSchema } from '../formvalidation/validation';
import { web } from '../context_api/WebScrap';

const initialValues = {
    Email: "",
    Password: "",
  };

function SignIn() {
    const {setUser} = useContext(web)

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signInSchema,
      onSubmit: async (values, action) => {
        try {
          const response = await axios.post(
            `http://localhost:5000/api/signin`,
            values,{ withCredentials: true }
          );
          if(response.data.massage){
            alert(response.data.massage);
          }
          if(response.data.user){
            localStorage.setItem("user",JSON.stringify(response.data?.user))
            setUser(response.data?.user)
          }
        } catch (error) {
          alert(error);
        }
        action.resetForm();
      },
    });

  return (
    <>
    <div className="border container m-auto p-5 w-96 text-center mt-28">
      <h1 className=" mb-2 font-semibold">
        Sign In
      </h1>
      <form onSubmit={handleSubmit}>

        <input
          required
          type={"email"}
          name="Email"
          placeholder={"Email"}
          value={values.Email}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full py-1 outline-none border-b-2 mt-1"
        />
        {errors.Email && touched.Email ? (
          <p className="text-red-500 mb-1 text-sm text-left">{errors.Email}</p>
        ) : null}

        <input
          type={"password"}
          name="Password"
          placeholder={"Password"}
          value={values.Password}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full py-1 outline-none border-b-2 mt-1"
        />
        {errors.Password && touched.Password ? (
          <p className="text-red-500 mb-5 text-sm text-left">{errors.Password}</p>
        ) : null}

        <button
          type={"submit"}
          className="w-full mb-5 mt-3 p-2 font-medium bg-gray-600 text-white"
        >
          Sign In
        </button>
      </form>
    </div>
  </>
  )
}

export default SignIn