import React from "react";
import styles from "./Header.module.css";
import { assets } from "../../assets/assets_frontend/assets";

const Header = () => {
    return <>
        <section
            className={`relative ${styles.headerImg} rounded-[6px] bg-cover md:bg-contain bg-center bg-no-repeat mt-8 h-[500px]`}
        >
            <div
                className="absolute inset-0 rounded-[6px] bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 bg-gradient-to-r"
            ></div>

            <div
                className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
            >
                <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                    <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
                        Book Appointment
                        <strong className="block font-extrabold text-primary"> With Trusted Doctors </strong>
                    </h1>

                    <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
                        numquam ea!
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4 text-center">
                        <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-blue-800">
                            Book Now
                            <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns={assets.arrow_icon} fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                        <a href="#" class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                            Learn more
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </>;
};

export default Header;
