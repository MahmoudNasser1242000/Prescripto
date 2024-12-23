import React, { useEffect } from "react";
import { assets, times } from "../../../assets/assets_frontend/assets";
import { Controller, useForm } from "react-hook-form";
import joiResolver from "../../../utils/joiResolver";
import { addDoctorSchema } from "../../../validation";
import { json, useNavigate } from "react-router-dom";
import { Autocomplete, TextField } from "@mui/material";
import { addDoctor } from "../../../Redux/reducers/doctors.reducer";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "flowbite-react";
import { Helmet } from "react-helmet";

const AddDoctors = () => {
    const { loading, success } = useSelector((state) => state.doctor)
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(addDoctorSchema),
    })

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("email", data.email)
        formData.append("password", data.password)
        formData.append("repassword", data.repassword)
        formData.append("about", data.about)
        formData.append("image", data.profile[0]);
        formData.append("speciality", data.speciality)
        formData.append("fees", data.fees)
        formData.append("degree", data.degree)
        formData.append("experience", data.experience)
        formData.append("birth_date", data.birth_date)
        formData.append("phone", data.phone)
        formData.append("gender", data.gender)
        data.examination_dates.forEach((date) => formData.append("examination_dates[]", JSON.stringify(date)))

        //send data to database
        dispatch(addDoctor({ token, doctor: formData }));
    }

    useEffect(() => {
        if (success === "Doctor created successfully") {
            navigate("/dashboard")
        }
    }, [success, navigate]);

    return <>
        <Helmet>
            <title>Add Doctors</title>
        </Helmet>
        <section className="bg-white dark:bg-gray-900">
            <div className="flex justify-center h-full overflow-auto">
                <div className="hidden bg-contain bg-center bg-no-repeat lg:block lg:w-2/5" style={{ backgroundImage: `url(${assets.add_doctor})` }}>
                </div>
                <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                    <div className="w-full">
                        <h1 className="text-2xl font-bold tracking-wider text-gray-800 capitalize dark:text-white">
                            Add your free account now.
                        </h1>
                        <p className="mt-4 text-gray-500 dark:text-gray-400 w-[60%] mx-auto">
                            Let’s get you all set up so you can verify your personal account and begin setting up your profile.
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 text-start">
                            {/* profile image */}
                            <div className="col-span-2 text-center my-2">
                                <button
                                    type="button"
                                    className="group relative inline-flex items-center overflow-hidden rounded bg-primary px-8 py-3 text-white focus:outline-none focus:ring"
                                >
                                    <span className="absolute -end-full transition-all group-hover:end-4">
                                        <img src={assets.camera} className="size-[23px] rtl:rotate-180" alt="camera icon" />
                                    </span>

                                    <label htmlFor="profile" className="text-sm font-medium transition-all group-hover:me-4 cursor-pointer"> Profile Image </label>
                                    <input {...register("profile")} id="profile" type="file" className="hidden w-full h-full" />
                                </button>
                                <p className="text-red-600">{errors.profile?.message}</p>
                            </div>
                            {/* name */}
                            <div className="col-span-2 md:col-span-1">
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Name</label>
                                <input {...register("name")} type="text" placeholder="John" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                <p className="text-red-600">{errors.name?.message}</p>
                            </div>
                            {/* email */}
                            <div className="col-span-2 md:col-span-1">
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                                <input {...register("email")} type="email" placeholder="johnsnow@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                <p className="text-red-600">{errors.email?.message}</p>
                            </div>
                            {/* password */}
                            <div className="col-span-2 md:col-span-1">
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label>
                                <input {...register("password")} type="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                <p className="text-red-600">{errors.password?.message}</p>
                            </div>
                            {/* confirm password */}
                            <div className="col-span-2 md:col-span-1">
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Confirm password</label>
                                <input {...register("repassword")} type="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                <p className="text-red-600">{errors.repassword?.message}</p>
                            </div>
                            {/* phone number */}
                            <div className="col-span-2 md:col-span-1">
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Phone number</label>
                                <input {...register("phone")} type="text" placeholder="XXX-XX-XXXX-XXX" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                <p className="text-red-600">{errors.phone?.message}</p>
                            </div>
                            {/* birth_date */}
                            <div className="col-span-2 md:col-span-1">
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Birth Date</label>
                                <input {...register("birth_date")} type="date" placeholder="Enter your birth date" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                <p className="text-red-600">{errors.birth_date?.message}</p>
                            </div>
                            {/* fess */}
                            <div className="col-span-2 md:col-span-1">
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Fees</label>
                                <input {...register("fees")} type="text" placeholder="Enter your fees" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                <p className="text-red-600">{errors.fees?.message}</p>
                            </div>
                            {/* degree */}
                            <div className="col-span-2 md:col-span-1">
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Degree</label>
                                <input {...register("degree")} type="text" placeholder="Enter your degree" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                <p className="text-red-600">{errors.degree?.message}</p>
                            </div>
                            {/* speciality */}
                            <div className="col-span-2 md:col-span-1">
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Speciality</label>
                                <input {...register("speciality")} type="text" placeholder="Enter your speciality" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                <p className="text-red-600">{errors.speciality?.message}</p>
                            </div>
                            {/* aboute */}
                            <div className="col-span-2 md:col-span-1">
                                <label htmlFor="OrderNotes" className="block text-sm font-medium text-gray-700"> About </label>
                                <textarea
                                    {...register("about")}
                                    id="OrderNotes"
                                    className="mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm"
                                    rows="4"
                                    placeholder="Enter any additional order notes..."
                                ></textarea>
                                <p className="text-red-600">{errors.about?.message}</p>
                            </div>
                            {/* experience */}
                            <div className="col-span-2">
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Experience</label>
                                <input {...register("experience")} type="number" placeholder="Enter your experience" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                <p className="text-red-600">{errors.experience?.message}</p>
                            </div>
                            {/* examination_dates */}
                            <div className="col-span-2">
                                <Controller
                                    name="examination_dates"
                                    control={control}
                                    render={({ field }) => (
                                        <Autocomplete
                                            multiple
                                            id="tags-outlined"
                                            options={times}
                                            getOptionLabel={(option) => `${option.time} ${option.modifier}`}
                                            // isOptionEqualToValue={(option, value) => option.time === value.time}
                                            filterSelectedOptions
                                            {...field}
                                            onChange={(e, value) => field.onChange(value)} // Syncs value with React Hook Form
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Choose doctor examination dates"
                                                />
                                            )}
                                        />
                                    )}
                                />
                                <p className="text-red-600 text-start mt-2">{errors.examination_dates?.message}</p>
                            </div>
                            {/* gender */}
                            <div className="col-span-2">
                                <fieldset {...register("gender")} className="gap-4 flex justify-center">
                                    <div className="w-[50%]">
                                        <label
                                            htmlFor="DeliveryStandard"
                                            className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-300 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                                        >
                                            <div>
                                                <p className="text-gray-700">Gender</p>

                                                <p className="mt-1 text-gray-900">Male</p>
                                            </div>

                                            <input
                                                type="radio"
                                                name="DeliveryOption"
                                                value="male"
                                                id="DeliveryStandard"
                                                className="size-5 border-gray-300 text-blue-500"
                                                defaultChecked
                                            />
                                        </label>
                                    </div>

                                    <div className="w-[50%]">
                                        <label
                                            htmlFor="DeliveryPriority"
                                            className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-300 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                                        >
                                            <div>
                                                <p className="text-gray-700">Gender</p>
                                                <p className="mt-1 text-gray-900">Female</p>
                                            </div>

                                            <input
                                                type="radio"
                                                name="DeliveryOption"
                                                value="female"
                                                id="DeliveryPriority"
                                                className="size-5 border-gray-300 text-blue-500"
                                            />
                                        </label>
                                    </div>
                                </fieldset>
                            </div>

                            <button type="submit" className="py-3 px-6 rounded-[4px] w-fit text-sm text-white capitalize transition-colors duration-300 transform bg-primary hover:bg-primary/80 focus:outline-none focus:ring focus:ring-opacity-50">
                                <span>{loading ? <Spinner color="info" aria-label="Default status example" /> : "Add Doctor"} </span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>;
};

export default AddDoctors;
