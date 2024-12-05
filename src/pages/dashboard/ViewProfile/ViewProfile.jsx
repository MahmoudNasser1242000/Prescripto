import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { HiClock } from "react-icons/hi";
import { Badge } from "flowbite-react";
import { TbCalendarTime } from "react-icons/tb";
import { getOneDoctor } from "../../../Redux/reducers/doctors.reducer";
import { getOneUser } from "../../../Redux/reducers/users.reducer";
import { assets } from "../../../assets/assets_frontend/assets";
import AdminDeleteAccountModal from "../../../Components/AdminDeleteAccountModal/AdminDeleteAccountModal";
import AdminUpdateAccount from "../../../Components/AdminUpdateAccount/AdminUpdateAccount";

const ViewProfile = () => {
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState(false);

    const [searchParams] = useSearchParams()
    const role = searchParams.get("role")
    const { id } = useParams()

    const { token } = useSelector((state) => state.auth);

    const { doctor, loading: doctorLoading } = useSelector((state) => state.doctor);
    const { user, loading: userLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (role === "doctor") {
            dispatch(getOneDoctor({ token, docId: id }));
        } else {
            dispatch(getOneUser({ token, userId: id }));
        }
    }, [dispatch, token]);

    if (doctorLoading || userLoading) return "loading .....";
    return (
        <>
            <div className="pt-14 max-w-[1280px] mx-auto px-8 sm:px-12">
                <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-[45%] text-center mb-8 lg:mb-0 border border-y-0 border-gray-300 py-6">
                        <div className="relative">
                            {
                                user?.profile && role !== "doctor" && (
                                    <button className="absolute top-[80%] left-[55%] lg:left-[60%]" onClick={() => setOpenUpdateProfilePicModal(true)}>
                                        <img className="size-[36px] hover:scale-[1.2] duration-300 cursor-pointer" src={assets.edit_profile_pic} alt={"edit profile picture"} />
                                    </button>
                                )
                            }
                            <img
                                src={
                                    role === "doctor" ? doctor?.profile :
                                        (user?.profile ? user?.profile : assets.default_profile_pic)
                                }
                                alt="profile picture"
                                className="rounded-full object-cover w-48 h-48 mx-auto mb-4 p-1 outline outline-2 outline-[#0C3860] dark:outline-blue-900 transition-transform duration-300"
                            />
                        </div>
                        <p className={`line-clamp-3 px-[6px] w-fit mx-auto text-md/relaxed text-${doctor?.active || user?.active ? "green" : "red"}-600 flex items-center`}>
                            {/* <span className="inline-block bg-green-600 w-[6px] h-[6px] rounded-full mx-1"></span> */}
                            <span className="relative flex size-2 justify-center">
                                <span
                                    className={`absolute inline-flex h-full w-full animate-ping rounded-full bg-${doctor?.active || user?.active ? "green" : "red"}-600 opacity-75`}
                                ></span>
                                <span className={`relative inline-flex size-2 rounded-full bg-${doctor?.active || user?.active ? "green" : "red"}-600`}></span>
                            </span>
                            <span className="inline-block ms-1 mb-1">{doctor?.active || user?.active ? "available" : "not available"}</span>
                        </p>
                        <h1 className="text-2xl font-bold text-primary dark:text-white mb-2">
                            {doctor?.name || user?.name}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            {doctor?.speciality || user?.job}
                        </p>
                        <div className="flex flex-col justify-center items-center text-center">
                            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                                <button
                                    onClick={() => setOpenUpdateModal(true)}
                                    type="button"
                                    className="group relative mt-4 inline-block text-sm font-medium text-indigo-600 focus:outline-none active:indigo-red-500"
                                >
                                    <span
                                        className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-indigo-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                                    ></span>

                                    <span className="relative block border border-current bg-white px-8 py-3"> Edit Profile </span>
                                </button>

                                <button
                                    onClick={() => setOpenDeleteAccountModal(true)}
                                    type="button"
                                    className="group relative mt-4 inline-block text-sm font-medium text-red-600 focus:outline-none active:text-red-500"
                                >
                                    <span
                                        className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-red-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                                    ></span>

                                    <span className="relative block border border-current bg-white px-8 py-3"> Delete Acoount </span>
                                </button>
                            </div>

                        </div>
                    </div>

                    <div className="lg:w-2/3 lg:pl-8 text-center lg:text-start">
                        <h2 className="text-xl font-semibold text-primary dark:text-white mb-4">
                            {role === "doctor" ? "About" : "Bio"}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            {
                                role === "doctor"
                                    ? doctor?.about || "____"
                                    : user?.bio || "____"
                            }
                        </p>
                        <h2 className="text-xl font-semibold text-primary dark:text-white mb-4">
                            Presonal Informations
                        </h2>
                        <div className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start">
                            <span className="bg-indigo-100 text-primary px-3 py-1 rounded-full text-sm">
                                {doctor?.age || user?.age} years old
                            </span>
                            <span className="bg-indigo-100 text-primary px-3 py-1 rounded-full text-sm">
                                {new Date(doctor?.birth_date || user?.birth_date).toLocaleDateString("en-GB")}
                            </span>
                            <span className="bg-indigo-100 text-primary px-3 py-1 rounded-full text-sm">
                                {doctor?.gender || user?.gender}
                            </span>
                            {
                                role === "doctor" && (
                                    <>
                                        <span className="bg-indigo-100 text-primary px-3 py-1 rounded-full text-sm">
                                            {doctor?.fees} fees
                                        </span>
                                        <span className="bg-indigo-100 text-primary px-3 py-1 rounded-full text-sm">
                                            {doctor?.degree}
                                        </span>
                                        <span className="bg-indigo-100 text-primary px-3 py-1 rounded-full text-sm">
                                            {doctor?.experience} years experience
                                        </span>
                                    </>
                                )
                            }
                        </div>
                        <h2 className="text-xl font-semibold text-primary dark:text-white mb-4">
                            Contact Information
                        </h2>
                        <ul className="lg:space-y-3 text-gray-700 dark:text-gray-300 inline-flex flex-wrap gap-y-3 items-center justify-center lg:block space-x-5 lg:space-x-0">
                            <li className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2 text-primary dark:text-blue-900"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                {doctor?.email || user?.email}
                            </li>
                            <li className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2 text-primary dark:text-blue-900"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                +20 {doctor?.phone || user?.phone}
                            </li>

                            <li className="flex items-center">
                                {
                                    role === "doctor" && (
                                        <>
                                            <TbCalendarTime className="h-5 w-5 mr-2 text-primary dark:text-blue-900" />
                                            {
                                                doctor?.examination_dates.map((date) => (
                                                    <Badge key={date._id} icon={HiClock} className="mx-2">{date.time} {date.modifier}</Badge>
                                                ))
                                            }
                                        </>
                                    )
                                }
                            </li>
                        </ul>
                        <div className="flex justify-center lg:justify-start mt-7">
                            <Link
                                className="group flex relative w-fit items-center overflow-hidden rounded bg-primary px-8 py-3 text-white focus:outline-none focus:ring active:bg-primary"
                                to={"/my-appointments"}
                            >
                                <span className="absolute -end-full transition-all group-hover:end-4">
                                    <svg
                                        className="size-5 rtl:rotate-180"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </span>

                                <span className="text-sm font-medium transition-all group-hover:me-4"> {role === "doctor" ? "doctor" : role === "user" ? "user" : ""} Appointments </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <AdminDeleteAccountModal openModal={openDeleteAccountModal} onCloseModal={() => setOpenDeleteAccountModal(false)} token={token} role={role} id={id} />
            <AdminUpdateAccount openModal={openUpdateModal} onCloseModal={() => setOpenUpdateModal(false)} token={token} role={role} id={id} active={doctor?.active || user?.active} activeExpire={doctor?.activeExpire || user?.activeExpire} />
        </>
    );
};

export default ViewProfile;
