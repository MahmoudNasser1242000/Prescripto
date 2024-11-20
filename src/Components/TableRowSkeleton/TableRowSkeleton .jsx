import React from "react";

const TableRowSkeleton = () => {
    return (
        <>
            {/* Doctor Info */}
            <td className="whitespace-nowrap flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-3 px-4 py-2">
                <div className="w-14 h-14 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
                <div className="text-center lg:text-left">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-24 mb-1"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-16"></div>
                </div>
            </td>

            {/* Date */}
            <td className="px-4 py-2 text-center text-sm text-gray-600 dark:text-gray-400">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-20 mb-1"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-20"></div>
            </td>

            {/* Availability */}
            <td className="px-4 lg:px-7 py-2 text-sm space-x-[6px]">
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-16"></div>
            </td>

            {/* Time */}
            <td className="px-4 py-2 lg:px-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-16"></div>
            </td>

            {/* Active */}
            <td className="px-4 py-2 lg:px-6 text-sm space-x-[6px] text-gray-600 dark:text-gray-400">
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-16"></div>
            </td>

            {/* Actions */}
            <td className="px-4 py-2">
                <div className="flex flex-nowrap gap-2 justify-center sm:justify-start">
                    <div className="h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
            </td>
        </>
    );
};

export default TableRowSkeleton;
