import React from "react";
import { assets } from "../../../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const Register = () => {
  return <>
    <section className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-full overflow-auto">
        <div className="hidden bg-cover bg-no-repeat lg:block lg:w-2/5" style={{ backgroundImage: `url(${assets.register_image})` }}>
        </div>
        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
              Get your free account now.
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400 w-[60%] mx-auto">
              Let’s get you all set up so you can verify your personal account and begin setting up your profile.
            </p>
            <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 text-start">
              <div className="col-span-1 md:col-span-2 text-center my-2">
                <button
                  type="button"
                  class="group relative inline-flex items-center overflow-hidden rounded bg-primary px-8 py-3 text-white focus:outline-none focus:ring"
                >
                  <span class="absolute -end-full transition-all group-hover:end-4">
                    <img src={assets.camera} class="size-[23px] rtl:rotate-180" alt="camera icon" />
                  </span>

                  <label htmlFor="profile" class="text-sm font-medium transition-all group-hover:me-4 cursor-pointer"> Profile Image </label>
                  <input id="profile" type="file" className="hidden w-full h-full" />
                </button>
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Name</label>
                <input type="text" placeholder="John" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                <input type="email" placeholder="johnsnow@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label>
                <input type="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Confirm password</label>
                <input type="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Phone number</label>
                <input type="text" placeholder="XXX-XX-XXXX-XXX" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Birth Date</label>
                <input type="date" placeholder="Enter your birth date" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Job</label>
                <input type="text" placeholder="Enter your job" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div>
                <label htmlFor="OrderNotes" className="block text-sm font-medium text-gray-700"> Order notes </label>

                <textarea
                  id="OrderNotes"
                  className="mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm"
                  rows="4"
                  placeholder="Enter any additional order notes..."
                ></textarea>
              </div>

              <fieldset className="col-span-1 md:col-span-2 gap-4 flex justify-center">
                <div className="w-[50%]">
                  <label
                    htmlFor="DeliveryStandard"
                    className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-300 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                  >
                    <div>
                      <p className="text-gray-700">Gender</p>

                      <p className="mt-1 text-gray-900">Male</p>
                    </div>

                    <input
                      type="radio"
                      name="DeliveryOption"
                      value="DeliveryStandard"
                      id="DeliveryStandard"
                      className="size-5 border-gray-300 text-blue-500"
                      checked
                    />
                  </label>
                </div>

                <div className="w-[50%]">
                  <label
                    htmlFor="DeliveryPriority"
                    className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-300 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                  >
                    <div>
                      <p className="text-gray-700">Gender</p>
                      <p className="mt-1 text-gray-900">Female</p>
                    </div>

                    <input
                      type="radio"
                      name="DeliveryOption"
                      value="DeliveryPriority"
                      id="DeliveryPriority"
                      className="size-5 border-gray-300 text-blue-500"
                    />
                  </label>
                </div>
              </fieldset>

              <button className="py-3 px-6 rounded-[4px] w-fit text-sm text-white capitalize transition-colors duration-300 transform bg-primary hover:bg-primary/80 focus:outline-none focus:ring focus:ring-opacity-50">
                <span>Sign Up </span>
              </button>
            </form>
            <p className="text-sm text-gray-500">
              Have an account?
              <Link className="underline text-primary" to="/auth/login"> Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </section>

  </>;
};

export default Register;
