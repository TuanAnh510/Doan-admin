import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "context/SidebarContext";
import { notifyError, notifySuccess } from "utils/toast";
import RegionServices from "services/RegionServices";
import { useTranslation } from "react-i18next";
const useRegionSubmit = (id) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
  const [regioncost, setRegionCosts] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  function validateNumber(value) {
    return !isNaN(value);
  }

  const onSubmit = async (data) => {
    if (!validateNumber(data.regioncost)) {
      notifyError(t("ErrorRegionCosts"));
      return;
    }

    try {
      setIsSubmitting(true);
      const shippingData = {
        regionname: data.regionname,
        regioncost: data.regioncost,
      };
      if (id) {
        await RegionServices.updateRegion(id, shippingData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(t("UpdateRegionSuccess"));
        closeDrawer();
      } else {
        await RegionServices.addRegion(shippingData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(t("AddRegionSuccess"));
        closeDrawer();
      }
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err.message);
      setIsSubmitting(false);
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("regionname");
      setValue("regioncost");
      setRegionCosts(0);
      clearErrors("regionname");
      clearErrors("regioncost");
      return;
    }
    if (id) {
      (async () => {
        try {
          const res = await RegionServices.getShippingById(id);
          if (res) {
            setValue("regionname", res.regionname);
            setValue("regioncost", res.regioncost);
            // setDescription(res.description);
            // setCosts(res.costs);
            // setImageUrl(res.logo);
          }
        } catch (err) {
          notifyError(err ? err?.response?.data?.message : err.message);
        }
      })();
    }
  }, [id, setValue, isDrawerOpen, clearErrors]);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    setRegionCosts,
    regioncost,
  };
};

export default useRegionSubmit;
