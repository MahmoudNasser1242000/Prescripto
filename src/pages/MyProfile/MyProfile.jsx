import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets_frontend/assets";
import UpdateProfileModal from "../../Components/UpdateProfileModal/UpdateProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../../Redux/reducers/myProfile.reducer";
import { jwtDecode } from "jwt-decode";
import UpdateProfilePictureModal from "../../Components/updateProfilePictureModal/updateProfilePictureModal";

const MyProfile = () => {
  const [openUpdateInfoModal, setOpenUpdateInfoModal] = useState(false);
  const [openUpdateProfilePicModal, setOpenUpdateProfilePicModal] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const logged = jwtDecode(token);

  const { myProfile, loading } = useSelector((state) => state.myProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProfile(token));
  }, [dispatch, token]);

  if (!loading) {
    console.log(myProfile);
    
  }
  if (loading) return "loading .....";
  return (
    <div className="pt-14 max-w-[1280px] mx-auto px-8 sm:px-12">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-[30%] text-center mb-8 lg:mb-0 border border-y-0 border-gray-300 py-6">
          <div className="relative">
            {
              myProfile?.profile && logged.role !== "doctor" && (
                <button className="absolute top-[80%] left-[55%] lg:left-[60%]" onClick={() => setOpenUpdateProfilePicModal(true)}>
                  <img className="size-[36px] hover:scale-[1.2] duration-300 cursor-pointer" src={assets.edit_profile_pic} alt={"edit profile picture"} />
                </button>
              )
            }
            <img
              src={
                myProfile?.profile ? myProfile?.profile : assets.default_profile_pic
              }
              alt="profile picture"
              className="rounded-full object-cover w-48 h-48 mx-auto mb-4 p-1 outline outline-2 outline-[#0C3860] dark:outline-blue-900 transition-transform duration-300"
            />
          </div>
          <h1 className="text-2xl font-bold text-primary dark:text-white mb-2">
            {myProfile?.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {logged.role === "doctor" ? myProfile?.speciality : myProfile?.job}
          </p>
          <div className="flex flex-col justify-center items-center text-center">
            <button
              onClick={() => setOpenUpdateInfoModal(true)}
              type="button"
              className="mt-4 w-fit bg-indigo-600 text-white px-12 py-2 rounded-md hover:bg-indigo-900 transition-colors duration-300"
            >
              Edit Profile
            </button>
            <button
              onClick={() => setOpenModal(true)}
              type="button"
              className="mt-4 w-fit bg-red-600 text-white px-12 py-2 rounded-md hover:bg-red-900 transition-colors duration-300"
            >
              delete Profile
            </button>
          </div>
        </div>

        <div className="lg:w-2/3 lg:pl-8 text-center lg:text-start">
          <h2 className="text-xl font-semibold text-primary dark:text-white mb-4">
            Bio
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {logged.role === "doctor"
              ? myProfile?.about || "____"
              : myProfile?.bio || "____"}
          </p>
          <h2 className="text-xl font-semibold text-primary dark:text-white mb-4">
            Presonal Informations
          </h2>
          <div className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start">
            <span className="bg-indigo-100 text-primary px-3 py-1 rounded-full text-sm">
              {myProfile?.age} years old
            </span>
            <span className="bg-indigo-100 text-primary px-3 py-1 rounded-full text-sm">
              {new Date(myProfile?.birth_date).toLocaleDateString("en-GB")}
            </span>
            <span className="bg-indigo-100 text-primary px-3 py-1 rounded-full text-sm">
              {myProfile?.gender}
            </span>
          </div>
          <h2 className="text-xl font-semibold text-primary dark:text-white mb-4">
            Contact Information
          </h2>
          <ul className="lg:space-y-2 text-gray-700 dark:text-gray-300 inline-flex flex-wrap gap-y-3 items-center justify-center lg:block space-x-5 lg:space-x-0">
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-primary dark:text-blue-900"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              {myProfile?.email}
            </li>
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-primary dark:text-blue-900"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              +20 {myProfile?.phone}
            </li>
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-primary dark:text-blue-900"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              San Francisco, CA
            </li>
          </ul>
        </div>
      </div>
      <UpdateProfileModal openModal={openUpdateInfoModal} onCloseModal={() => setOpenUpdateInfoModal(false)} myProfileData={myProfile} token={token} />
      <UpdateProfilePictureModal openModal={openUpdateProfilePicModal} onCloseModal={() => setOpenUpdateProfilePicModal(false)} token={token} />
    </div>
  );
};

export default MyProfile;
