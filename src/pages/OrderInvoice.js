import dayjs from "dayjs";
import { useParams } from "react-router";
import ReactToPrint from "react-to-print";
import React, { useRef } from "react";
import { FiPrinter } from "react-icons/fi";
import { IoCloudDownloadOutline } from "react-icons/io5";
import {
  TableCell,
  TableHeader,
  Table,
  TableContainer,
} from "@windmill/react-ui";
import { PDFDownloadLink } from "@react-pdf/renderer";

import useAsync from "hooks/useAsync";
import OrderServices from "services/OrderServices";
import Invoice from "components/invoice/Invoice";
import Loading from "components/preloader/Loading";
import PageTitle from "components/Typography/PageTitle";
import InvoiceForDownload from "components/invoice/InvoiceForDownload";
import SettingServices from "services/SettingServices";
import { useTranslation } from "react-i18next";

const OrderInvoice = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const printRef = useRef();

  const { data, loading } = useAsync(() => OrderServices.getOrderById(id));
  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);

  const currency = globalSetting?.default_currency || "VND";
  return (
    <>
      <PageTitle> {t("InvoicePageTittle")} </PageTitle>

      <div
        ref={printRef}
        className="bg-white dark:bg-gray-800 mb-4 p-6 lg:p-8 rounded-xl shadow-sm overflow-hidden"
      >
        {!loading && (
          <div className="">
            <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50 dark:border-gray-700 dark:text-gray-300">
              <h1 className="font-bold font-serif text-xl uppercase">
                {t("InvoicePageTittle")}
                {/* <p className="text-xs mt-1 text-gray-500">
                  {t("InvoiceStatus")}
                  <span className="pl-2 font-medium text-xs capitalize">
                    {" "}
                    <Status status={data.status} />
                  </span>
                </p> */}
              </h1>
              <div className="lg:text-right text-left">
                <h2 className="lg:flex lg:justify-end text-lg font-serif font-semibold mt-4 lg:mt-0 lg:ml-0 md:mt-0">
                  {globalSetting?.shop_name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {globalSetting?.address}
                </p>
              </div>
            </div>
            <div className="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
              <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
                <span className="font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  {t("InvoiceDate")}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 block">
                  {data.createdAt !== undefined && (
                    <span>
                      {dayjs(data?.createdAt).format("DD/MM/YYYY HH:mm ")}
                    </span>
                  )}
                </span>
                <span className="font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  {t("DeliveryOption")}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 block">
                  {data?.shippingOption}
                </span>
              </div>
              <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
                <span className="font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  {t("InvoiceNo")}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 block">
                  #{data?.invoice}
                </span>
                <span className="font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  {t("LadingCode")}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 block">
                  #{data?.BillOfLadingCode}
                </span>
              </div>
              <div className="flex flex-col lg:text-right text-left">
                <span className="font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  {t("InvoiceTo")}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 block">
                  <p>
                    {t("FullName")}: {data?.user_info?.name}
                  </p>
                  <p>
                    {t("Email")}: {data?.user_info?.email}
                  </p>
                  <p className="ml-2">
                    {t("CustomersPhone")}: {data?.user_info?.contact}
                  </p>
                  <p>
                    {t("AddressLine")}: {data?.user_info?.address},{data?.user_info?.zipCode}, {data?.user_info?.city}, {data?.user_info?.country}
                  </p>
                  {/* <p>
                    {t("City")}: 
                  </p>
                  <p>
                    {t("Country")}:
                  </p>
                  <p>
                    {t("ZipCode")}: 
                  </p> */}
                </span>
              </div>
            </div>
          </div>
        )}
        <div>
          {loading ? (
            <Loading loading={loading} />
          ) : (
            <TableContainer className="my-8">
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell>{t("Sr")}</TableCell>
                    <TableCell>{t("ProductTitleName")}</TableCell>
                    <TableCell className="text-center">
                      {t("Quantity")}
                    </TableCell>

                    <TableCell className="text-center">
                      {t("ProductWarantyTbl")}
                    </TableCell>

                    <TableCell className="text-center">
                      {t("ItemPrice")}
                    </TableCell>
                    <TableCell className="text-right">
                      {t("TotalAmount")}
                    </TableCell>
                  </tr>
                </TableHeader>
                <Invoice
                  data={data}
                  currency={currency}
                  globalSetting={globalSetting}
                />
              </Table>
            </TableContainer>
          )}
        </div>

        {!loading && (
          <div className="border rounded-xl border-gray-100 p-8 py-6 bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
            <div className="flex lg:flex-row md:flex-row flex-col justify-between">
              <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  {t("InvoicepaymentMethod")}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold font-serif block">
                  {t(data.paymentMethod)}
                </span>
              </div>
              <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  {t("ShippingCost")}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold font-serif block">
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: currency,
                  }).format(Number(data.shippingCost))}
                </span>
              </div>
              <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  {t("InvoiceDicount")}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold font-serif block">
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: currency,
                  }).format(Number(data.discount))}
                </span>
              </div>
              <div className="flex flex-col sm:flex-wrap">
                <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  {t("InvoiceTotalAmount")}
                </span>
                <span className="text-xl font-serif font-bold text-red-500 dark:text-blue-500 block">
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: currency,
                  }).format(Number(data.total))}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      {!loading && (
        <div className="mb-4 mt-3 flex justify-between">
          <PDFDownloadLink
            document={
              <InvoiceForDownload
                t={t}
                data={data}
                currency={currency}
                globalSetting={globalSetting}
              />
            }
            fileName="Invoice"
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                <>{t("Loading")}</>
              ) : (
                <button className="flex items-center text-sm leading-5 transition-colors duration-150 font-medium focus:outline-none px-5 py-2 rounded-md text-white bg-blue-500 border border-transparent active:bg-blue-600 hover:bg-blue-600 focus:ring focus:ring-purple-300 w-auto cursor-pointer">
                  {t("DownloadInvoice")}
                  <span className="ml-2 text-base">
                    <IoCloudDownloadOutline />
                  </span>
                </button>
              )
            }
          </PDFDownloadLink>

          <ReactToPrint
            trigger={() => (
              <button className="flex items-center text-sm leading-5 transition-colors duration-150 font-medium focus:outline-none px-5 py-2 rounded-md text-white bg-blue-500 border border-transparent active:bg-blue-600 hover:bg-blue-600 focus:ring focus:ring-purple-300 w-auto">
                {t("PrintInvoice")}
                <span className="ml-2">
                  <FiPrinter />
                </span>
              </button>
            )}
            content={() => printRef.current}
            documentTitle="Invoice"
          />
        </div>
      )}
    </>
  );
};

export default OrderInvoice;
