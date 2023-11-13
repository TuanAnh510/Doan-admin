import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";

import useToggleDrawer from "hooks/useToggleDrawer";
import DeleteModal from "components/modal/DeleteModal";
import MainDrawer from "components/drawer/MainDrawer";
import EditDeleteButton from "components/table/EditDeleteButton";
import { showingTranslateValue } from "utils/translate";
import BlogDrawer from "components/drawer/BlogDrawer";
import Tooltip from "components/tooltip/Tooltip";
import { t } from "i18next";
import { FiEdit, FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import ShowHideButton from "components/table/ShowHideButton";

const BlogTable = ({ lang, isCheck, blogs }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}

      {isCheck.length < 2 && (
        <MainDrawer>
          <BlogDrawer id={serviceId} />
        </MainDrawer>
      )}
      <TableBody>
        {blogs?.map((blog, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              {" "}
              <span className="text-sm"> {i + 1}</span>{" "}
            </TableCell>
            <TableCell>
              {" "}
              <Avatar
                className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                src={blog.image}
                alt="product"
              />
            </TableCell>
            <TableCell>
              {" "}
              <span className="text-sm"> {blog.title?.slice(0, 30)}</span>{" "}
            </TableCell>

            <TableCell className="text-center">
              <ShowHideButton id={blog._id} status={blog.status} />
            </TableCell>
            
            <TableCell>
              <Link
                to={`/blogs/${blog?._id}`}
                className="flex justify-center text-gray-400 hover:text-blue-600"
              >
                <Tooltip
                  id="view"
                  Icon={FiZoomIn}
                  title={t("DetailsTbl")}
                  bgColor="blue"
                />
              </Link>
            </TableCell>
            {/* <TableCell>
                            {" "}
                            <span className="text-sm">  <div dangerouslySetInnerHTML={{ __html: blog.description }} /></span>{" "}
                        </TableCell> */}
            <TableCell>
              {" "}
              <span className="text-sm"> {blog.category?.title}</span>{" "}
            </TableCell>

            <TableCell className="flex justify-center">
              <Link
                to={`/comment/${blog._id}`}
                className="p-2 cursor-pointer text-gray-400 hover:text-blue-600 focus:outline-none"
              >
                <Tooltip
                  id="edit values"
                  Icon={FiEdit}
                  title={t("View")}
                  bgColor="#10B981"
                />
              </Link>
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={blog?._id}
                isCheck={isCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={showingTranslateValue(blog?.title, lang)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default BlogTable;
