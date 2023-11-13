import React from "react";
import {
  TableCell,
  TableBody,
  TableRow,
} from "@windmill/react-ui";
import DeleteButton from "components/table/DeleteButton";
import dayjs from "dayjs";
import useToggleDrawer from "hooks/useToggleDrawer";
import DeleteModal from "components/modal/DeleteModal";

const ProductRating = ({
  dataTable,
  isCheck,
  setIsCheck,
  idProduct,
}) => {
  const { title, serviceId, handleModalOpen } = useToggleDrawer();

  return (
    <>
      <DeleteModal id={serviceId} title={title} idProduct={idProduct} />

      <TableBody>
        {dataTable?.map((comment, index) => (
          <TableRow key={index + 1}>
            <TableCell>{index + 1}</TableCell>

            <TableCell className="font-medium text-sm">
              {comment?.ratingby?.name}
            </TableCell>
            <TableCell className="font-medium text-sm">
              {comment.comment}
            </TableCell>
            <TableCell className="font-medium text-sm">
              <span className="text-sm">
                {dayjs(comment?.createdat).format("DD/MM/YYYY HH:mm")}
              </span>
            </TableCell>
            <TableCell>
              <DeleteButton
                id={comment._id}
                isCheck={isCheck}
                setIsCheck={setIsCheck}
                handleModalOpen={handleModalOpen}
                title={comment?.ratingby?.name}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default ProductRating;
