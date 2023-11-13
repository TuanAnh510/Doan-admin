import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "context/SidebarContext";
import { notifyError, notifySuccess } from "utils/toast";
import CategoryBlogServices from "services/CategoryBlogServices";
import { useTranslation } from "react-i18next";
const useCategoryBlogSubmit = (id) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
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
      const ctbData = {
        title: data.title,
      };

      if (id) {
        await CategoryBlogServices.updateCategoryBlog(id, ctbData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(t("notifySuccessCateUpdate"));
        closeDrawer();
      } else {
        await CategoryBlogServices.addCategoryBlog(ctbData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(t("notifySuccessCateAdd"));
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
      setValue("title");
      clearErrors("title");
      return;
    }
    if (id) {
      (async () => {
        try {
          const res = await CategoryBlogServices.getCategoryBlogById(id);
          if (res) {
            setValue("title", res.title);
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
  };
};

export default useCategoryBlogSubmit;
