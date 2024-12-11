import { Button } from "@mui/material";
import { Modal, Spinner } from "flowbite-react";
import React, { useEffect, useReducer } from "react";
import { MdMoreTime } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteExamination_date } from "../../Redux/reducers/examination_dates.reducer";

const AppointmentsModal = ({ openModal, setOpenModal, setUpdateAppointmentModal, docId, date, token }) => {
    const { loading } = useReducer((state) => state.examination_date);
    const dispatch = useDispatch();
    const deleteDate = () => {
        dispatch(deleteExamination_date({ token, docId, timeId: date._id }))
    }

    return <>
        <Modal show={openModal} className="rounded-md" size="xl" onClose={() => setOpenModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <MdMoreTime className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete or update time?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button variant="contained" color="error" onClick={() => deleteDate()}>
                            {loading ? <Spinner color="white" aria-label="Default status example" /> : "Delete"}
                        </Button>
                        <Button variant="contained" color="info" onClick={() => {setOpenModal(false), setUpdateAppointmentModal(true)} }>
                            Update
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </>;
};

export default AppointmentsModal;
