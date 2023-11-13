import React, { useContext } from "react";
import { Select } from "@windmill/react-ui";

import OrderServices from "services/OrderServices";
import { notifySuccess, notifyError } from "utils/toast";
import { SidebarContext } from "context/SidebarContext";
import { useTranslation } from "react-i18next";

const SelectPaymentStatus = ({ id, order }) => {
  // console.log('id',id ,'order',order)
  const { t } = useTranslation();
  const { setIsUpdate } = useContext(SidebarContext);
  const handleChangeStatus = (id, status) => {
    OrderServices.updateOrder(id, { statusPayment: status })
      .then((res) => {

        notifySuccess("Cập nhật trạng thái thành công!");
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
        <option value={order?.statusPayment} defaultValue hidden>
          {t(order?.statusPayment)}
        </option>
        <option defaultValue={order?.statusPayment === "Pay"} value="Pay">
          {t("Pay")}
        </option>
        <option defaultValue={order?.statusPayment === "Unpaid"} value="Unpaid">
          {t("Unpaid")}
        </option>
      </Select>
    </>
  );
};

export default SelectPaymentStatus;
