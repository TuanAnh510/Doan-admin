import {
    Button,
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
import { FiPlus } from "react-icons/fi";
import { useTranslation } from "react-i18next"
import { useContext, useState } from "react";

import useAsync from "hooks/useAsync";
import { SidebarContext } from "context/SidebarContext";

import useFilter from "hooks/useFilter";
import PageTitle from "components/Typography/PageTitle";
import NotFound from "components/table/NotFound";
import TableLoading from "components/preloader/TableLoading";
import CategoryBlogServices from "services/CategoryBlogServices";
import CategoryBlogTable from "components/categoryBlog/CategoryBlogTable";

const CategoryBlog = () => {
    const { toggleDrawer, lang } = useContext(SidebarContext);
    const { t } = useTranslation()
    const [isCheck, setIsCheck] = useState([]);
    const { data, loading } = useAsync(CategoryBlogServices.getAllCategoryBlog);

    const {
        handleSubmitCategoryBlog,
        categoryBlogRef,
        totalResults,
        resultsPerPage,
        dataTable,
        serviceData,
        handleChangePage,
    } = useFilter(data);


    return (
        <>
            <PageTitle>{t("CategoryBlog")}</PageTitle>

            <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
                <CardBody className="">
                    {/* <div className="flex md:flex-row flex-col gap-3 justify-end items-end"> */}
                    <form onSubmit={handleSubmitCategoryBlog} className="py-3  grid gap-4 lg:gap-6 xl:gap-6  xl:flex">
                        {/* </div> */}
                        <div className="flex justify-start w-1/2 xl:w-1/2 md:w-full">
                            {/* <UploadManyTwo
                                title="Categories"
                                exportData={data}
                                filename={filename}
                                isDisabled={isDisabled}
                                handleSelectFile={handleSelectFile}
                                handleUploadMultiple={handleUploadMultiple}
                                handleRemoveSelectFile={handleRemoveSelectFile}
                            /> */}
                        </div>

                        <div className="lg:flex  md:flex xl:justify-end xl:w-1/2  md:w-full md:justify-start flex-grow-0">

                            <div className="w-full md:w-48 lg:w-48 xl:w-48">
                                <Button onClick={toggleDrawer} className="rounded-md h-12 w-full">
                                    <span className="mr-2">
                                        <FiPlus />
                                    </span>

                                    {t("AddCategory")}
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardBody>
            </Card>
            <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
                <CardBody>
                    <form
                        onSubmit={handleSubmitCategoryBlog}
                        className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
                    >
                        <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                            <Input
                                ref={categoryBlogRef}
                                type="search"
                                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                                placeholder={t("SearchCategoryBlog")}
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
                                <TableCell>
                                    STT
                                </TableCell>
                                <TableCell>{t("Name")}</TableCell>

                                <TableCell className="text-right">{t("CoupTblActions")}</TableCell>
                            </tr>
                        </TableHeader>
                        <CategoryBlogTable lang={lang} isCheck={isCheck} categoryBlogs={dataTable} setIsCheck={setIsCheck} />
                    </Table>
                    <TableFooter>
                        <Pagination
                            totalResults={totalResults}
                            resultsPerPage={resultsPerPage}
                            onChange={handleChangePage}
                            label="Table navigation"
                        />
                    </TableFooter>
                </TableContainer>
            ) : (
                <NotFound title={t("SorryCategoryBlogNotFound")} />
            )}
        </>
    )

}

export default CategoryBlog