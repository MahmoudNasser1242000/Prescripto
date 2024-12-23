import React, { useEffect } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import DoctorCard from "../DoctorCard/DoctorCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors } from "../../Redux/reducers/doctors.reducer";
import DoctorCardSkeleton from "../DoctorCardSkeleton/DoctorCardSkeleton";

const RelatedDoctorsSection = ({ doctor, doctorLoading }) => {
    const { loading, doctors } = useSelector(
        (state) => state.doctor
    );
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllDoctors({ token, keyword: "", page: "" }));
    }, [dispatch, token]);
    return (
        <div className="mt-28">
            <SectionTitle
                title={"Top Doctors To Book"}
                description={
                    "Simply Browse Through Our Extensive List Of Trusted doctors"
                }
            />
            <div className="flex flex-wrap justify-center gap-x-[10px] gap-y-4 md:col-span-3 mt-12 ">
                {loading || doctorLoading ? (
                    Array.from({ length: 3 }, (_, index) => (
                        <DoctorCardSkeleton key={index} />
                    ))
                ) : (!doctors?.length || !(doctors?.filter((doc) => (doctor?.speciality === doc.speciality) && (doc._id !== doctor?._id)))?.length) ? (
                    <h1 className="text-3xl text-center w-full text-gray-400">
                        No Doctors Wright Now!
                    </h1>
                ) : (
                    doctors
                        ?.filter((doc) => (doctor?.speciality === doc.speciality) && (doc._id !== doctor?._id))
                        .slice(0, 3)
                        .map((doc) => (
                            <div className="mx-1 w-full sm:w-auto" key={doc._id}>
                                <DoctorCard doctor={doc} />
                            </div>
                        ))
                )}
            </div>
            <Link
                className="inline-flex items-center gap-2 rounded border border-primary mt-8 px-8 py-3 text-primary hover:bg-primary hover:text-white focus:outline-none focus:ring active:bg-primary"
                to={`/doctors/${doctor?.speciality}`}
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
        </div>
    );
};

export default RelatedDoctorsSection;
