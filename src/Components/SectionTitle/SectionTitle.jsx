import React from "react";

const SectionTitle = ({ title, description }) => {
    return <div>
        <h2 className="text-[30px] font-semibold text-cente">{title}</h2>
        <p className="text-center text-sm text-gray-600 flex justify-center">
            <span className="block w-[400px]">{description}</span>
        </p>
    </div>;
};

export default SectionTitle;
