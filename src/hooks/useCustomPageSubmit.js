import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//internal import
import { SidebarContext } from "context/SidebarContext";
import CustomPageService from "services/CustomPageService";
import { notifyError, notifySuccess } from "utils/toast";

const useCustomPageSubmit = (id) => {
  const { setIsUpdate } = useContext(SidebarContext);
  const [isSave, setIsSave] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageLogoUrl, setImageLogoUrl] = useState("");
  const [content, setContent] = useState("");
  const [titleShip, setTitleShip] = useState("");
  const [titleWarranty, setTitleWarranty] = useState("");
  const [titleGenuine, setTitleGenuine] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const settingData = {
        name: "customWebsite",
        titleText: {
          titleSaleProduct: data.titleSaleProduct,
          titlePopularProduct: data.titlePopularProduct,
          titleSearchbar: data.titleSearchbar,
        },

        titlePages: {
          titleAllProduct: data.titleAllProduct,
          titleProductRent: data.titleProductRent,
          titleProductSale: data.titleProductSale,
          titleCoupon: data.titleCoupon,
          titleWarranty: data.titleWarranty,
        },

        slogan: {
          sloganShipping: titleShip,
          sloganWarranty: titleWarranty,
          sloganSupport: content,
          sloganGenuineProduct: titleGenuine,
        },

        backgoundImage: imageLogoUrl,
      };

      if (!isSave) {
        await CustomPageService.updateCustomPage(settingData);
        setIsUpdate(true);
        setIsSubmitting(false);
        window.location.reload();
        notifySuccess("Thay đổi cài đặt thành công!");
      } else {
        await CustomPageService.addCustomPage(settingData);
        setIsUpdate(true);
        setIsSubmitting(false);
        window.location.reload();
        notifySuccess("Thêm cài đặt thành công!");
      }
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err.message);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await CustomPageService.getCustomPage();
        console.log(res);
        if (res) {
          setIsSave(false);
        }
        setValue("titleSaleProduct", res?.titleText.titleSaleProduct);
        setValue("titlePopularProduct", res?.titleText.titlePopularProduct);
        setValue("titleSearchbar", res?.titleText.titleSearchbar);
        setValue("titleAllProduct", res?.titlePages.titleAllProduct);
        setValue("titleProductRent", res?.titlePages.titleProductRent);
        setValue("titleProductSale", res?.titlePages.titleProductSale);
        setValue("titleCoupon", res?.titlePages.titleCoupon);
        setValue("titleWarranty", res?.titlePages.titleWarranty);
        setImageLogoUrl(res?.backgoundImage);
        setTitleShip(res?.slogan.sloganShipping);
        setTitleWarranty(res?.slogan.sloganWarranty);
        setContent(res?.slogan.sloganSupport);
        setTitleGenuine(res.slogan.sloganGenuineProduct);
        setImageLogoUrl(res?.backgoundImage);
      } catch (err) {
        notifyError(err ? err?.response?.data?.message : err.message);
      }
    })();
  }, [setValue]);

  return {
    errors,
    register,
    handleSubmit,
    onSubmit,
    isSave,
    isSubmitting,
    content,
    setContent,
    titleShip,
    setTitleShip,
    titleWarranty,
    setTitleWarranty,
    titleGenuine,
    setTitleGenuine,
    imageLogoUrl,
    setImageLogoUrl,
  };
};

export default useCustomPageSubmit;
