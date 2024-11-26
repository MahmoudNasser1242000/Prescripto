import React from "react";
import { assets } from "../../assets/assets_frontend/assets";

const DoctorInfo = ({doctor}) => {
    return <>
        <section className="mt-16 mx-auto">
            <div className="mx-auto  px-4 ">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
                    <div className="relative h-64 md:h-full rounded-md w-full col-span-1 shadow-sm">
                        <img
                            alt={`${doctor?.name} profile`}
                            src={doctor?.profile}
                            className="absolute inset-0 h-full w-full rounded-lg shadow-sm object-contain md:object-cover bg-primary/40"
                        />
                    </div>

                    <div className="py-10 lg:py-12 rounded-md md:col-span-2 border border-1 text-start px-6 shadow-sm">
                        <h2 className="font-bold text-3xl inline-flex items-center">
                            <span>{doctor?.name}</span>
                            <img src={assets.verified_icon} className="mx-3" alt="verified icon" />
                        </h2>

                        <p className="text-gray-500 flex items-center mt-2">
                            <span>{doctor?.degree} - {doctor?.speciality}</span>
                            <span
                                className="inline-flex items-center justify-center mx-2 rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="-ms-1 me-1.5 size-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                {doctor?.experience} years experience
                            </span>
                        </p>

                        <div className="mt-4">
                            <p className="text-xl inline-flex items-center">
                                <img src={assets.info_icon} className="me-2" alt="info icon" />
                                <span>About</span>
                            </p>
                            <p className="mt-2 text-gray-600">
                                {doctor?.about}
                            </p>
                        </div>

                        <p
                            className="font-semibold mt-4"
                        >
                            <span className="text-gray-500">Appointment free: </span>
                            <span className="text-xl">${doctor?.fees}</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </>;
};

export default DoctorInfo;
