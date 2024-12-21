import React from "react";
import { assets } from "../../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const NotFound = ({route}) => {
    return <div className="max-w-[1280px] mx-auto px-8 sm:px-12">
        <div className="mt-28 flex flex-col justify-center items-center">
            <Link to={`${route === "Home"? "/" : route === "Dashboard"? "/dashboard" : "/auth"}`} className="group relative inline-block focus:outline-none focus:ring">
                <span
                    className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-[#3F7AFA] transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                ></span>

                <span
                    className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75"
                >
                    Back To {route}
                </span>
            </Link>
            <img src={assets.not_found} alt="not found image" />
        </div>
    </div>;
};

export default NotFound;
