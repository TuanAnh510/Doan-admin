import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "context/SidebarContext";
import { notifyError, notifySuccess } from "utils/toast";
import ShippingServices from "services/ShippingServices";
import { useTranslation } from "react-i18next";
const useBlogSubmit = (id) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [costs, setCosts] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const shippingData = {
        transportunitname: data.transportunitname,
        logo: imageUrl,
        costs: data.costs,
        description: content,
      };
      if (id) {
        await ShippingServices.updateShipping(id, shippingData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(t("notifySuccessUpdate"));
        closeDrawer();
      } else {
        await ShippingServices.addShipping(shippingData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(t("notifySuccessAdd"));
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
      setValue("transportunitname");
      setValue("consts");
      setCosts(0);
      setImageUrl("");
      clearErrors("transportunitname");
      clearErrors("consts");
      return;
    }
    if (id) {
      (async () => {
        try {
          const res = await ShippingServices.getShippingById(id);
          if (res) {
            // console.log('res coupon', res);

            setValue("transportunitname", res?.transportunitname);
            setValue("costs", res?.costs);
            setContent(res?.description);
            setCosts(res?.costs);
            setImageUrl(res?.logo);
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
    setImageUrl,
    imageUrl,
    isSubmitting,
    setContent,
    setCosts,
    costs,
    content,
  };
};

export default useBlogSubmit;
