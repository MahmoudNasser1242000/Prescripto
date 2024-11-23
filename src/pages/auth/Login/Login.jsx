import React, { useEffect } from "react";
import { assets } from "../../../assets/assets_frontend/assets";
import { Link, useNavigate } from "react-router-dom";
import { signinSchema } from "../../../validation";
import joiResolver from "../../../utils/joiResolver";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../../Redux/reducers/auth.reducer";
import { Spinner } from "flowbite-react";

const Login = () => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(signinSchema),
  })
  const onSubmit = (data) => {
    dispatch(signin(data));
    setTimeout(() => {
      navigate("/")
    }, 500);
  };
  
  return <>
    <section className="relative flex flex-wrap h-screen items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

          <p className="mt-4 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque
            ipsa culpa autem, at itaque nostrum!
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">Email</label>

            <div className="relative">
              <div>
                <label className="block mb-2 text-start text-sm text-gray-600 dark:text-gray-200">Email address</label>
                <input {...register("email")} type="email" placeholder="johnsnow@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                <p className="text-red-600 text-start mt-2">{errors.email?.message}</p>
              </div>

            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">Password</label>

            <div className="relative">
              <div>
                <label className="block mb-2 text-start text-sm text-gray-600 dark:text-gray-200">Password</label>
                <input {...register("password")} type="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                <p className="text-red-600 text-start mt-2">{errors.password?.message}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              No account?
              <Link className="underline text-primary" to="/auth"> Sign up</Link>
            </p>

            <button className="py-3 px-6 rounded-[4px] w-fit text-sm text-white capitalize transition-colors duration-300 transform bg-primary hover:bg-primary/80 focus:outline-none focus:ring focus:ring-opacity-50">
              <span>{loading ? <Spinner color="info" aria-label="Default status example" /> : "Sign Up"} </span>
            </button>
          </div>
        </form>
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2 hidden lg:block">
        <img
          alt="login iamge"
          src={assets.login_image}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section></>;
};

export default Login;
