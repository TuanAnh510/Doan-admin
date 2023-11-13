import {
    Card,
    CardBody,
    Input,
    Pagination,
    Table,
    TableCell,
    TableContainer,
    TableFooter,
    TableHeader,
} from "@windmill/react-ui";
import { useContext, useState } from "react";

import { useTranslation } from "react-i18next";
import { SidebarContext } from "context/SidebarContext";
import useAsync from "hooks/useAsync";
import useFilter from "hooks/useFilter";
import PageTitle from "components/Typography/PageTitle";
import TableLoading from "components/preloader/TableLoading";
import NotFound from "components/table/NotFound";
import RentTable from "components/Rent/RentTable";
import ProductServices from "services/ProductServices";


const Rent = () => {
    const {
        lang,
        currentPage,
        handleChangePage,
        searchText,
        category,
        searchRef,
        handleSubmitForAll,
        sortedField,
        limitData, } = useContext(SidebarContext);

    const { data, loading } = useAsync(() =>
        ProductServices.getAllProducts({
            page: currentPage,
            limit: limitData,
            category: category,
            title: searchText,
            price: sortedField,
        })
    );
    // console.log('data',data)
    const [isCheck, setIsCheck] = useState([]);
    const { t } = useTranslation();

    const {
        serviceData,
        totalResults,
        resultsPerPage,
    } = useFilter(data?.products);

    return (
        <>
            <PageTitle>{t("ProductRent")}</PageTitle>


            <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
                <CardBody>
                    <form
                        onSubmit={handleSubmitForAll}
                        className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
                    >
                        <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">

                            <Input
                                ref={searchRef}
                                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                                type="search"
                                name="search"
                                placeholder={t("SearchProduct")}
                            />
                        </div>
                    </form>
                </CardBody>
            </Card>

            {loading ? (
                // <Loading loading={loading} />
                <TableLoading row={12} col={8} width={140} height={20} />
            ) : serviceData?.length !== 0 ? (
                <TableContainer className="mb-8">
                    <Table>
                        <TableHeader>
                            <tr>
                                <TableCell>STT</TableCell>
                                <TableCell>{t("ProductNameTbl")}</TableCell>
                                <TableCell>{t("MonthlyRent")}</TableCell>
                                <TableCell>{t("DepositCost")}</TableCell>
                                <TableCell>{t("Agree")}</TableCell>
                                <TableCell className="text-right">
                                    {t("CoupTblActions")}
                                </TableCell>
                            </tr>
                        </TableHeader>
                        <RentTable
                            lang={lang}
                            isCheck={isCheck}
                            products={data?.products}
                            setIsCheck={setIsCheck}
                        />
                    </Table>
                    <TableFooter>
                        <Pagination
                            totalResults={totalResults}
                            resultsPerPage={resultsPerPage}
                            onChange={handleChangePage}
                            label={t("TableNavigation")}
                        />
                    </TableFooter>
                </TableContainer>
            ) : (
                <NotFound title={t("SorryBlogNotFound")} />
            )}
        </>
    );
}

export default Rent