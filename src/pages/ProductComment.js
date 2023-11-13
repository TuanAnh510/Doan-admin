import PageTitle from "components/Typography/PageTitle";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronRight } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import {
  Table,
  TableCell,
  TableContainer,
  TableHeader,
} from "@windmill/react-ui";
import useFilter from "hooks/useFilter";
import useAsync from "hooks/useAsync";
import ProductServices from "services/ProductServices";
import ProductRating from "components/product/ProductRating";

const ProductComment = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const { data } = useAsync(() => ProductServices.getProductById(id));

  const {
    dataTable,
    globalSetting,
  } = useFilter(data?.ratings);

  const [isCheck, setIsCheck] = useState([]);

  return (
    <div>
      <PageTitle>{t("DetailsBlog")}</PageTitle>

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

            <li className="text-sm pl-1 font-semibold  ">alo</li>
          </span>
        </ol>
      </div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>STT</TableCell>
              <TableCell>{t("Name")}</TableCell>
              <TableCell>{t("Description")}</TableCell>
              <TableCell>{t("TimeComment")}</TableCell>
              <TableCell className="text-right">{t("Actions")}</TableCell>
            </tr>
          </TableHeader>
          <ProductRating
            idProduct={data._id}
            dataTable={dataTable}
            isCheck={isCheck}
            setIsCheck={setIsCheck}
            globalSetting={globalSetting}
          />
        </Table>

        {/* <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={handleChangePage}
            label="Table navigation"
          />
        </TableFooter> */}
      </TableContainer>
    </div>
  );
};

export default ProductComment;
