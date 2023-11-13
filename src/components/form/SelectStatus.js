import React, { useContext } from "react";
import { Select } from "@windmill/react-ui";

import OrderServices from "services/OrderServices";
import { notifySuccess, notifyError } from "utils/toast";
import { SidebarContext } from "context/SidebarContext";
import { useTranslation } from "react-i18next";

const SelectStatus = ({ id, order }) => {
  // console.log('id',id ,'order',order)
  const { t } = useTranslation();
  const { setIsUpdate } = useContext(SidebarContext);
  const handleChangeStatus = (id, status) => {
    OrderServices.updateOrder(id, { status: status })
      .then((res) => {
        notifySuccess("Cập nhật trạng thái thàng công!");
        setIsUpdate(true);
      })
      .catch((err) => notifyError("Cập nhật trạng thái thất bại!"));
  };

  return (
    <>
      <Select
        onChange={(e) => handleChangeStatus(id, e.target.value)}
        className="border border-gray-50 bg-gray-50 dark:border-gray-700 h-8 rounded-md text-xs focus:border-blue-500 focus:outline-none"
      >
        <option value={order?.status} defaultValue hidden>
          {t(order?.status)}
        </option>
        <option
          defaultValue={order?.status === "Processing"}
          value="Processing"
        >
          {t("Processing")}
        </option>
        <option defaultValue={order?.status === "Pending"} value="Pending">
          {t("Pending")}
        </option>
        <option defaultValue={order?.status === "InTransit"} value="InTransit">
          {t("InTransit")}
        </option>
        <option defaultValue={order?.status === "Delivered"} value="Delivered">
          {t("Delivered")}
        </option>

        <option defaultValue={order?.status === "Cancel"} value="Cancel">
          {t("Cancel")}
        </option>
      </Select>
    </>
  );
};

export default SelectStatus;
