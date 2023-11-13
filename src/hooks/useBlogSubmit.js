import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "context/SidebarContext";
import { notifyError, notifySuccess } from "utils/toast";
import BlogServices from "services/BlogServices";
import { useTranslation } from "react-i18next";
const useBlogSubmit = (id) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
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
      const blogData = {
        title: data.title,
        image: imageUrl,
        description: description,
        category: data.cateBlog,
      };
      if (id) {
        await BlogServices.updateBlog(id, blogData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(t("Cập nhật tin tức thành công"));
        closeDrawer();
      } else {
        await BlogServices.addBlog(blogData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(t("Thêm tin tức thành công"));
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
      setValue("cateBlog");
      setDescription("");
      setImageUrl("");
      clearErrors("title");
      clearErrors("cateBlog");
      return;
    }
    if (id) {
      (async () => {
        try {
          const res = await BlogServices.getBlogById(id);
          if (res) {
            // console.log('res coupon', res);

            setValue("title", res.title);
            setValue("cateBlog", res.category._id);
            setDescription(res.description);
            setImageUrl(res.image);
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
    setDescription,
    description,
  };
};

export default useBlogSubmit;
