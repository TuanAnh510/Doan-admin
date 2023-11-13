import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import DeleteModal from "components/modal/DeleteModal";
import DeleteButton from "components/table/DeleteButton";
import useToggleDrawer from "hooks/useToggleDrawer";
import React from "react";
import { showDateTimeFormat } from "utils/dateFormate";

const BlogCommentTable = ({
  dataTable,
  isCheck,
  setIsCheck,
  globalSetting,
  idBlog,
}) => {
  const { title, serviceId, handleModalOpen } = useToggleDrawer();

  return (
    <>
      {isCheck.length < 1 && (
        <DeleteModal id={serviceId} title={title} idBlog={idBlog} />
      )}

      <TableBody>
        {dataTable?.map((comment, index) => (
          <TableRow key={index + 1}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="font-semibold uppercase text-xs">
              {comment?._id?.substring(20, 24)}
            </TableCell>

            <TableCell className="font-medium text-sm">
              {comment?.username}
            </TableCell>
            <TableCell className="font-medium text-sm">
              {comment?.email}
            </TableCell>
            <TableCell className="font-medium text-sm">
              {comment?.description?.slice(0, 30)}
            </TableCell>
            <TableCell className="font-medium text-sm">
              <span className="text-sm">
                {showDateTimeFormat(
                  comment?.created,
                  globalSetting?.default_date_format,
                  "HH:mm"
                )}
              </span>
            </TableCell>

            <TableCell>
              <DeleteButton
                id={comment._id}
                isCheck={isCheck}
                setIsCheck={setIsCheck}
                handleModalOpen={handleModalOpen}
                title={comment.username}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default BlogCommentTable;
