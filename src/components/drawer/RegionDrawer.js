import DrawerButton from "components/form/DrawerButton";
import Error from "components/form/Error";
import InputArea from "components/form/InputArea";
import InputValue from "components/form/InputValue";
import LabelArea from "components/form/LabelArea";
import Title from "components/form/Title";
import useRegionSubmit from "hooks/useRegionSubmit";
import { t } from "i18next";
import { Scrollbars } from "react-custom-scrollbars-2";

const ShippingDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    setRegionCosts,
  } = useRegionSubmit(id);
  return (
    <>
      <div className="w-full relative  p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 ">
        {id ? (
          <Title
            title={t("UpdateRegion")}
            description={t("UpdateRegionText")}
          />
        ) : (
          <Title title={t("AddRegion")} description={t("AddRegionText")} />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("RegionName")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="RegionName"
                  name="regionname"
                  type="text"
                  placeholder={t("RegionCosts")}
                />
                <Error errorName={errors.regionname} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("RegionCosts")} />
              <div className="col-span-8 sm:col-span-4">
                <InputValue
                  register={register}
                  name="regioncost"
                  setRegionCosts={setRegionCosts}
                  placeholder={t("RegionCosts")}
                />
                <Error errorName={errors.regioncost} />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Region" isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  );
};

export default ShippingDrawer;
