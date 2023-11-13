
import {
    TableBody,
    TableCell,
    TableRow,
} from "@windmill/react-ui";

import useToggleDrawer from "hooks/useToggleDrawer";
import DeleteModal from "components/modal/DeleteModal";
import MainDrawer from "components/drawer/MainDrawer";
import EditDeleteButton from "components/table/EditDeleteButton";
import { showingTranslateValue } from "utils/translate";
import CategoryBlogDrawer from "components/drawer/CategoryBlogDrawer";

const CategoryBlogTable = ({ lang, isCheck, categoryBlogs, setIsCheck }) => {

    const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

    return (
        <>
            {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}

            {isCheck.length < 2 && (
                <MainDrawer>
                    <CategoryBlogDrawer id={serviceId} />
                </MainDrawer>
            )}

            <TableBody>
                {categoryBlogs?.map((ctb, i) => (
                    <TableRow key={i + 1}>
                        <TableCell>
                            {" "}
                            <span className="text-sm"> {i + 1}</span>{" "}
                        </TableCell>

                        <TableCell>
                            {" "}
                            <span className="text-sm"> {ctb.title}</span>{" "}
                        </TableCell>

                        <TableCell>
                            <EditDeleteButton
                                id={ctb?._id}
                                isCheck={isCheck}
                                handleUpdate={handleUpdate}
                                handleModalOpen={handleModalOpen}
                                title={showingTranslateValue(ctb?.title, lang)}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>
    );
};

export default CategoryBlogTable;
