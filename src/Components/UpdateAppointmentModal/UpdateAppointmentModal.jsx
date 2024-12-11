import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "flowbite-react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { updateExamination_date } from "../../Redux/reducers/examination_dates.reducer";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TextField } from "@mui/material";
import { renderTimeViewClock } from "@mui/x-date-pickers";

const UpdateAppointmentModal = ({ openModal, setOpenModal, token, docId, date }) => {
    const [error, setError] = useState(false);

    const { loading, success } = useSelector((state) => state.examination_date);
    const dispatch = useDispatch();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({});

    const onSubmit = (data) => {
        if (data.time === undefined) {
            setError(true)
            return;
        }
        setError(false)
        const body = {
            newTime: {
                time: dayjs(data.time).format("hh:mm"),
                modifier: dayjs(data.time).format("A"),
            }
        };
        dispatch(updateExamination_date({ token, docId, timeId: date._id, body }))
        setOpenModal(false);
    };



    // useEffect(() => {
    //     if (success === "Date updated successfully") {
    //         setOpenModal(false);
    //     }
    // }, [success, openModal]);

    return (
        <Modal show={openModal} size="lg" onClose={() => {setOpenModal(false), setError(false)}}>
            <Modal.Header>Update Doctor Date</Modal.Header>
            <Modal.Body>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {/* time and modifier */}
                    <div className="w-full">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["TimePicker"]}>
                                <DemoItem label="Doctor Time">
                                    <Controller
                                        name="time"
                                        control={control}
                                        render={({ field }) => (
                                            <TimePicker
                                                defaultValue={dayjs().hour(date.modifier === "PM" && parseInt(date.time.split(":")[0] > 12) ? 12 + parseInt(date.time.split(":")[0]) : date.modifier === "AM" && parseInt(date.time.split(":")[0]) === 12 ? 24 : parseInt(date.time.split(":")[0])).minute(date.time.split(":")[1])}
                                                {...field}
                                                value={field.value || null}
                                                onChange={(newValue) => field.onChange(newValue)}
                                                textField={(params) => <TextField defaultValue={date.time} {...params} label="Select Time" />}
                                                viewRenderers={{
                                                    hours: renderTimeViewClock,
                                                    minutes: renderTimeViewClock,
                                                    seconds: renderTimeViewClock,
                                                }}
                                            />
                                        )}
                                    />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>
                        <p className="text-red-600 text-start mt-2">{error && "Please, Enter another time!"}</p>
                    </div>
                    <Modal.Footer>
                        <button type="submit" className="text-white inline-flex items-center bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-sm text-sm px-8 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-indigo-800">
                            <span>{loading ? <Spinner color="info" aria-label="Default status example" /> : "Update date"} </span>
                        </button>
                    </Modal.Footer>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateAppointmentModal;
