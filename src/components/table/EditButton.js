import React from "react";
import { FiEdit, FiTrash2, FiZoomIn } from "react-icons/fi";

import Tooltip from "../tooltip/Tooltip";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const EditButton = ({
    id,
    handleUpdate,
}) => {
    const { t } = useTranslation();
    // console.log('edite delet button')
    return (
        <>
            <div className="flex justify-end text-right">

                    <button
         
                        onClick={() => handleUpdate(id)}
                        className="p-2 cursor-pointer text-gray-400 hover:text-blue-600 focus:outline-none"
                    >
                        <Tooltip
                            id="edit"
                            Icon={FiEdit}
                            title={t("Edit")}
                            bgColor="blue"
                        />
                    </button>
             


            </div>
        </>
    );
};

export default EditButton;
