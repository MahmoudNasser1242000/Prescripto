import React from "react";
import { assets } from "../../assets/assets_frontend/assets";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About</title>
      </Helmet>
      <div className="max-w-[1280px] mx-auto px-8 sm:px-12">
        <h2 className="text-gray-500 text-4xl font-bold mt-20">
          About <span className="text-black">Us</span>
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-y-16 lg:gap-y-0 lg:space-x-16 mt-16">
          <img
            src={assets.about_image}
            className="w-[400px] h-[580px] object-cover"
            alt="about us image"
          />
          <div className="text-gray-600 lg:w-1/2 font-light text-center lg:text-start ">
            <div className="my-4">
              <h3 className="text-black mb-4 font-semibold">Who We Are</h3>
              <p>
                Welcome to Prescripto — your go-to platform for seamless
                appointment scheduling. We created this website with a simple
                mission: to make booking appointments easier, faster, and more
                convenient for everyone.
              </p>
            </div>
            <div className="my-4">
              <h3 className="text-black mb-4 font-semibold">What We Offer</h3>
              <p>
                Whether you’re looking to book a consultation, a service, or a
                check-up, we’re here to connect you with trusted providers
                effortlessly. Our platform offers an intuitive experience,
                allowing users to find available times, book appointments, and
                manage their schedules in one place.
              </p>
            </div>
            <div className="my-4">
              <h3 className="text-black mb-4 font-semibold">Our Commitment</h3>
              <p>
                We’re dedicated to making the process of setting and managing
                appointments as smooth as possible for both clients and providers.
                With features like real-time availability, instant booking
                confirmations, and helpful reminders, Prescripto aims to save
                you time and simplify your day.
              </p>
            </div>
            <div className="my-4">
              <h3 className="text-black mb-4 font-semibold">Thank You for Choosing Us</h3>
              <p>
                Thank you for choosing Prescripto! We're excited to help you
                stay organized and connected with the professionals and services
                that matter to you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
