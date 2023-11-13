import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { AdminContext } from "context/AdminContext";
import AdminServices from "services/AdminServices";
import { notifyError, notifySuccess } from "utils/toast";
import { useTranslation } from "react-i18next";
const useLoginSubmit = () => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AdminContext);
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ name, email, verifyEmail, password, role }) => {
    setLoading(true);
    const cookieTimeOut = 0.5;

    if (location.pathname === "/login") {
      AdminServices.loginAdmin({ email, password })
        .then((res) => {
          if (res) {
            if (res.status === "Active") {
              setLoading(false);
              notifySuccess(t("notifySuccessLogin"));
              dispatch({ type: "USER_LOGIN", payload: res });
              Cookies.set("adminInfo", JSON.stringify(res), {
                expires: cookieTimeOut,
              });
              history.replace("/");
            } else {
              setLoading(false);
              notifyError(t("notifyErrLogin"));
            }
          }
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          setLoading(false);
        });
    }

    if (location.pathname === "/signup") {
      AdminServices.registerAdmin({ name, email, password, role })
        .then((res) => {
          if (res) {
            setLoading(false);
            notifySuccess(t("notifySuccessReg"));
            dispatch({ type: "USER_LOGIN", payload: res });
            Cookies.set("adminInfo", JSON.stringify(res), {
              expires: cookieTimeOut,
            });
            history.replace("/");
          }
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          setLoading(false);
        });
    }

    if (location.pathname === "/forgot-password") {
      AdminServices.forgetPassword({ verifyEmail })
        .then((res) => {
          setLoading(false);
          if (res.message === "Admin/Staff Not found with this email!")
            notifySuccess(
              "Không tìm thấy Admin/Nhân viên với địa chỉ email này!"
            );
        })
        .catch((err) => {
          setLoading(false);
          notifyError(err ? err.response.data.message : err.message);
        });
    }
  };
  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    loading,
  };
};

export default useLoginSubmit;
