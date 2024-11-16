import React, { useEffect } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import DoctorCard from "../DoctorCard/DoctorCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors } from "../../Redux/reducers/doctors.reducer";
import toast from "react-hot-toast";
import DoctorCardSkeleton from "../DoctorCardSkeleton/DoctorCardSkeleton";

const DoctorsSection = () => {
    const { success, error, loading, doctors } = useSelector((state) => state.doctor)
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllDoctors(token));
    }, [dispatch]);
    useEffect(() => {
        if (error) {
            toast.error(error, { duration: Infinity })
        }
    }, [error]);

    return <div className="mt-28">
        <SectionTitle title={"Top Doctors To Book"} description={"Simply browse through our extensive list of trusted doctors"} />
        <div className="flex justify-evenly md:justify-center flex-wrap gap-4 mt-8">
            {
                loading ? Array.from({ length: 4 }, (_, index) => <DoctorCardSkeleton key={index} />) :
                    (!success ? <h1 className="text-3xl text-center w-full">No Doctors Wright Now!</h1> :
                        doctors?.slice(0, 4).map((doc) => <DoctorCard key={doctors._id} doctor={doc} />))
            }
        </div>

        <Link
            className="inline-flex items-center gap-2 rounded border border-primary mt-8 px-8 py-3 text-primary hover:bg-primary hover:text-white focus:outline-none focus:ring active:bg-primary"
            to="/doctors"
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

export default DoctorsSection;
