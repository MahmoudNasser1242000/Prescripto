import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import joiResolver from "../../utils/joiResolver";
import { chanagePasswordSchema } from "../../validation";
import { changeDoctorPassword, changeUserPassword } from "../../Redux/reducers/myProfile.reducer";
import { Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Redux/reducers/auth.reducer";
import { jwtDecode } from "jwt-decode";
import { Helmet } from "react-helmet";

const ChangePassword = () => {
    const { loading, success } = useSelector((state) => state.myProfile);
    const { token } = useSelector((state) => state.auth);
    const logged = jwtDecode(token);
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(chanagePasswordSchema),
    })

    const onSubmit = (data) => {
        if (logged.role === "doctor") {
            dispatch(changeDoctorPassword({ token, body: data }))
        } else {
            dispatch(changeUserPassword({ token, body: data }))
        }
    }

    useEffect(() => {
        if (success === "Password updated successfully") {
            dispatch(logout())
            navigate("/auth/login")
        }
    }, [dispatch, navigate, success]);

    return (
        <>
            <Helmet>
                <title>Change Password</title>
            </Helmet>
            <div className="max-w-[1280px] mx-auto px-8 sm:px-12">
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-lg text-center">
                        <h1 className="text-2xl font-bold sm:text-3xl">Change Your Password!</h1>

                        <p className="mt-4 text-gray-500">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque
                            ipsa culpa autem, at itaque nostrum!
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>

                            <div className="relative">
                                <label
                                    htmlFor="password"
                                    className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                                >
                                    <input
                                        {...register("password")}
                                        type="password"
                                        id="password"
                                        placeholder="password"
                                        className="peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                    />

                                    <span
                                        className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                                    >
                                        Password
                                    </span>
                                </label>
                                <p className="text-red-600 text-start">{errors.password?.message}</p>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>

                            <div className="relative">
                                <label
                                    htmlFor="newPassword"
                                    className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                                >
                                    <input
                                        {...register("newPassword")}
                                        type="password"
                                        id="newPassword"
                                        placeholder="new password"
                                        className="peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                    />

                                    <span
                                        className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                                    >
                                        New Password
                                    </span>
                                </label>
                                <p className="text-red-600 text-start">{errors.newPassword?.message}</p>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>

                            <div className="relative">
                                <label
                                    htmlFor="repassword"
                                    className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                                >
                                    <input
                                        {...register("repassword")}
                                        type="password"
                                        id="repassword"
                                        placeholder="confirm new passowrd"
                                        className="peer h-9 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                    />

                                    <span
                                        className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                                    >
                                        Confirm New Passowrd
                                    </span>
                                </label>
                                <p className="text-red-600 text-start">{errors.repassword?.message}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                Back to your profile?
                                <a className="underline text-primary" href="#"> Here</a>
                            </p>

                            <button
                                type="submit"
                                className="inline-block rounded-[3px] bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                            >
                                <span>{loading ? <Spinner color="info" aria-label="Default status example" /> : "Change Password"} </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ChangePassword;
