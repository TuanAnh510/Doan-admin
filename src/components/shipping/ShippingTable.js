import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";

import useToggleDrawer from "hooks/useToggleDrawer";
import DeleteModal from "components/modal/DeleteModal";
import MainDrawer from "components/drawer/MainDrawer";
import EditDeleteButton from "components/table/EditDeleteButton";
import { showingTranslateValue } from "utils/translate";
import ShippingDrawer from "components/drawer/ShippingDrawer";
import SettingServices from "services/SettingServices";
import useAsync from "hooks/useAsync";

const ShippingTable = ({ lang, isCheck, shippings }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);

  const currency = globalSetting?.default_currency || "VND";

  return (
    <>
      {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}

      {isCheck.length < 2 && (
        <MainDrawer>
          <ShippingDrawer id={serviceId} />
        </MainDrawer>
      )}
      <TableBody>
        {shippings?.map((shipping, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              {" "}
              <span className="text-sm"> {i + 1}</span>{" "}
            </TableCell>
            <TableCell>
              {" "}
              <Avatar
                className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                src={shipping.logo}
                alt="product"
              />
            </TableCell>
            <TableCell>
              {" "}
              <span className="text-sm">
                {" "}
                {shipping.transportunitname?.slice(0, 30)}
              </span>{" "}
            </TableCell>
            <TableCell>
              {" "}
              <span className="text-sm font-semibold">
                {" "}
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: currency,
                }).format(Number(shipping.costs))}
              </span>{" "}
            </TableCell>
            <TableCell>
              {" "}
              <span
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: shipping.description }}
              ></span>{" "}
            </TableCell>
            {/* <TableCell>
              <Link
                to={`/shipping/${shipping?._id}`}
                className="flex justify-center text-gray-400 hover:text-blue-600"
              >
                <Tooltip
                  id="view"
                  Icon={FiZoomIn}
                  title={t("DetailsTbl")}
                  bgColor="blue"
                />
              </Link>
            </TableCell> */}

            <TableCell>
              <EditDeleteButton
                id={shipping?._id}
                isCheck={isCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={showingTranslateValue(shipping?.transportunitname, lang)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default ShippingTable;
