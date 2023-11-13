import { Button } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

//internal import
import Error from "components/form/Error";
import spinnerLoadingImage from "assets/img/spinner.gif";
import PageTitle from "components/Typography/PageTitle";
import useSettingSubmit from "hooks/useSettingSubmit";
import UploaderBanner from "components/image-uploader/UploaderBanner";
const PromotionBanner = () => {
  const {
    errors,
    handleSubmit,
    onSubmit,
    isSave,
    isSubmitting,
    imageBannerUrl,
    setImageBannerUrl,
  } = useSettingSubmit();

  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t("PromotionBanner")}</PageTitle>

      <div className="container p-6 mx-auto bg-white  dark:bg-gray-800 dark:text-gray-200 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 font-sans">
            <div className="col-span-12 md:col-span-12 lg:col-span-12 mr-3 ">
              <div className="lg:px-6 pt-4 lg:pl-40 lg:pr-40 md:pl-5 md:pr-5 flex-grow scrollbar-hide w-full max-h-full pb-0">
                <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                    {t("PromotionBanner")}
                  </label>
                  <div className=" sm:col-span-3">
                    <UploaderBanner
                      banner
                      imageBannerUrl={imageBannerUrl}
                      setImageBannerUrl={setImageBannerUrl}
                      name="settingData"
                      folder="banner"
                    />
                    <Error errorName={errors.imageBannerUrl} pos />
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
export default PromotionBanner;
