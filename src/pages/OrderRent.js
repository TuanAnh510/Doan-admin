import {
  Button,
  Card,
  CardBody,
  Input,
  Label,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableHeader,
} from "@windmill/react-ui";
import { useContext, useState } from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import exportFromJSON from "export-from-json";

//internal import
import useAsync from "hooks/useAsync";
import useFilter from "hooks/useFilter";
import OrderServices from "services/OrderServices";
import NotFound from "components/table/NotFound";
import PageTitle from "components/Typography/PageTitle";
import { SidebarContext } from "context/SidebarContext";
import TableLoading from "components/preloader/TableLoading";
import { notifyError } from "utils/toast";
import spinnerLoadingImage from "assets/img/spinner.gif";
import OrderRentTable from "components/order/OrderRentTable";

const OrderRent = () => {
  const {
    time,
    setTime,
    currentPage,
    searchText,
    searchRef,
    status,
    setStatus,
    handleSubmitForAll,
    resultsPerPage,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    lang,
  } = useContext(SidebarContext);

  const { t } = useTranslation();
  const [loadingExport, setLoadingExport] = useState(false);

  const { data, loading } = useAsync(() =>
    OrderServices.getAllOrders({
      customerName: searchText,
      status: "",
      page: currentPage,
      limit: resultsPerPage,
      day: time,
      startDate,
      endDate,
      statusRent: status,
      statusPayment: "Pay",
      rent: "rent",
    })
  );

  const { dataTable, serviceData, globalSetting } = useFilter(data?.orders);
  const handleDownloadOrders = async () => {
    try {
      setLoadingExport(true);
      const res = await OrderServices.getAllOrders({
        customerName: "",
        status: null,
        page: null,
        limit: null,
        day: null,
        startDate: null,
        endDate: null,
        statusRent: null,
        rent: "rent",
      });

      const exportData = res?.orders?.map((order) => {
        return {
          _id: order._id,
          invoice: order.invoice,
          depositCost: order.subTotal,
          monthlyRent: order.total,
          discount: order?.discount,
          paymentMethod: order.paymentMethod,
          statusRent: order.statusRent,
          user_info: order?.user_info?.name,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          statusPayment: order.statusPayment,
        };
      });

      exportFromJSON({
        data: exportData,
        fileName: "orders",
        exportType: exportFromJSON.types.csv,
      });
      setLoadingExport(false);
    } catch (err) {
      setLoadingExport(false);

      notifyError(err ? err?.response?.data?.message : err.message);
    }
  };
  // console.log("data in orders page", data);

  return (
    <>
      <PageTitle>{t("OrderRent")}</PageTitle>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form onSubmit={handleSubmitForAll}>
            <div className="grid gap-4 lg:gap-6 xl:gap-6 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 py-2">
              <div>
                <Input
                  ref={searchRef}
                  type="search"
                  name="search"
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  placeholder={t("SearchCustomer")}
                />
              </div>

              <div>
                <Select
                  onChange={(e) => setStatus(e.target.value)}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                >
                  <option value="" defaultValue hidden>
                    {t("Status")}
                  </option>
                  <option value="">{t("Status")}</option>
                  <option value="RentedOut">{t("RentedOut")}</option>
                  <option value="Deposit">{t("Deposit")}</option>
                  <option value="Processing">{t("PageOrderProcessing")}</option>
                  <option value="Cancel">{t("OrderCancel")}</option>
                  <option value="Expired">{t("Expired")}</option>
                </Select>
              </div>

              <div>
                <Select
                  onChange={(e) => setTime(e.target.value)}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                >
                  <option value="Order limits" defaultValue hidden>
                    {t("Orderlimits")}
                  </option>
                  <option value="">{t("Orderlimits")}</option>
                  <option value="5">{t("DaysOrders5")}</option>
                  <option value="7">{t("DaysOrders7")}</option>
                  <option value="15">{t("DaysOrders15")}</option>
                  <option value="30">{t("DaysOrders30")}</option>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 lg:gap-6 xl:gap-6 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 py-2">
              <div>
                <Label>{t("StartDate")}</Label>
                <Input
                  type="date"
                  name="startDate"
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div>
                <Label>{t("EndDate")}</Label>
                <Input
                  type="date"
                  name="startDate"
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <div>
                <Label style={{ visibility: "hidden" }}>{t("Download")}</Label>
                {loadingExport ? (
                  <Button disabled={true} type="button" className="h-12 w-full">
                    <img
                      src={spinnerLoadingImage}
                      alt="Loading"
                      width={20}
                      height={10}
                    />{" "}
                    <span className="font-serif ml-2 font-light">
                      {t("Processing")}
                    </span>
                  </Button>
                ) : (
                  <button
                    onClick={handleDownloadOrders}
                    disabled={data?.orders?.length <= 0 || loadingExport}
                    type="button"
                    className={`${(data?.orders?.length <= 0 || loadingExport) &&
                      "opacity-50 cursor-not-allowed bg-red-300"
                      } flex items-center justify-center text-sm leading-5 h-12 w-full text-center transition-colors duration-150 font-medium focus:outline-none px-6 py-2 rounded-md text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300`}
                  >
                    {t("DownloadOrdersBtn")}
                    <span className="ml-2 text-base">
                      <IoCloudDownloadOutline />
                    </span>
                  </button>
                )}
              </div>
            </div>
          </form>
        </CardBody>
      </Card>

      {loading ? (
        <TableLoading row={12} col={7} width={160} height={20} />
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8 dark:bg-gray-900">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>{t("InvoiceNo")}</TableCell>
                <TableCell>{t("TimeTbl")}</TableCell>
                <TableCell>{t("CustomerName")}</TableCell>
                <TableCell>{t("MethodTbl")}</TableCell>
                <TableCell>{t("BillOfLadingCode")}</TableCell>
                <TableCell>{t("PaymentStatus")}</TableCell>
                <TableCell>{t("ActionTbl")}</TableCell>
                <TableCell>{t("OderStatusTbl")}</TableCell>
                <TableCell>{t("ActionTbl")}</TableCell>
                <TableCell className="text-right">{t("InvoiceTbl")}</TableCell>
              </tr>
            </TableHeader>

            <OrderRentTable
              lang={lang}
              orders={dataTable}
              globalSetting={globalSetting}
              currency={globalSetting?.default_currency || "VND"}
            />
          </Table>

          {/* <TableFooter>
            <Pagination
              totalResults={data?.totalDoc}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter> */}
        </TableContainer>
      ) : (
        <NotFound title={t("sorryOrdersNotFound")} />
      )}
    </>
  );
};

export default OrderRent;
