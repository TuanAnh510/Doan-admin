import React from "react";
import { FiTrash2 } from "react-icons/fi";

import Tooltip from "../tooltip/Tooltip";

import { useTranslation } from "react-i18next";


const DeleteButton = ({
  id,
  title,
  handleModalOpen,
  isCheck,
  product,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex justify-end text-right">
        <button
          disabled={isCheck?.length > 0}
          onClick={() => handleModalOpen(id, title, product)}
          className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
        >
          <Tooltip
            id="delete"
            Icon={FiTrash2}
            title={t("Delete")}
            bgColor="#EF4444"
          />
        </button>
      </div>
    </>
  );
};

export default DeleteButton;
