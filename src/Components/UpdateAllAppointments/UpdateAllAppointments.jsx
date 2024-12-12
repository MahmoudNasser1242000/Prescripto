import { Modal, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import joiResolver from "../../utils/joiResolver";
import { Autocomplete, TextField } from "@mui/material";
import { times } from "../../assets/assets_frontend/assets";
import { updatetDoctorDates } from "../../Redux/reducers/doctors.reducer";
import { updateAllExamination_dates } from "../../validation";

const UpdateAllAppointments = ({ openModal, setOpenModal, docId, token }) => {
    const { loading, success, doctor } = useSelector((state) => state.doctor);
    const dispatch = useDispatch();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(updateAllExamination_dates),
        defaultValues: {
            examination_dates: doctor?.examination_dates.map((times) => { return {time: times.time, modifier: times.modifier} }),
        },
        values: {
            examination_dates: doctor?.examination_dates.map((times) => { return {time: times.time, modifier: times.modifier} }),
        }
    });

    const onSubmit = (data) => {        
        dispatch(updatetDoctorDates({ token, docId, body: { times: JSON.stringify(data.examination_dates) } }))
    };

    useEffect(() => {
        if (success === "Doctor Dates updated successfully") {
            setOpenModal(false)
        }
    }, [success]);

    return (
        <Modal show={openModal} size="lg" onClose={() => { setOpenModal(false) }}>
            <Modal.Header>Update All Doctor Dates</Modal.Header>
            <Modal.Body>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {/* time and modifier */}
                    <div className="w-full">
                        <Controller
                            name="examination_dates"
                            control={control}
                            render={({ field }) => (
                                <Autocomplete
                                    multiple
                                    id="tags-outlined"
                                    options={times}
                                    getOptionLabel={(option) => `${option?.time} ${option?.modifier}`}
                                    // isOptionEqualToValue={(option, value) => option.time === value.time}
                                    filterSelectedOptions
                                    {...field}
                                    // value={field.value || doctor?.examination_dates.map((times) => { return {time: times.time, modifier: times.modifier} })}
                                    onChange={(e, value) => field.onChange(value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Choose doctor examination dates"
                                        />
                                    )}
                                />
                            )}
                        />
                        <p className="text-red-600 text-start mt-2">{errors.examination_dates?.message}</p>
                    </div>
                    <Modal.Footer>
                        <button type="submit" className="text-white inline-flex items-center bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-sm text-sm px-8 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-indigo-800">
                            <span>{loading ? <Spinner color="info" aria-label="Default status example" /> : "Update dates"} </span>
                        </button>
                    </Modal.Footer>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateAllAppointments;
