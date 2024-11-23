import React from "react";
import { Button, Modal } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfile } from "../../Redux/reducers/myProfile.reducer";
import { useNavigate } from "react-router-dom";
import { AiOutlineUserDelete } from "react-icons/ai";

const DeleteProfileModal = ({ openModal, onCloseModal, token }) => {
    const { loading } = useSelector((state) => state.myProfile);
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const deleteMyProfile = () => {
        dispatch(deleteProfile(token));
        setTimeout(() => {
            localStorage.removeItem("Token");
            navigate()
        }, 3000);
    }
    return <>
        <Modal show={openModal} size="lg" onClose={() => onCloseModal()} popup>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <AiOutlineUserDelete className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to Delete Your Account?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button color="gray" className="rounded-sm" onClick={() => onCloseModal()}>
                            Cancel
                        </Button>
                        <Button color="failure" onClick={() => deleteMyProfile()} className="rounded-sm">
                            <span>{loading ? <Spinner color="info" aria-label="Default status example" /> : "Delete Account"} </span>
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </>;
};

export default DeleteProfileModal;
