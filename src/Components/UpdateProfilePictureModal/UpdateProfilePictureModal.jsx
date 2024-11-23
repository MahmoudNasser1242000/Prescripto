import React from "react";
import { assets } from "../../assets/assets_frontend/assets";
import { Button, Modal } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../Redux/reducers/myProfile.reducer";

const UpdateProfilePictureModal = ({ openModal, onCloseModal, token }) => {
    const { loading } = useSelector((state) => state.myProfile);
    const dispatch = useDispatch();

    const deleteProfilePic = () => {
        const formData = new FormData();
        formData.append("profile", " ");
        dispatch(updateUserProfile({ token, body: formData }))
        // onCloseModal()
    }
    return <>
        <Modal show={openModal} size="lg" onClose={() => onCloseModal()} popup>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <img src={assets.edit_profile_pic} className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" alt="edit profile picture" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to Delete Your Profile Pic?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button color="gray" className="rounded-sm" onClick={() => onCloseModal()}>
                            Cancel
                        </Button>
                        <Button color="failure" onClick={() => deleteProfilePic()} className="rounded-sm">
                            <span>{loading ? <Spinner color="info" aria-label="Default status example" /> : "Delete Profile"} </span>
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </>;
};

export default UpdateProfilePictureModal;
