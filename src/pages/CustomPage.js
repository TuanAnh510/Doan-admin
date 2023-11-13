import { Button, Select } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

//internal import
import Error from "components/form/Error";
import spinnerLoadingImage from "assets/img/spinner.gif";
import InputAreaTwo from "components/form/InputAreaTwo";
import SelectTimeZone from "components/form/SelectTimeZone";
import PageTitle from "components/Typography/PageTitle";
import useSettingSubmit from "hooks/useSettingSubmit";
import SelectCurrency from "components/form/SelectCurrency";
import SelectReceiptSize from "components/form/SelectPrintSize";
import UploaderLogo from "components/image-uploader/UploaderLogo";
import UploaderQR from "components/image-uploader/UploaderQR";
import useCustomPageSubmit from "hooks/useCustomPageSubmit";
const CustomPage = () => {
  const {
    errors,
    register,
    handleSubmit,
    onSubmit,
    isSave,
    isSubmitting,
    imageLogoUrl,
    setImageLogoUrl,
    imageQR,
    setImageQR,
  } = useCustomPageSubmit();

  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t("CustomPage")}</PageTitle>

      <div className="container p-6 mx-auto bg-white  dark:bg-gray-800 dark:text-gray-200 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 font-sans">
            <div className="col-span-12 md:col-span-12 lg:col-span-12 mr-3 ">
              <div className="lg:px-6 pt-4 lg:pl-40 lg:pr-40 md:pl-5 md:pr-5 flex-grow scrollbar-hide w-full max-h-full pb-0">
                <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                    {t("TitleSearchbar")}
                  </label>
                  <div className="sm:col-span-3">
                    <InputAreaTwo
                      register={register}
                      label={t("TitleSearchbar")}
                      name="titleSearchbar"
                      type="text"
                      placeholder={t("TitleSearchbar")}
                    />
                    <Error errorName={errors.titleSearchbar} pos />
                  </div>
                </div>

                <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                    {t("TitleSaleProduct")}
                  </label>
                  <div className="sm:col-span-3">
                    <InputAreaTwo
                      register={register}
                      label={t("TitleSaleProduct")}
                      name="titleSaleProduct"
                      type="text"
                      placeholder={t("TitleSaleProduct")}
                    />
                    <Error errorName={errors.titleSaleProduct} pos />
                  </div>
                </div>

                <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                    {t("TitlePopularProduct")}
                  </label>
                  <div className="sm:col-span-3">
                    <InputAreaTwo
                      register={register}
                      label={t("titlePopularProduct")}
                      name="titlePopularProduct"
                      type="text"
                      placeholder={t("TitlePopularProduct")}
                    />
                    <Error errorName={errors.titlePopularProduct} pos />
                  </div>
                </div>

                <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                    {t("TitleAllProduct")}
                  </label>
                  <div className="sm:col-span-3">
                    <InputAreaTwo
                      required
                      register={register}
                      label={t("TitleAllProduct")}
                      name="titleAllProduct"
                      type="text"
                      placeholder={t("TitleAllProduct")}
                    />
                    <Error errorName={errors.titleAllProduct} pos />
                  </div>
                </div>

                <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                    {t("TextitleProductRent")}
                  </label>
                  <div className="sm:col-span-3">
                    <InputAreaTwo
                      required
                      register={register}
                      label={t("TextitleProductRent")}
                      type="text"
                      name="titleProductRent"
                      placeholder={t("TitlePrTextitleProductRentoductRent")}
                    />
                    <Error errorName={errors.titleProductRent} pos />
                  </div>
                </div>

                <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                    {t("TitleProductSale")}
                  </label>
                  <div className="sm:col-span-3">
                    <InputAreaTwo
                      required
                      register={register}
                      label={t("TitleProductSale")}
                      name="titleProductSale"
                      type="text"
                      placeholder={t("TitleProductSale")}
                    />
                    <Error errorName={errors.titleProductSale} pos />
                  </div>
                </div>

                <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                    {t("TitleCoupon")}
                  </label>
                  <div className="sm:col-span-3">
                    <InputAreaTwo
                      required
                      register={register}
                      label={t("TitleCoupon")}
                      name="titleCoupon"
                      type="text"
                      placeholder={t("TitleCoupon")}
                    />
                    <Error errorName={errors.titleCoupon} pos />
                  </div>
                </div>

                <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                    {t("TitleWarranty")}
                  </label>
                  <div className="sm:col-span-3">
                    <InputAreaTwo
                      required
                      register={register}
                      label={t("TitleWarranty")}
                      name="titleWarranty"
                      type="text"
                      placeholder={t("TitleWarranty")}
                    />
                    <Error errorName={errors.titleWarranty} pos />
                  </div>
                </div>

                <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                    {t("PageHeaderBg")}
                  </label>
                  <div className=" sm:col-span-3">
                    <UploaderLogo
                      imageLogoUrl={imageLogoUrl}
                      setImageLogoUrl={setImageLogoUrl}
                      name="settingData"
                      folder="backgound"
                    />
                    <Error errorName={errors.imageLogoUrl} pos />
                  </div>
                </div>

                <div className="flex flex-row-reverse pb-6">
                  {isSubmitting ? (
                    <Button disabled={true} type="button" className="h-12">
                      <img
                        src={spinnerLoadingImage}
                        alt="Loading"
                        width={20}
                        height={10}
                      />{" "}
                      <span className="font-serif ml-2 font-light">
                        {t("Processing")}
                      </span>
                    </Button>
                  ) : (
                    <Button type="submit" className="h-12 px-8">
                      {" "}
                      {isSave ? "Save" : "Update"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default CustomPage;
