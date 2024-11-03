import React from "react";
import { assets } from "../../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const AppointmentSection = () => {
    return <>
        <section>
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 py-8 lg:py-0 lg:px-8 rounded-md mt-32 bg-sky-700/90">
                <div className="grid grid-cols-1 h-full gap-8 lg:grid-cols-2 lg:gap-16">
                    <div className="relative hidden lg:block h-full rounded-lg lg:order-last">
                        <img
                            alt="appointment image"
                            src={assets.appointment_img}
                            className="absolute right-[100px] bottom-0 h-[480px] object-contain"
                        />
                    </div>

                    <div className="lg:py-24">
                        <h2 className="text-3xl font-bold sm:text-4xl text-white">Book Appointments <span className="block mt-4">With <span class="bg-blue-400 text-white rounded-full me-2 text-[25px] px-2.5 py-0.5 rounded inline-flex items-center w-fit">100+</span>Trusted Doctors</span></h2>

                        <Link
                            className="group relative mt-8 inline-flex items-center overflow-hidden rounded bg-white px-8 py-3 text-black focus:outline-none focus:ring"
                            to="/login"
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

                            <span className="text-sm font-medium transition-all group-hover:me-4"> Create Account </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    </>;
};

export default AppointmentSection;
