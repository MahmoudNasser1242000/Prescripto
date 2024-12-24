import React from "react";
import { Link } from "react-router-dom";

const SpecialityMenu = ({speciality, doctors, length}) => {
    return <>
        <ul className="space-y-1">
            <li>
                <Link
                    to="/doctors"
                    className={`${!speciality && "bg-gray-100 text-gray-700"} group flex items-center justify-between rounded-lg px-4 py-2 hover:bg-gray-100 hover:text-gray-700`}
                >
                    <span className="text-sm font-medium"> All Doctors </span>

                    <span
                        className="shrink-0 rounded-full bg-gray-100 px-3 py-0.5 text-xs text-gray-700 group-hover:bg-gray-200 group-hover:text-gray-700"
                    >
                        {length}
                    </span>
                </Link>
            </li>

            <li>
                <Link
                    to="/doctors/General physician"
                    className={`${speciality === "General physician" && "bg-gray-100 text-gray-700"} group flex items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700`}
                >
                    <span className="text-sm font-medium"> General physician </span>

                    <span
                        className="shrink-0 rounded-full bg-gray-100 px-3 py-0.5 text-xs text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-700"
                    >
                        {doctors.filter((doc) => doc.speciality === "General physician").length}
                    </span>
                </Link>
            </li>

            <li>
                <Link
                    to="/doctors/Gynecologist"
                    className={`${speciality === "Gynecologist" && "bg-gray-100 text-gray-700"} group flex items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700`}
                >
                    <span className="text-sm font-medium"> Gynecologist </span>

                    <span
                        className="shrink-0 rounded-full bg-gray-100 px-3 py-0.5 text-xs text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-700"
                    >
                        {doctors.filter((doc) => doc.speciality === "Gynecologist").length}
                    </span>
                </Link>
            </li>

            <li>
                <Link
                    to="/doctors/Dermatologist"
                    className={`${speciality === "Dermatologist" && "bg-gray-100 text-gray-700"} group flex items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700`}
                >
                    <span className="text-sm font-medium"> Dermatologist </span>

                    <span
                        className="shrink-0 rounded-full bg-gray-100 px-3 py-0.5 text-xs text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-700"
                    >
                        {doctors.filter((doc) => doc.speciality === "Dermatologist").length}
                    </span>
                </Link>
            </li>

            <li>
                <Link
                    to="/doctors/Pediatricians"
                    className={`${speciality === "Pediatricians" && "bg-gray-100 text-gray-700"} group flex items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700`}
                >
                    <span className="text-sm font-medium"> Pediatricians </span>

                    <span
                        className="shrink-0 rounded-full bg-gray-100 px-3 py-0.5 text-xs text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-700"
                    >
                        {doctors.filter((doc) => doc.speciality === "Pediatricians").length}
                    </span>
                </Link>
            </li>

            <li>
                <Link
                    to="/doctors/Neurologist"
                    className={`${speciality === "Neurologist" && "bg-gray-100 text-gray-700"} group flex items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700`}
                >
                    <span className="text-sm font-medium"> Neurologist </span>

                    <span
                        className="shrink-0 rounded-full bg-gray-100 px-3 py-0.5 text-xs text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-700"
                    >
                        {doctors.filter((doc) => doc.speciality === "Neurologist").length}
                    </span>
                </Link>
            </li>

            <li>
                <Link
                    to="/doctors/Gastroenterologist"
                    className={`${speciality === "Gastroenterologist" && "bg-gray-100 text-gray-700"} group flex items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700`}
                >
                    <span className="text-sm font-medium"> Gastroenterologist </span>

                    <span
                        className="shrink-0 rounded-full bg-gray-100 px-3 py-0.5 text-xs text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-700"
                    >
                        {doctors.filter((doc) => doc.speciality === "Gastroenterologist").length}
                    </span>
                </Link>
            </li>
        </ul>
    </>;
};

export default SpecialityMenu;
