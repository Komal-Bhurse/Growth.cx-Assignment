import React from 'react'
import { useFormik } from "formik";
import axios from "axios";
import { signUpSchema } from '../formvalidation/validation';

const initialValues = {
    name: "",
    email: "",
    password: "",
  };

function SignUp() {

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
        try {
          const response = await axios.post(
            `http://localhost:5000/api/signup`,
            values
          );
          alert(response.data.massage);
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
        Sign Up
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type={"Text"}
          name="name"
          placeholder={"Name"}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full py-1 outline-none border-b-2"
        />
        {errors.name && touched.name ? (
          <p className="text-red-500 mb-1 text-sm text-left">{errors.name}</p>
        ) : null}

        <input
          required
          type={"email"}
          name="email"
          placeholder={"Email"}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full py-1 outline-none border-b-2 mt-1"
        />
        {errors.email && touched.email ? (
          <p className="text-red-500 mb-1 text-sm text-left">{errors.email}</p>
        ) : null}

        <input
          type={"password"}
          name="password"
          placeholder={"Password"}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full py-1 outline-none border-b-2 mt-1"
        />
        {errors.password && touched.password ? (
          <p className="text-red-500 mb-5 text-sm text-left">{errors.password}</p>
        ) : null}

        <button
          type={"submit"}
          className="w-full mb-5 mt-3 p-2 font-medium bg-gray-600 text-white"
        >
          Sign Up
        </button>
      </form>
    </div>
  </>
  )
}

export default SignUp