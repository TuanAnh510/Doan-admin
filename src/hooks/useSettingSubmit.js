 import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//internal import
import { SidebarContext } from "context/SidebarContext";
import SettingServices from "services/SettingServices";
import { notifyError, notifySuccess } from "utils/toast";

const useSettingSubmit = (id) => {
  const { setIsUpdate } = useContext(SidebarContext);
  const [isSave, setIsSave] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionpolicy, setDescriptionPolicy] = useState("");
  const [imageBannerUrl, setImageBannerUrl] = useState([]);
  const [imageLogoUrl, setImageLogoUrl] = useState("");
  const [imageIntroUrl, setImageIntroUrl] = useState("");
  const [imageQR, setImageQR] = useState("");
  const [content, setContent] = useState("");

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
        name: "globalSetting",
        setting: {
          number_of_image_per_product: data.number_of_image_per_product,
          shop_name: data.shop_name,
          address: data.address,
          company_name: data.company_name,
          vat_number: data.vat_number,
          post_code: data.post_code,
          contact: data.contact,
          email: data.email,
          website: data.website,
          receipt_size: data.receipt_size,
          default_currency: data.default_currency,
          default_time_zone: data.default_time_zone,
          default_date_format: data.default_date_format,
        },
        aboutus: {
          anoutusdescription: description,
          aboutusimage: imageUrl,
        },
        introduction: {
          introductiondescription: content,
          introductionimage: imageIntroUrl,
        },
        privacypolicy: descriptionpolicy,
        bannerimage: imageBannerUrl,
        logoweb: imageLogoUrl,
        qrmomoimage: imageQR,
        socialnetwork: {
          facebooklink: data.facebooklink,
          instagramlink: data.instagramlink,
          youtubelink: data.youtubelink,
        },
      };

      if (!isSave) {
        await SettingServices.updateGlobalSetting(settingData);
        setIsUpdate(true);
        setIsSubmitting(false);
        window.location.reload();
        notifySuccess("Cập nhật cài đặt thành công!");
      } else {
        await SettingServices.addGlobalSetting(settingData);
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
        const res = await SettingServices.getGlobalSetting();
        if (res) {
          setIsSave(false);
          setValue(
            "number_of_image_per_product",
            res.number_of_image_per_product
          );

          setValue("shop_name", res.shop_name);
          setValue("address", res.address);
          setValue("company_name", res.company_name);
          setValue("vat_number", res.vat_number);
          setValue("post_code", res.post_code);
          setValue("contact", res.contact);
          setValue("email", res.email);
          setValue("website", res.website);
          setValue("receipt_size", res.receipt_size);
          setValue("default_currency", res.default_currency);
          setValue("default_time_zone", res?.default_time_zone);
          setValue("default_date_format", res?.default_date_format);
          setValue("facebooklink", res?.socialnetwork.facebooklink);
          setValue("instagramlink", res?.socialnetwork.instagramlink);
          setValue("youtubelink", res?.socialnetwork.youtubelink);
          setContent(res?.introduction.introductiondescription);
          setImageIntroUrl(res?.introduction.introductionimage);
          setImageUrl(res?.aboutus.aboutusimage);
          setDescription(res?.aboutus.anoutusdescription);
          setDescriptionPolicy(res?.privacypolicy);
          setImageBannerUrl(res?.bannerimage);
          setImageLogoUrl(res?.logoweb);
          setImageQR(res?.qrmomoimage);
        }
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
    imageUrl,
    setImageUrl,
    imageBannerUrl,
    setImageBannerUrl,
    imageLogoUrl,
    setImageLogoUrl,
    imageIntroUrl,
    setImageIntroUrl,
    imageQR,
    setImageQR,
    content,
    setContent,
    description,
    setDescription,
    setDescriptionPolicy,
    descriptionpolicy,
    isSave,
    isSubmitting,
  };
};

export default useSettingSubmit;
