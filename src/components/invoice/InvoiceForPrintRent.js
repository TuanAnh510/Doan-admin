import {
  ModalBody,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@windmill/react-ui";
import dayjs from "dayjs";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

const InvoiceForPrintRent = ({ data, printRef, globalSetting }) => {
  const cartTotal = data?.cart?.reduce(
    (pre, cur) => pre + Number(cur?.price) * cur.quantity,
    0
  );

  const cartTotalWithTax = data?.cart?.reduce(
    (pre, cur) => pre + Number(cur?.price) * cur.quantity,
    0
  );
  // total vat
  const totalVat = Number((cartTotalWithTax - cartTotal).toFixed(2));

  const { t } = useTranslation();

  const currency = globalSetting?.default_currency || "VND";

  return (
    <div ref={printRef} className="p-4">
      {Array.isArray(data) ? (
        data?.map((or, i) => (
          <div className="mb-8" key={i + 1}>
            {globalSetting?.logo !== 404 && (
              <img
                className="flex mx-auto"
                size="large"
                src={globalSetting?.logo}
                alt=""
                width={50}
              />
            )}

            <div className="my-1">
              <div className="flex justify-center">
                <h1 className="font-bold text-xl">
                  {globalSetting?.company_name}
                </h1>
              </div>

              <ModalBody className="flex flex-col justify-center text-center">
                <span className="flex-row">{globalSetting?.address}</span>

                <span className="flex justify-center">
                  {globalSetting?.contact}
                </span>

                {globalSetting?.web_site}
                <br />
                {globalSetting?.email}
              </ModalBody>
            </div>
            <div className="text-left text-xs bg-white capitalize text-gray-700 flex justify-between">
              <div>
                Họ tên: {or?.user_info?.name}
                <br />
                Số điện thoại: {or?.user_info?.contact}
                <br />
                Email: {or?.user_info?.email}
                <br />
                Địa chỉ : {or?.user_info?.address}{", "}{or?.user_info?.zipCode}{", "}{or?.user_info?.country}{", "}{or?.user_info?.city}
              </div>
              <div>
                Mã vận đơn: {or?.BillOfLadingCode}
              </div>
            </div>
            <TableContainer className="my-4 rounded-b-lg">
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell className="bg-white">
                      <span className="text-xs capitalize text-gray-700">
                        {t("Item")}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs bg-white capitalize text-center text-gray-700">
                      {t("QTY")}
                    </TableCell>
                    <TableCell className="text-xs bg-white capitalize text-center text-gray-700">
                      {t("ProductWarantyTbl")}
                    </TableCell>
                    <TableCell className="text-xs bg-white capitalize text-right text-gray-700">
                      {t("InvoiceTotalAmount")}
                    </TableCell>
                  </tr>
                </TableHeader>
                <TableBody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 text-serif text-sm">
                  {or?.cart?.map((item, i) => (
                    <TableRow
                      key={i}
                      className="dark:border-gray-700 dark:text-gray-400 bill"
                    >
                      <TableCell className="py-1 w-2 ">
                        <span className="font-normal whitespace-normal text-gray-600 bill">
                          {" "}
                          {item.title.vi}
                        </span>
                      </TableCell>
                      <TableCell className="text-center py-1">
                        <span className="font-bold text-center bill">
                          {" "}
                          {item.quantity}{" "}
                        </span>
                      </TableCell>

                      <TableCell className="text-center py-1">
                        <span className="font-bold text-center bill">
                          {item.warranty
                            ? item.warranty + " " + t("Month")
                            : ""}
                        </span>
                      </TableCell>

                      <TableCell className="text-right py-1">
                        <span className="text-right font-bold text-gray-700 bill">
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: currency,
                          }).format(
                            Number(item.quantity * item.rent.monthlyrent)
                          )}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <ModalBody>
              <div className="flex justify-between -mt-3 mr-1 mb-4">
                <div className="mt-2">
                  {or?.paymentMethod === "Combined" ? (
                    <p className="bill">
                      <span className="mb-1 font-semibold bill font-serif text-xs text-gray-700 dark:text-gray-500 block">
                        {t("Paymentmethods")} :{" "}
                        <span className="text-gray-600 bill">
                          {t(or.paymentMethod)}
                        </span>
                      </span>
                      {or?.paymentDetails?.selectPaymentOption_Card !==
                        undefined && (
                          <span className="text-xs bill">
                            {or?.paymentDetails?.selectPaymentOption_Card}:{" "}
                            <span className="font-semibold text-gray-900">
                              {Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: currency,
                              }).format(
                                Number(or?.paymentDetails?.paymentAmount_Card)
                              )}
                            </span>
                          </span>
                        )}
                      <br />
                      {or?.paymentDetails?.selectPaymentOption_Cash !==
                        undefined && (
                          <span className="text-xs bill">
                            {or?.paymentDetails?.selectPaymentOption_Cash}:{" "}
                            <span className="font-semibold text-gray-900">
                              {Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: currency,
                              }).format(
                                Number(or?.paymentDetails?.paymentAmount_Cash)
                              )}
                            </span>
                          </span>
                        )}
                      <br />
                      {or?.paymentDetails?.selectPaymentOption_Credit !==
                        undefined && (
                          <span className="text-xs bill">
                            {or?.paymentDetails?.selectPaymentOption_Credit}:{" "}
                            <span className="font-semibold text-gray-900">
                              {Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: currency,
                              }).format(
                                Number(or?.paymentDetails?.paymentAmount_Credit)
                              )}
                            </span>
                          </span>
                        )}
                    </p>
                  ) : (
                    <p className="bill">
                      <span className="font-semibold bill font-serif text-xs text-gray-600 dark:text-gray-500 block">
                        {t("Paymentmethods")} :{" "}
                        <span className="text-gray-700 bill">
                          {t(or.paymentMethod)}
                        </span>
                      </span>
                    </p>
                  )}

                  <div className="text-xs bill">
                    {or?.shippingOption && (
                      <>
                        <span className="text-gray-600">
                          {t("ShippingMethodLower")} :
                          <span className="font-semibold text-gray-900">
                            {or?.shippingOption}
                          </span>
                        </span>
                        <br />
                      </>
                    )}
                    <span className="text-gray-600">
                      {t("NoofItems")} :{" "}
                      <span className="font-semibold text-gray-900">
                        {or?.cart?.length}
                      </span>{" "}
                    </span>{" "}
                    <br />
                    <span className="text-gray-600">
                      {t("BillNo")} :{" "}
                      <span className="font-semibold text-gray-900">
                        {" "}
                        {or?.invoice}
                      </span>{" "}
                    </span>{" "}
                    <br />
                    <br />
                    {globalSetting?.vat_number && (
                      <>
                        <span className="text-gray-600">
                          {t("VATNumber")}:{" "}
                          <span className="font-semibold text-gray-900">
                            {" "}
                            {globalSetting?.vat_number}
                          </span>{" "}
                        </span>
                        <br />
                      </>
                    )}
                    <span className="text-gray-600">
                      {t("Date")} :{" "}
                      <span className="font-semibold text-gray-700">
                        {" "}
                        {/* {dayjs(new Date()).format('MMMM D, YYYY h:mm A')} */}
                        {dayjs(new Date()).format("MM/D/YYYY")}
                      </span>{" "}
                    </span>
                  </div>
                </div>

                <div className="mt-2">
                  <h5 className="flex justify-between font-medium text-xs ">
                    <span>{t("GrossTotal")} :</span>{" "}
                    <span className="font-semibold ">
                      {currency}
                      {parseFloat(or?.subTotal).toFixed(2)}
                    </span>
                  </h5>
                  {or?.vat > 0 && (
                    <h5 className="flex justify-between font-medium text-xs ">
                      <span>{t("VATTotal")} :</span>{" "}
                      <span className="font-semibold ">
                        {currency}
                        {parseFloat(totalVat).toFixed(2)}
                      </span>
                    </h5>
                  )}
                  {or?.shippingCost > 0 && (
                    <h5 className="flex justify-between font-medium text-xs">
                      <span> {t("ShippingCostLower")} :</span>{" "}
                      <span className="font-semibold ">
                        {currency}
                        {parseFloat(or?.shippingCost).toFixed(2)}
                      </span>
                    </h5>
                  )}
                  {or?.discount > 0 && (
                    <h5 className="flex justify-between font-medium text-xs">
                      <span> {t("DiscountLower")} :</span>{" "}
                      <span className="font-semibold">
                        {currency}
                        {parseFloat(or?.discount).toFixed(2)}
                      </span>
                    </h5>
                  )}
                  <h3 className="flex justify-between font-medium text-xs border-t border-black mt-2">
                    <span> {t("Total")} : </span>
                    <span className="font-semibold ">
                      {currency}
                      {parseFloat(or?.total).toFixed(2)}
                    </span>
                  </h3>
                </div>
              </div>
            </ModalBody>

            <h2 className="mb-2 text-center font-medium text-sm">
              {t("ThankYouMsg")}
            </h2>
          </div>
        ))
      ) : (
        <Fragment>
          {globalSetting?.logo !== 404 && (
            <img
              className="flex mx-auto"
              size="large"
              src={globalSetting?.logo}
              alt=""
              width={50}
            />
          )}

          <div className="my-1">
            <div className="flex justify-center">
              <h1 className="font-bold text-xl">
                {globalSetting?.company_name}
              </h1>
            </div>

            <ModalBody className="flex flex-col justify-center text-center">
              <span className="flex-row">{globalSetting?.address}</span>

              <span className="flex justify-center">
                {globalSetting?.contact}
              </span>

              {globalSetting?.web_site}
              <br />
              {globalSetting?.email}
            </ModalBody>
          </div>
          <div className="text-left text-xs bg-white capitalize text-gray-700 flex justify-between">
            <div>
              Họ tên: {data?.user_info?.name}
              <br />
              Số điện thoại: {data?.user_info?.contact}
              <br />
              Email: {data?.user_info?.email}
              <br />
              Địa chỉ : {data?.user_info?.address}{", "}{data?.user_info?.zipCode}{", "}{data?.user_info?.country}{", "}{data?.user_info?.city}
            </div>
            <div>
              Mã vận đơn: {data.BillOfLadingCode}
            </div>
          </div>
          <TableContainer className="my-4 rounded-b-lg">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell className="bg-white">
                    <span className="text-xs capitalize text-gray-700">
                      {t("Item")}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs bg-white capitalize text-center text-gray-700">
                    {t("QTY")}
                  </TableCell>
                  <TableCell className="text-xs bg-white capitalize text-center text-gray-700">
                    {t("MonthlyRent")}
                  </TableCell>

                  <TableCell className="text-xs bg-white capitalize text-center text-gray-700">
                    {t("DepositCost")}
                  </TableCell>

                  <TableCell className="text-xs bg-white capitalize text-right text-gray-700">
                    {t("InvoiceTotalAmount")}
                  </TableCell>
                </tr>
              </TableHeader>
              <TableBody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 text-serif text-sm">
                {data?.cart?.map((item, i) => (
                  <TableRow
                    key={i}
                    className="dark:border-gray-700 dark:text-gray-400 bill"
                  >
                    <TableCell className="py-1 ">
                      <span className="font-normal whitespace-normal text-gray-600 bill ">
                        {" "}
                        {item.title.vi}
                      </span>
                    </TableCell>
                    <TableCell className="text-center py-1">
                      <span className="font-bold text-center bill">
                        {" "}
                        {item.quantity}{" "}
                      </span>
                    </TableCell>
                    <TableCell className="text-center py-1">
                      <span className="font-bold text-center bill">
                        {" "}
                        {item.rent.monthlyrent}{" "}
                      </span>
                    </TableCell>

                    <TableCell className="text-center py-1">
                      <span className="font-bold text-center bill">
                        {" "}
                        {item.rent.depositcost}{" "}
                      </span>
                    </TableCell>

                    <TableCell className="text-right py-1">
                      <span className="text-right font-bold text-gray-700 bill">
                        {" "}
                        {Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: currency,
                        }).format(
                          Number(item.quantity * item.rent.monthlyrent)
                        )}{" "}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <ModalBody>
            <div className="flex justify-between -mt-3 mr-1 mb-4">
              <div className="mt-2">
                {data?.paymentMethod === "Combined" ? (
                  <p className="bill">
                    <span className="mb-1 font-semibold bill font-serif text-xs text-gray-700 dark:text-gray-500 block">
                      {t("PaymentMethods")} :{" "}
                      <span className="text-gray-600 bill">
                        {t(data.paymentMethod)}
                      </span>
                    </span>
                    {data?.paymentDetails?.selectPaymentOption_Card !==
                      undefined && (
                        <span className="text-xs bill">
                          {data?.paymentDetails?.selectPaymentOption_Card}:{" "}
                          <span className="font-semibold text-gray-900">
                            {" "}
                            {Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: currency,
                            }).format(
                              Number(data?.paymentDetails?.paymentAmount_Card)
                            )}
                          </span>
                        </span>
                      )}
                    <br />
                    {data?.paymentDetails?.selectPaymentOption_Cash !==
                      undefined && (
                        <span className="text-xs bill">
                          {data?.paymentDetails?.selectPaymentOption_Cash}:{" "}
                          <span className="font-semibold text-gray-900">
                            {Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: currency,
                            }).format(
                              Number(data?.paymentDetails?.paymentAmount_Cash)
                            )}
                          </span>
                        </span>
                      )}
                    <br />
                    {data?.paymentDetails?.selectPaymentOption_Credit !==
                      undefined && (
                        <span className="text-xs bill">
                          {data?.paymentDetails?.selectPaymentOption_Credit}:{" "}
                          <span className="font-semibold text-gray-900">
                            {Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: currency,
                            }).format(
                              Number(data?.paymentDetails?.paymentAmount_Credit)
                            )}
                          </span>
                        </span>
                      )}
                  </p>
                ) : (
                  <p className="bill">
                    <span className="font-semibold bill font-serif text-xs text-gray-600 dark:text-gray-500 block">
                      {t("PaymentMethods")} :{" "}
                      <span className="text-gray-700 bill">
                        {t(data.paymentMethod)}
                      </span>
                    </span>
                  </p>
                )}

                <div className="text-xs bill">
                  {data?.shippingOption && (
                    <>
                      <span className="text-gray-600">
                        {t("ShippingMethodLower")} :
                        <span className="font-semibold text-gray-900">
                          {data?.shippingOption}
                        </span>
                      </span>
                      <br />
                    </>
                  )}
                  <span className="text-gray-600">
                    {t("NoofItems")} :{" "}
                    <span className="font-semibold text-gray-900">
                      {data?.cart?.length}
                    </span>{" "}
                  </span>{" "}
                  <br />
                  <span className="text-gray-600">
                    {t("BillNo")} :{" "}
                    <span className="font-semibold text-gray-900">
                      {" "}
                      {data?.invoice}
                    </span>{" "}
                  </span>{" "}
                  <br />
                  <span className="text-gray-600">
                    {t("TimeRent")} :{" "}
                    <span className="font-semibold text-gray-900">
                      {" "}
                      {dayjs(data?.createdAt).format("YYYY/MM/DD HH:mm:ss")}
                    </span>{" "}
                  </span>{" "}
                  <br />
                  <br />
                  {globalSetting?.vat_number && (
                    <>
                      <span className="text-gray-600">
                        {t("VATNumber")}:{" "}
                        <span className="font-semibold text-gray-900">
                          {" "}
                          {globalSetting?.vat_number}
                        </span>{" "}
                      </span>
                      <br />
                    </>
                  )}
                  <span className="text-gray-600">
                    {t("Date")} :{" "}
                    <span className="font-semibold text-gray-700">
                      {" "}
                      {/* {dayjs(new Date()).format('MMMM D, YYYY h:mm A')} */}
                      {dayjs(new Date()).format("DD/MM/YYYY")}
                    </span>{" "}
                  </span>
                </div>
              </div>

              <div className="mt-2">
                <h5 className="flex justify-between font-medium text-xs ">
                  <span>{t("TotalDepositCost")} :</span>{" "}
                  <span className="font-semibold ">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: currency,
                    }).format(Number(data?.subTotal))}
                  </span>
                </h5>
                {data?.vat > 0 && (
                  <h5 className="flex justify-between font-medium text-xs ">
                    <span>{t("VATTotal")} :</span>{" "}
                    <span className="font-semibold ">
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: currency,
                      }).format(Number(totalVat))}
                    </span>
                  </h5>
                )}
                {data?.shippingCost > 0 && (
                  <h5 className="flex justify-between font-medium text-xs">
                    <span> {t("ShippingCostLower")} :</span>{" "}
                    <span className="font-semibold ">
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: currency,
                      }).format(Number(data?.shippingCost))}
                    </span>
                  </h5>
                )}
                {data?.discount > 0 && (
                  <h5 className="flex justify-between font-medium text-xs">
                    <span> {t("DiscountLower")} :</span>{" "}
                    <span className="font-semibold">
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: currency,
                      }).format(Number(data?.discount))}
                    </span>
                  </h5>
                )}
                <h3 className="flex justify-between font-medium text-xs border-t border-black mt-2">
                  <span> {t("TotalMonthlyRent")} : </span>
                  <span className="font-semibold ">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: currency,
                    }).format(Number(data?.total))}
                  </span>
                </h3>
              </div>
            </div>
          </ModalBody>

          <h2 className="mb-2 text-center font-medium text-sm">
            {t("ThankYouMsg")}
          </h2>
        </Fragment>
      )}
    </div>
  );
};

export default InvoiceForPrintRent;
