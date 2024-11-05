import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import { doctors } from "../../assets/assets_frontend/assets";
import DoctorCard from "../DoctorCard/DoctorCard";
import { Link } from "react-router-dom";

const RelatedDoctorsSection = ({ docId }) => {
    const doctor = doctors.find((doc) => doc._id === docId)
    return <div className="mt-28">
        <SectionTitle title={"Top Doctors To Book"} description={"Simply Browse Through Our Extensive List Of Trusted doctors"}/>
        <div className="flex flex-wrap justify-center gap-x-[10px] gap-y-4 md:col-span-3 mt-12 ">
            {doctors?.filter((doc) => doctor.speciality === doc.speciality).slice(0, 3).map((doc) => <div className="mx-1 w-full sm:w-auto"><DoctorCard key={doc._id} doctor={doc} /></div>)}
        </div>
        <Link
            className="inline-flex items-center gap-2 rounded border border-primary mt-8 px-8 py-3 text-primary hover:bg-primary hover:text-white focus:outline-none focus:ring active:bg-primary"
            to={`/doctors/${doctor.speciality}`}
            onClick={() => scrollTo(0, 0)}
        >
            <span className="text-sm font-medium"> More </span>

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
        </Link>
    </div>;
};

export default RelatedDoctorsSection;
