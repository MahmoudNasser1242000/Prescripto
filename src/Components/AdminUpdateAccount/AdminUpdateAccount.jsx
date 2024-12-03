import React, { useEffect } from "react";
import { Modal, Spinner } from "flowbite-react";
import joiResolver from "../../utils/joiResolver";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAndDoctorSchema } from "../../validation";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { FormControlLabel, Switch, TextField } from "@mui/material";
import { updateteUser } from "../../Redux/reducers/users.reducer";
import { updateteDoctor } from "../../Redux/reducers/doctors.reducer";
import dayjs from "dayjs";

const AdminUpdateAccount = ({ openModal, onCloseModal, token, role, id, active, activeExpire = null }) => {
    const { loading: doctorLoading, success: doctorSuccess } = useSelector((state) => state.doctor);
    const { loading: userLoading, success: userSuccess } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(updateUserAndDoctorSchema),
        defaultValues: {
            active,
            activeExpire: dayjs(activeExpire) || null,
        }
    });

    const onSubmit = (data) => {
        console.log(data);

        const updateBody = {active: data.active};

        if (data.active === true && active === true) {
            onCloseModal()
            return;
        }

        if (data.active !== true) {
            updateBody.activeExpire = data.activeExpire
        } else {
            updateBody.activeExpire = null
        }

        if (role === "doctor") {
            dispatch(updateteDoctor({ token, docId: id, body: updateBody }));
        } else {
            dispatch(updateteUser({ token, userId: id, body: updateBody }));
        }
    };

    useEffect(() => {
        // Check success and close modal when the update is successful
        if (doctorSuccess === "Doctor updated successfully" || userSuccess === "User updated successfully") {
            onCloseModal();
        }
    }, [doctorSuccess, userSuccess]);

    return (
        <Modal show={openModal} size="lg" onClose={onCloseModal}>
            <Modal.Header>Update {role === "doctor" ? "Doctor" : "User"} Profile</Modal.Header>
            <Modal.Body>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {/* active */}
                    <div className="col-span-2">
                        <Controller
                            name="active"
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    control={
                                        <Switch
                                            {...field}
                                            checked={field.value}
                                            color="success"
                                        />
                                    }
                                    label={`${role} ${active ? "active" : "not active"}`}
                                />
                            )}
                        />
                        <p className="text-red-600 text-start mt-2">{errors.active?.message}</p>
                    </div>
                    {/* active expire */}
                    <div className="col-span-2">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                                components={[
                                    'DateTimePicker',
                                    'MobileDateTimePicker',
                                    'DesktopDateTimePicker',
                                    'StaticDateTimePicker',
                                ]}
                            >
                                <DemoItem label="Expire date">
                                    <Controller
                                        name="activeExpire"
                                        control={control}
                                        rules={{
                                            required: "'activeExpire' is required",
                                            validate: (value) => !isNaN(new Date(value)) || "'activeExpire' must be a valid date",
                                        }}
                                        render={({ field }) => (
                                            <MobileDateTimePicker
                                                {...field}
                                                value={field.value || null}
                                                onChange={(date) => field.onChange(date)}
                                                slots={{
                                                    textField: React.forwardRef((params, ref) => (
                                                        <TextField {...params} ref={ref} label="Expire Date" />
                                                    )),
                                                }}
                                            />
                                        )}
                                    />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>
                        <p className="text-red-600 text-start mt-2">{errors.activeExpire?.message}</p>
                    </div>
                    <Modal.Footer>
                        <button type="submit" className="text-white inline-flex items-center bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-sm text-sm px-8 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-indigo-800">
                            <span>{doctorLoading || userLoading ? <Spinner color="info" aria-label="Default status example" /> : "Update Profile"} </span>
                        </button>
                    </Modal.Footer>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default AdminUpdateAccount;
