import React from "react";
import { assets } from "../../assets/assets_frontend/assets";
import { Modal } from "flowbite-react";
import joiResolver from "../../utils/joiResolver";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfileSchema } from "../../validation";
import { updateUserProfile } from "../../Redux/reducers/myProfile.reducer";

const UpdateProfileModal = ({ openModal, onCloseModal, myProfileData, token }) => {
    const { loading } = useSelector((state) => state.myProfile);
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(updateUserProfileSchema),
    })

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("email", data.email)
        if (data.profile[0]) {
            formData.append("image", data.profile[0]);
        }
        formData.append("job", data.job)
        formData.append("birth_date", data.birth_date)
        formData.append("phone", data.phone)
        formData.append("gender", data.gender)

        //send data to database
        dispatch(updateUserProfile({ token, body: formData }))
        onCloseModal()
    }
    return <>
        <Modal show={openModal} size="lg" onClose={onCloseModal}>
            <Modal.Header>Update User Profile</Modal.Header>
            <Modal.Body>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    {/* name */}
                    <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input {...register("name")} defaultValue={myProfileData?.name} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="user name" />
                        <p className="text-red-600">{errors.name?.message}</p>
                    </div>
                    {/* email */}
                    <div className="col-span-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input {...register("email")} defaultValue={myProfileData?.email} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="user email" />
                        <p className="text-red-600">{errors.email?.message}</p>
                    </div>
                    {/* phone */}
                    <div className="col-span-2">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                        <input type="tel" defaultValue={myProfileData?.phone} {...register("phone")} id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="user phone number" />
                        <p className="text-red-600">{errors.phone?.message}</p>
                    </div>
                    {/* birth Date */}
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="birth-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birth Date</label>
                        <input {...register("birth_date")} defaultValue={myProfileData?.birth_date.split("T")[0].toString()} type="date" id="birth-date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="user age" />
                        <p className="text-red-600">{errors.birth_date?.message}</p>
                    </div>
                    {/* job */}
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="job" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birth Date</label>
                        <input {...register("job")} defaultValue={myProfileData?.job} type="text" id="job" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="user age" />
                        <p className="text-red-600">{errors.job?.message}</p>
                    </div>
                    {/* profile image */}
                    <div className="col-span-2">
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
                    {/* gender */}
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                        <select {...register("gender")} defaultValue={myProfileData?.gender} id="gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <p className="text-red-600">{errors.gender?.message}</p>
                    </div>
                    {/* bio */}
                    <div className="col-span-2">
                        <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bio</label>
                        <textarea defaultValue={myProfileData?.bio} {...register("bio")} id="bio" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="somehting about use..." />
                        <p className="text-red-600">{errors.bio?.message}</p>
                    </div>
                    <Modal.Footer>
                        <button type="submit" className="text-white inline-flex items-center bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-sm text-sm px-8 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-indigo-800">
                            <span>{loading ? <Spinner color="info" aria-label="Default status example" /> : "Update Profile"} </span>
                        </button>
                    </Modal.Footer>
                </form>
            </Modal.Body>

        </Modal>
    </>;
};

export default UpdateProfileModal;
