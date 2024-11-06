import React from "react";
import { assets } from "../../assets/assets_frontend/assets";
import { Modal } from "flowbite-react";

const UpdateProfileModal = ({ openModal, onCloseModal }) => { //className={`hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full`}
    return <>
        <Modal show={openModal} size="lg" onClose={onCloseModal}>
            <Modal.Header>Update User Profile</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    {/* name */}
                    <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="user name" required />
                    </div>
                    {/* email */}
                    <div className="col-span-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="user email" required />
                    </div>
                    {/* phone */}
                    <div className="col-span-2">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                        <input type="tel" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="user phone number" required />
                    </div>
                    {/* birth Date */}
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="birth-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birth Date</label>
                        <input type="date" name="birth-date" id="birth-date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="user age" required />
                    </div>
                    {/* gender */}
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                        <select name="gender" id="gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option selected>Male</option>
                            <option value="TV">Female</option>
                        </select>
                    </div>
                    {/* profile image */}
                    <div className="col-span-2">
                        <button
                            class="group relative inline-flex items-center overflow-hidden rounded bg-primary px-8 py-3 text-white focus:outline-none focus:ring"
                            href="#"
                        >
                            <span class="absolute -end-full transition-all group-hover:end-4">
                                <img src={assets.camera} class="size-[23px] rtl:rotate-180" alt="camera icon" />
                            </span>

                            <span class="text-sm font-medium transition-all group-hover:me-4"> Profile Image </span>
                        </button>
                    </div>
                    {/* bio */}
                    <div className="col-span-2">
                        <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bio</label>
                        <textarea name="bio" id="bio" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="somehting about use..." />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Update Profile
                </button>
            </Modal.Footer>
        </Modal>
    </>;
};

export default UpdateProfileModal;
