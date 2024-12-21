import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DoctorCardSkeleton from "../../../Components/DoctorCardSkeleton/DoctorCardSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../Redux/reducers/users.reducer";
import UserCard from "../../../Components/UserCard/UserCard";
import { IconButton, Pagination, TextField } from "@mui/material";
import { GrPowerReset } from "react-icons/gr";

const GetAllUsers = () => {
    const [page, setPage] = useState("");
    const [keyword, setKeyword] = useState("");

    const { type } = useParams();
    const { users, loading, metaData } = useSelector((state) => state.user);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers({ token, keyword, page }))
    }, [dispatch, token, page, keyword]);

    const changePage = (e, value) => {
        setPage(value)
        scrollTo(0, 0)
    }
    return (
        <>
            <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-x-0 sm:gap-x-4 gap-y-5 sm:gap-y-0 max-w-[1280px] mx-auto px-2 xl:px-0">
                <ul className="space-y-1">
                    <li>
                        <Link
                            to="/dashboard/all-users"
                            className={`${!type && "bg-gray-100 text-gray-700"} group flex items-center justify-between rounded-lg px-4 py-2 hover:bg-gray-100 hover:text-gray-700`}
                        >
                            <span className="text-sm font-medium"> All Users </span>

                            <span
                                className="shrink-0 rounded-full bg-gray-100 px-3 py-0.5 text-xs text-gray-700 group-hover:bg-gray-200 group-hover:text-gray-700"
                            >
                                {users?.length}
                            </span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/dashboard/all-users/managers"
                            className={`${type === "managers" && "bg-gray-100 text-gray-700"} group flex items-center justify-between rounded-lg px-4 py-2 hover:bg-gray-100 hover:text-gray-700`}
                        >
                            <span className="text-sm font-medium"> Manager </span>

                            <span
                                className="shrink-0 rounded-full bg-gray-100 px-3 py-0.5 text-xs text-gray-700 group-hover:bg-gray-200 group-hover:text-gray-700"
                            >
                                {users.filter((user) => user.role === "super-manager" || user.role === "manager").length}
                            </span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/dashboard/all-users/patients"
                            className={`${type === "patients" && "bg-gray-100 text-gray-700"} group flex items-center justify-between rounded-lg px-4 py-2 hover:bg-gray-100 hover:text-gray-700`}
                        >
                            <span className="text-sm font-medium"> Patients </span>

                            <span
                                className="shrink-0 rounded-full bg-gray-100 px-3 py-0.5 text-xs text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-700"
                            >
                                {users.filter((user) => user.role === "user").length}
                            </span>
                        </Link>
                    </li>
                </ul>
                <div className="md:col-span-3">
                    {!type && (
                        <div className="mb-12 flex justify-end items-center gap-x-2 mt-16 md:mt-0">
                            <IconButton color="primary" onClick={() => setKeyword("")} aria-label="add an alarm">
                                <GrPowerReset />
                            </IconButton>
                            <TextField label="Search" className="w-[90%] md:w-[40%]" variant="filled" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                        </div>
                    )}
                    <div className="flex flex-wrap justify-evenly lg:justify-start gap-y-4 mt-8 md:mt-0">
                        {loading ? (
                            Array.from({ length: 8 }, (_, index) => (
                                <DoctorCardSkeleton key={index} />
                            ))
                        ) : !users.length ? (
                            <h1 className="text-3xl text-center w-full">
                                No {type === "user" ? "Users" : "Managers"} Wright Now!
                            </h1>
                        ) : (
                            type === "patients" ?
                                users
                                    ?.filter((user) => user.role === "user")
                                    .map((user) => (
                                        <div key={user._id} className="mx-1 w-full sm:w-auto">
                                            <UserCard user={user} />
                                        </div>
                                    ))
                                : type === "managers" ? users
                                    ?.filter((user) => user.role === "manager" || user.role === "super-manager")
                                    .map((user) => (
                                        <div key={user._id} className="mx-1 w-full sm:w-auto">
                                            <UserCard user={user} />
                                        </div>
                                    ))
                                    : (users.map((user) => (
                                        <div key={user._id} className="mx-1 w-full sm:w-auto">
                                            <UserCard user={user} />
                                        </div>
                                    )))
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-20 flex justify-center w-full">
                <Pagination page={page || 1} count={metaData?.totalPages} onChange={changePage} color="primary" />
            </div>
        </>
    );
};

export default GetAllUsers;
