import DrawerButton from "components/form/DrawerButton";
import Error from "components/form/Error";
import InputValue from "components/form/InputValue";
import InputValueNotRequired from "components/form/InputValueNotRequired";
import LabelArea from "components/form/LabelArea";
import Title from "components/form/Title";
import useRentSubmit from "hooks/useRentSubmit";
import { t } from "i18next";
import { Scrollbars } from "react-custom-scrollbars-2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RentDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    setAgree,
    agree,
    currency,
  } = useRentSubmit(id);

  return (
    <>
      <div className="w-full relative  p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 ">
        {id ? (
          <Title
            title={t("UpdateRent")}
            description={t("UpdateRentDescriptionText")}
          />
        ) : (
          <Title
            title={t("UpdateRent")}
            description={t("UpdateRentDescriptionText")}
          />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("MonthlyRent")} />
              <div className="col-span-8 sm:col-span-4">
                <InputValueNotRequired
                  product
                  register={register}
                  label={t("MonthlyRent")}
                  name="monthlyrent"
                  type="number"
                  placeholder={t("MonthlyRent")}
                  currency={currency}
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("DepositCost")} />
              <div className="col-span-8 sm:col-span-4">
                <InputValueNotRequired
                  product
                  register={register}
                  label={t("DepositCost")}
                  name="depositcost"
                  type="number"
                  placeholder={t("DepositCost")}
                  currency={currency}
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Agree")} />
              <div className="col-span-8 sm:col-span-4">
                <ReactQuill theme="snow" value={agree} onChange={setAgree} />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Rent" isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  );
};

export default RentDrawer;
