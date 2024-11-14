import React from "react";
import { assets } from "../../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const AppointmnetCard = () => {
    return <div className="flex justify-center sm:justify-between items-center flex-wrap gap-y-7 md:gap-y-0 py-4 mb-4 border-t-[1px] border-y-gray-300">
        <div className="flex justify-between items-center flex-wrap gap-5 sm:gap-y-0 ">
            <img src={assets.doc8} className="h-full size-56 border mx-auto sm:mx-0" alt="" />
            <div className="text-center sm:text-start mx-auto sm:mx-0">
                <h3 className="text-[19px] font-semibold">Dr.Mahmoud Nasser</h3>
                <span className="text-gray-500 font-semibold">MBBS - Gynecologist</span>

                <h4 className="mt-4">Address:</h4>
                <p className="text-gray-500 flex flex-col gap-y-[2px] font-light">
                    <span>MBBS - Gynecologist</span>
                    <span>MBBS - Gynecologist</span>
                </p>

                <h4 className="mt-4">Date & Time: <span className="font-light text-sm">MBBS - Gynecologist</span></h4>
            </div>
        </div>

        <div className="flex flex-col gap-y-4">
            <Link to={""} className="inline-block rounded border border-primary bg-primary px-12 py-3 text-sm font-medium text-white hover:bg-lime-600 hover:text-white hover:border-lime-600 focus:outline-none focus:ring active:text-indigo-500">
                Pay Online
            </Link>
            {/* Border */}
            <button className="inline-block rounded border border-primary px-12 py-3 text-sm font-medium text-primary hover:bg-red-600 hover:text-white focus:outline-none focus:ring hover:border-red-600" >
                Delete
            </button>
        </div>
    </div>;
};

export default AppointmnetCard;
