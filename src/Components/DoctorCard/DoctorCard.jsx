import React from "react";
import { Link } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
    return <>
        <article className="overflow-hidden w-full sm:w-auto rounded-lg border-2 border-gray-100 bg-white hover:translate-y-[-5px] hover:shadow-lg duration-[0.5s]">
            <img
                alt={`doctor ${doctor.name}`}
                src={doctor.profile}
                className="h-56 w-full object-contain sm:object-cover bg-blue-50"
            />

            <div className="p-4 sm:p-6">
                <p className="line-clamp-3 text-sm/relaxed text-green-600 flex items-center">
                    {/* <span className="inline-block bg-green-600 w-[6px] h-[6px] rounded-full mx-1"></span> */}
                    <span className="relative flex size-2 mx-[2px]">
                        <span
                            className={`absolute inline-flex h-full w-full animate-ping rounded-full bg-${doctor.available ? "green" : "red"}-600 opacity-75`}
                        ></span>
                        <span className={`relative inline-flex size-2 rounded-full bg-${doctor.available ? "green" : "red"}-600`}></span>
                    </span>
                    <span className="inline-block ms-1">{doctor.available ? "available" : "not available"}</span>
                </p>

                <h3 className="text-start text-lg font-medium text-gray-900">
                    <Link to={`/appointment/${doctor._id}`} onClick={() => { scrollTo(0, 0) }} className="mt-2">
                        {doctor.name}
                    </Link>
                </h3>

                <p className="text-start mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                    {doctor.speciality}
                </p>

                <Link to={`/appointment/${doctor._id}`} onClick={() => { scrollTo(0, 0) }} className="group mt-4 w-full inline-flex items-center justify-start gap-1 text-sm font-medium text-blue-600">
                    Find out more

                    <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
                        &rarr;
                    </span>
                </Link>
                <Link
                    className="group flex relative items-center overflow-hidden rounded bg-primary px-8 py-3 mt-2 w-full text-white focus:outline-none focus:ring active:bg-primary"
                    to={`/dashboard/view-profile/${doctor._id}?role=doctor`}
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

                    <span className="text-sm font-medium text-center block w-full transition-all group-hover:me-4"> Doctor Profile </span>
                </Link>
            </div>
        </article>
    </>;
};

export default DoctorCard;
