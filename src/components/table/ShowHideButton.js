import React, { useContext } from "react";
import Switch from "react-switch";
import { useLocation } from "react-router-dom";

//internal import
import { SidebarContext } from "context/SidebarContext";
import AttributeServices from "services/AttributeServices";
import CategoryServices from "services/CategoryServices";
import CouponServices from "services/CouponServices";
import CurrencyServices from "services/CurrencyServices";
import LanguageServices from "services/LanguageServices";
import ProductServices from "services/ProductServices";
import { notifyError, notifySuccess } from "utils/toast";
import BlogServices from "services/BlogServices";

const ShowHideButton = ({ id, status, category, currencyStatusName }) => {
  // console.log('from staf')
  const location = useLocation();
  const { setIsUpdate } = useContext(SidebarContext);
  //  console.log('coupns')
  const handleChangeStatus = async (id) => {
    try {
      let newStatus;
      if (status === "show") {
        newStatus = "hide";
      } else {
        newStatus = "show";
      }

      if (location.pathname === "/categories" || category) {
        await CategoryServices.updateStatus(id, {
          status: newStatus,
        });
        setIsUpdate(true);
        notifySuccess("Cập nhật trạng thái thành công");
      }

      if (location.pathname === "/products") {
        await ProductServices.updateStatus(id, {
          status: newStatus,
        });
        setIsUpdate(true);
        notifySuccess("Cập nhật thành công!");
      }

      if (location.pathname === "/languages") {
        await LanguageServices.updateStatus(id, {
          status: newStatus,
        });
        setIsUpdate(true);
        notifySuccess("Cập nhật thành công!");
      }
      if (location.pathname === "/currencies") {
        if (currencyStatusName === "status") {
          await CurrencyServices.updateEnabledStatus(id, {
            status: newStatus,
          });
          setIsUpdate(true);
          notifySuccess("Cập nhật thành công!");
        } else {
          await CurrencyServices.updateLiveExchangeRateStatus(id, {
            live_exchange_rates: newStatus,
          });
          setIsUpdate(true);
          notifySuccess("Cập nhật thành công!");
        }
      }

      if (location.pathname === "/attributes") {
        await AttributeServices.updateStatus(id, {
          status: newStatus,
        });
        setIsUpdate(true);
        notifySuccess("Cập nhật thành công!");
      }

      if (
        location.pathname === `/attributes/${location.pathname.split("/")[2]}`
      ) {
        await AttributeServices.updateChildStatus(id, {
          status: newStatus,
        });
        setIsUpdate(true);
        notifySuccess("Cập nhật thành công!");
      }

      if (location.pathname === "/coupons") {
        // console.log('coupns',id)
        await CouponServices.updateStatus(id, {
          status: newStatus,
        });
        setIsUpdate(true);
        notifySuccess("Cập nhật thành công!");
      }

      if (location.pathname === "/blogs") {
        // console.log('coupns',id)
        await BlogServices.updateStatus(id, {
          status: newStatus,
        });
        setIsUpdate(true);
        notifySuccess("Cập nhật thành công!");
      }

      if (location.pathname === "/our-staff") {
        // console.log('coupns',id)
        await CouponServices.updateStaffStatus(id, {
          status: newStatus,
        });
        setIsUpdate(true);
        notifySuccess("Cập nhật thành công!");
      }
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err?.message);
    }
  };

  return (
    <Switch
      onChange={() => handleChangeStatus(id)}
      checked={status === "show" ? true : false}
      className="react-switch md:ml-0"
      uncheckedIcon={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            width: 120,
            fontSize: 14,
            color: "white",
            paddingRight: 22,
            paddingTop: 1,
          }}
        ></div>
      }
      width={30}
      height={15}
      handleDiameter={13}
      offColor="#E53E3E"
      onColor={"#2F855A"}
      checkedIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 73,
            height: "100%",
            fontSize: 14,
            color: "white",
            paddingLeft: 20,
            paddingTop: 1,
          }}
        ></div>
      }
    />
  );
};

export default ShowHideButton;
