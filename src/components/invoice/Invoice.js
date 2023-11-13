import React from "react";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

const Invoice = ({ data, currency }) => {
  const { t } = useTranslation();
  return (
    <>
      <TableBody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 text-serif text-sm ">
        {data?.cart?.map((item, i) => (
          <TableRow key={i} className="dark:border-gray-700 dark:text-gray-400">
            <TableCell className="px-6 py-1 whitespace-nowrap font-normal text-gray-500 text-left">
              {i + 1}{" "}
            </TableCell>
            <TableCell className="px-6 py-1 whitespace-nowrap font-normal text-gray-500 whitespace-normal">
              {item.title}
            </TableCell>
            <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-center">
              {item.quantity}{" "}
            </TableCell>

            <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-center">
              {item.warranty ? item.warranty + " " + t("Month") : ""}
            </TableCell>

            <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-center">
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: currency,
              }).format(Number(item.price))}
            </TableCell>

            <TableCell className="px-6 py-1 whitespace-nowrap text-right font-bold text-red-500 dark:text-blue-500">
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: currency,
              }).format(Number(item.itemTotal))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default Invoice;
