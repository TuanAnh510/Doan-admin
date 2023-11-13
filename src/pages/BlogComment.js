import {
    Pagination,
    Table,
    TableCell,
    TableContainer,
    TableFooter,
    TableHeader,
} from "@windmill/react-ui";
import BlogCommentTable from "components/blog/BlogCommentTable";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronRight } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import BlogServices from "services/BlogServices";
import Loading from "../components/preloader/Loading";
import NotFound from "../components/table/NotFound";
import PageTitle from "../components/Typography/PageTitle";
import useAsync from "../hooks/useAsync";
import useFilter from "../hooks/useFilter";

const BlogComment = () => {
    let { id } = useParams();
    const { t } = useTranslation()

    const { data, loading } = useAsync(() =>
        BlogServices.getBlogById(id)
    );

        const {
            totalResults,
            resultsPerPage,
            dataTable,
            serviceData,
            handleChangePage,
            globalSetting,
        } = useFilter(data?.comments);

        // react hook
        const [isCheck, setIsCheck] = useState([]);

    return (
        <>
            <PageTitle>{t("Comments")}</PageTitle>


            <div className="flex items-center pb-4">
                <ol className="flex items-center w-full overflow-hidden font-serif">
                    <li className="text-sm pr-1 transition duration-200 ease-in cursor-pointer hover:text-emerald-500 font-semibold">
                        <Link className="text-blue-700" to={`/blogs`}>
                            {t("Blog")}
                        </Link>
                    </li>

                    <span className="flex items-center font-serif">
                        <li className="text-sm mt-[1px]">
                            {" "}
                            <FiChevronRight />{" "}
                        </li>

                        <li className="text-sm pl-1 font-semibold ">
                            {!loading && data.title}
                        </li>
                    </span>
                </ol>
            </div>


            {loading ? (
                <Loading loading={loading} />
            ) : serviceData?.length !== 0 ? (
                <TableContainer className="mb-8">
                    <Table>
                        <TableHeader>
                            <tr>
                                <TableCell>
                                    STT
                                </TableCell>
                                <TableCell>Id</TableCell>
                                <TableCell>{t("Name")}</TableCell>
                                <TableCell>{t("Email")}</TableCell>
                                <TableCell>{t("Description")}</TableCell>
                                <TableCell>{t("TimeComment")}</TableCell>
                                <TableCell className="text-right">{t("Actions")}</TableCell>
                            </tr>
                        </TableHeader>

                        <BlogCommentTable
                            idBlog={data._id}
                            dataTable={dataTable}
                            isCheck={isCheck}
                            setIsCheck={setIsCheck}
                            globalSetting={globalSetting}
                        />
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
                <NotFound title={t("SorryCommentNotFound")} />
            )}
        </>
    );
};

export default BlogComment;
