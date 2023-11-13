import { TableBody, TableCell, TableRow } from "@windmill/react-ui";

import useToggleDrawer from "hooks/useToggleDrawer";
import DeleteModal from "components/modal/DeleteModal";
import MainDrawer from "components/drawer/MainDrawer";
import EditDeleteButton from "components/table/EditDeleteButton";
import { showingTranslateValue } from "utils/translate";
import RegionDrawer from "components/drawer/RegionDrawer";
import SettingServices from "services/SettingServices";
import useAsync from "hooks/useAsync";

const RegionTable = ({ lang, isCheck, regions }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);

  const currency = globalSetting?.default_currency || "VND";

  return (
    <>
      {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}

      {isCheck.length < 2 && (
        <MainDrawer>
          <RegionDrawer id={serviceId} />
        </MainDrawer>
      )}
      <TableBody>
        {regions?.map((region, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              {" "}
              <span className="text-sm"> {i + 1}</span>{" "}
            </TableCell>
            <TableCell>
              {" "}
              <span className="text-sm"> {region.regionname}</span>{" "}
            </TableCell>
            <TableCell>
              {" "}
              <span className="text-sm font-semibold ">
                {" "}
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: currency,
                }).format(Number(region.regioncost))}
              </span>{" "}
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={region?._id}
                isCheck={isCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={showingTranslateValue(region?.regionname, lang)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default RegionTable;
