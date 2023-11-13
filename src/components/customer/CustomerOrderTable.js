import React from "react";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";
import Status from "components/table/Status";
import SelectStatus from "components/form/SelectStatus";
import useFilter from "hooks/useFilter";
import { showDateFormat } from "utils/dateFormate";
import { useTranslation } from "react-i18next";

// import Status from '../table/Status';
// import SelectStatus from '../form/SelectStatus';

const CustomerOrderTable = ({ orders }) => {
  const { globalSetting } = useFilter();
  const { t } = useTranslation();
  return (
    <>
      <TableBody>
        {orders?.map((order) => (
          <TableRow key={order._id}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">
                {order._id.substring(20, 24)}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {/* {dayjs(order.createdAt).format("MMM D, YYYY")} */}
                {showDateFormat(
                  order.createdAt,
                  globalSetting?.default_date_format
                )}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{order?.user_info?.address}</span>
            </TableCell>
            <TableCell>
              {" "}
              <span className="text-sm">{order.user_info?.contact}</span>{" "}
            </TableCell>
            <TableCell>
              <span className="text-sm font-semibold">
                {t(order.paymentMethod)}
              </span>
            </TableCell>
            <TableCell>
              {" "}
              <span className="text-sm font-semibold">
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(Number(order.total))}
              </span>{" "}
            </TableCell>
            <TableCell className="text-center">
              <Status status={order.status} />
            </TableCell>
            <TableCell className="text-right">
              <SelectStatus id={order._id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CustomerOrderTable;
