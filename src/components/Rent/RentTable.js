import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";

import useToggleDrawer from "hooks/useToggleDrawer";
import DeleteModal from "components/modal/DeleteModal";
import MainDrawer from "components/drawer/MainDrawer";
import EditDeleteButton from "components/table/EditDeleteButton";
import { showingTranslateValue } from "utils/translate";

import RentDrawer from "components/drawer/RentDrawer";
import EditButton from "components/table/EditButton";

const RentTable = ({ lang, isCheck, products }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      {isCheck.length < 2 && (
        <MainDrawer>
          <RentDrawer id={serviceId} />
        </MainDrawer>
      )}
      <TableBody>
        {products?.map((product, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              {" "}
              <span className="text-sm"> {i + 1}</span>{" "}
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                {product?.image[0] ? (
                  <Avatar
                    className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                    src={product?.image[0]}
                    alt="product"
                  />
                ) : (
                  <Avatar
                    src={`https://res.cloudinary.com/dvknvgyf8/image/upload/v1687664990/placeholder_kvepfp_zhlieo.png`}
                    alt="product"
                  />
                )}
                <div>
                  <h2 className="text-sm font-medium">
                    {showingTranslateValue(product?.title, lang)?.substring(
                      0,
                      10
                    )}
                  </h2>
                </div>
              </div>
            </TableCell>

            <TableCell>
              {" "}
              <span className="text-sm">
                {" "}
                {product?.rent?.monthlyrent}
              </span>{" "}
            </TableCell>

            <TableCell>
              {" "}
              <span className="text-sm">
                {" "}
                {product?.rent?.depositcost}
              </span>{" "}
            </TableCell>
            <TableCell>
              {" "}
              <div
                dangerouslySetInnerHTML={{ __html: product?.rent?.agree }}
              />{" "}
            </TableCell>

            <TableCell>
              <EditButton
                id={product?._id}
                handleUpdate={handleUpdate}

              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default RentTable;
