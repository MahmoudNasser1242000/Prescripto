import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAppointment, getAppointments, getDoctorAppointments, getUserAppointments } from "../../../Redux/reducers/appointments.reducer";
import { Table } from "flowbite-react";
import TableRowSkeleton from "../../../Components/TableRowSkeleton/TableRowSkeleton ";
import { useSearchParams } from "react-router-dom";
import { Button, IconButton, Pagination, TextField } from "@mui/material";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { GrPowerReset } from "react-icons/gr";
import { Helmet } from "react-helmet";

const AllApointments = () => {
    const [searchParams] = useSearchParams()
    const [page, setPage] = useState("");
    const [keyword, setKeyword] = useState(null);

    const { token } = useSelector((state) => state.auth);
    const { loading, appointments, metaData, length } = useSelector((state) => state.appointment);
    const dispatch = useDispatch();

    const getTime = (date) => {
        const newDate = new Date(date);

        const hours = newDate.getHours();
        const minutes = newDate.getMinutes();
        const seconds = newDate.getSeconds();

        const formattedTime = `${String(hours).padStart(2, "0")}:${String(
            minutes
        ).padStart(2, "0")}:${String(seconds).padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;
        return formattedTime;
    };

    useEffect(() => {
        if (searchParams.get("docId")) {
            dispatch(getDoctorAppointments({ token, docId: searchParams.get("docId"), keyword: keyword ? keyword.format('YYYY-MM-DD HH:mm:ss') : "", page }));
        } else if (searchParams.get("userId")) {
            dispatch(getUserAppointments({ token, userId: searchParams.get("userId"), keyword: keyword ? keyword.format('YYYY-MM-DD HH:mm:ss') : "", page }));
        } else {
            dispatch(getAppointments({ token, keyword: keyword ? keyword.format('YYYY-MM-DD HH:mm:ss') : "", page }));
        }
    }, [dispatch, token, keyword, searchParams]);

    const removeAppointment = (id) => {
        dispatch(deleteAppointment({ token, id }));
    }

    const changePage = (e, value) => {
        setPage(value)
        scrollTo(0, 0)
    }
    return <>
        <Helmet>
            <title>All Apointments</title>
        </Helmet>
        <div className="max-w-[1280px] mx-auto px-8 sm:px-12">
            <div className="my-12 flex justify-end items-center gap-x-2">
                <IconButton color="primary" onClick={() => setKeyword(null)} aria-label="add an alarm">
                    <GrPowerReset />
                </IconButton>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                        components={[
                            'DateTimePicker',
                            'MobileDateTimePicker',
                            'DesktopDateTimePicker',
                            'StaticDateTimePicker',
                        ]}
                    >
                        <DemoItem>
                            <MobileDateTimePicker value={keyword} clearable onChange={(value) => setKeyword(value)} />
                        </DemoItem>
                    </DemoContainer>
                </LocalizationProvider>
            </div>
            <h2 className="mt-12 mb-8 text-2xl text-center sm:text-start font-bold">
                {searchParams.get("docId") ? "Doctor" : searchParams.get("userId") ? "User" : "All"} Appointments ({length})
            </h2>

            <div className="overflow-x-auto">
                <Table striped>
                    <Table.Head>
                        <Table.HeadCell>
                            doctor info
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Date
                        </Table.HeadCell>
                        <Table.HeadCell>patient</Table.HeadCell>
                        <Table.HeadCell>
                            Time
                        </Table.HeadCell>
                        <Table.HeadCell>doctor avtive</Table.HeadCell>
                        <Table.HeadCell>actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {
                            loading ? (
                                <Table.Row>
                                    <TableRowSkeleton />
                                </Table.Row>
                                // .filter((app) => {
                                //     return searchParams.get("docId")? app.doctor._id === searchParams.get("docId") :
                                //     searchParams.get("userId") ? app.user._id === searchParams.get("userId") : app
                                // })
                            ) : appointments?.length ?
                                (appointments?.map((appointment) => (
                                    <Table.Row
                                        key={appointment._id}
                                        className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        {/* Doctor Info */}
                                        <Table.Cell className="whitespace-nowrap flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-3 px-4 py-2">
                                            <img
                                                className="w-14 h-14 rounded-full object-cover"
                                                src={appointment.doctor.profile}
                                                alt={`Dr.${appointment.doctor.name}`}
                                            />
                                            <div className="text-center lg:text-left">
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {appointment.doctor.name}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {appointment.doctor.speciality}
                                                </p>
                                            </div>
                                        </Table.Cell>

                                        {/* Date */}
                                        <Table.Cell className={`px-4 py-2 text-center text-sm text-gray-600 dark:text-gray-400`}>
                                            <p className={`${new Date(appointment.date) < new Date() ? "line-through text-red-500" : ""}`}>
                                                {new Date(appointment.date).toLocaleDateString("en-GB", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })} (Original)
                                            </p>

                                            <p>
                                                {new Date(appointment.date) < new Date() && `${new Date(appointment.expireDate).toLocaleDateString("en-GB", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })} (Reserve)`}
                                            </p>
                                        </Table.Cell>

                                        {/* patient */}
                                        <Table.Cell className="px-4 lg:px-7 py-2 text-sm space-x-[6px]">
                                            {appointment.user.name}
                                        </Table.Cell>

                                        {/* Time */}
                                        <Table.Cell className="px-4 py-2 lg:px-6 text-sm text-center text-gray-600 dark:text-gray-400">
                                            {getTime(appointment.date)}
                                        </Table.Cell>

                                        {/* Active */}
                                        <Table.Cell className="px-4 py-2 lg:px-6 text-sm space-x-[6px] text-gray-600 dark:text-gray-400">
                                            <span className="relative inline-flex items-center h-2 w-2 mb-1">
                                                <span
                                                    className={`absolute inline-flex h-full w-full animate-ping rounded-full ${appointment.doctor.active
                                                        ? "bg-green-400"
                                                        : "bg-red-400"
                                                        } opacity-75`}
                                                ></span>
                                                <span
                                                    className={`relative inline-flex h-2 w-2 rounded-full ${appointment.doctor.active
                                                        ? "bg-green-600"
                                                        : "bg-red-600"
                                                        }`}
                                                ></span>
                                            </span>
                                            <span className="text-gray-700 dark:text-gray-300">
                                                {appointment.doctor.active ? "Active" : "Not Active"}
                                            </span>
                                        </Table.Cell>

                                        {/* Actions */}
                                        <Table.Cell className="px-4 py-2">
                                            <div className="flex flex-nowrap gap-2 justify-center sm:justify-start">
                                                <button onClick={() => { removeAppointment(appointment._id) }} className="rounded bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700">
                                                    Delete
                                                </button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                                ) : (
                                    <tr className="p-3 text-2xl block">
                                        There are no appointments right now!
                                    </tr>
                                )
                        }
                    </Table.Body>
                </Table>
            </div>
            <div className="mt-20 flex justify-center w-full">
                <Pagination page={page || 1} count={metaData?.totalPages} onChange={changePage} color="primary" />
            </div>
        </div>
    </>
};

export default AllApointments;
