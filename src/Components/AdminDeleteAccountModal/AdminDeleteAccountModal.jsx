import React, { useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineUserDelete } from "react-icons/ai";
import { deleteDoctor } from "../../Redux/reducers/doctors.reducer";
import { deleteUser } from "../../Redux/reducers/users.reducer";

const AdminDeleteAccountModal = ({ openModal, onCloseModal, token, role, id }) => {
    const { loading: doctorLoading, success: doctorSuccess } = useSelector((state) => state.doctor);
    const { loading: userLoading, success: userSuccess } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const deleteAccount = () => {
        if (role === "doctor") {
            dispatch(deleteDoctor({token, docId: id}));
        } else {
            dispatch(deleteUser({token, userId: id}));
        }
    }

    useEffect(() => {
        if (doctorSuccess === "Doctor deleted successfully" || userSuccess === "User deleted successfully") {
            navigate("/dashboard")
        } 
    }, [doctorSuccess, userSuccess]);
    return <>
        <Modal show={openModal} size="lg" onClose={() => onCloseModal()} popup>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <AiOutlineUserDelete className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to Delete {role} Account?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button color="gray" className="rounded-sm" onClick={() => onCloseModal()}>
                            Cancel
                        </Button>
                        <Button color="failure" onClick={() => deleteAccount()} className="rounded-sm">
                            <span>{doctorLoading || userLoading ? <Spinner color="info" aria-label="Default status example" /> : "Delete Account"} </span>
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </>;
};

export default AdminDeleteAccountModal;
