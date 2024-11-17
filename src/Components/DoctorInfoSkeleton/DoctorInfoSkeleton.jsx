import React from "react";

const DoctorInfoSkeleton = () => {
    return (
        <section className="mt-16 mx-auto">
            <div className="mx-auto px-4">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
                    {/* Image Skeleton */}
                    <div className="relative h-64 md:h-full rounded-md w-full col-span-1 shadow-sm bg-gray-200 animate-pulse"></div>

                    {/* Content Skeleton */}
                    <div className="py-10 lg:py-12 rounded-md md:col-span-2 border border-1 text-start px-6 shadow-sm">
                        {/* Name and Verified Icon */}
                        <div className="flex items-center space-x-3">
                            <div className="h-8 w-40 bg-gray-200 rounded-md animate-pulse"></div>
                            <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
                        </div>

                        {/* Degree and Experience */}
                        <div className="flex items-center mt-2 space-x-3">
                            <div className="h-6 w-56 bg-gray-200 rounded-md animate-pulse"></div>
                            <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                        </div>

                        {/* About Section */}
                        <div className="mt-4">
                            <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse"></div>
                            <div className="mt-2 space-y-2">
                                <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse"></div>
                                <div className="h-4 w-3/4 bg-gray-200 rounded-md animate-pulse"></div>
                            </div>
                        </div>

                        {/* Appointment Fee */}
                        <div className="mt-4">
                            <div className="h-6 w-48 bg-gray-200 rounded-md animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DoctorInfoSkeleton;
