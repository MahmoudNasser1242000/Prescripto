import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets_frontend/assets";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../../Redux/reducers/myProfile.reducer";
import { logout } from "../../Redux/reducers/auth.reducer";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const NavBar = () => {
    const [showMenu, SetShowMenu] = useState(false);
    const [showProfileMenu, SetshowProfileMenu] = useState(false);

    const { token } = useSelector((state) => state.auth);
    const logged = jwtDecode(token);

    const { myProfile, loading } = useSelector((state) => state.myProfile);
    const dispatch = useDispatch();

    const signOut = () => {
        dispatch(logout());
        toast.success("Logout Successfully")
    }

    useEffect(() => {
        dispatch(getMyProfile(token));
    }, [dispatch, token]);
    return <>
        <nav className="border-gray-200 bg-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3">
                    <img src={assets.logo} className="h-8" alt="website Logo" />
                </Link>
                <div className="flex items-center relative md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button type="button" onClick={() => SetshowProfileMenu(!showProfileMenu)} className={`bg-slate-300 flex text-sm border ${myProfile?.profile && !loading ? "" : "border-[#0C3860] p-[2px]"} rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600`} id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        <span className="sr-only">Open user menu</span>
                        <img className="w-8 h-8 rounded-full" src={myProfile?.profile && !loading ? myProfile?.profile : assets.default_profile_pic} alt="user profile" />
                    </button>
                    {/* Dropdown menu */}
                    {showProfileMenu && (<div className={`z-50 ${!showProfileMenu ? "hidden" : ""} absolute top-8 md:top-4 right-10 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`} id="user-dropdown">
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                        </div>
                        <ul className="py-2" aria-labelledby="user-menu-button">
                            <li>
                                <Link to="/my-profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</Link>
                            </li>
                            <li>
                                <Link to="/my-appointments" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">My appointments</Link>
                            </li>
                            {
                                logged.role === "manager" || logged.role === "super-manager" && (
                                    <li>
                                        <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</Link>
                                    </li>
                                )
                            }
                            <li>
                                <Link
                                    to={"/auth/login"}
                                    onClick={() => signOut()}
                                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                    Sign out
                                </Link>
                            </li>
                        </ul>
                    </div>)}
                    <button data-collapse-toggle="navbar-user" onClick={() => SetShowMenu(!showMenu)} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className={`items-center justify-between ${!showMenu && "hidden"} w-full md:flex md:w-auto md:order-1`} id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <NavLink to="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/doctors" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">All Doctors</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</NavLink>
                        </li>
                        <li>
                            <NavLink to="/concat" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Pricing</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>;
};

export default NavBar;
