import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody, Input } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import useStaffSubmit from "hooks/useStaffSubmit";
import Title from "components/form/Title";
import LabelArea from "components/form/LabelArea";
import Uploader from "components/image-uploader/Uploader";
import InputArea from "components/form/InputArea";
import Error from "components/form/Error";
import DrawerButton from "components/form/DrawerButton";

const StaffDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    selectedDate,
    setSelectedDate,
    handleSelectLanguage,
  } = useStaffSubmit(id);
  const { t } = useTranslation();

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("UpdateStaff")}
            description={t("UpdateStaffdescription")}
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("AddStaffTitle")}
            description={t("AddStaffdescription")}
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("StaffImage")} />
                  <div className="col-span-8 sm:col-span-4">
                    <Uploader
                      imageUrl={imageUrl}
                      setImageUrl={setImageUrl}
                      folder="admin"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("StaffName")} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={t("StaffName")}
                      name="name"
                      type="text"
                      placeholder={t("StaffNamePlaceholder")}
                    />
                    <Error errorName={errors.name} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Email" />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label="Email"
                      name="email"
                      type="text"
                      pattern={
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                      }
                      placeholder="Email"
                    />
                    <Error errorName={errors.email} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("StaffPassword")} />
                  <div className="col-span-8 sm:col-span-4">
                    {id ? (
                      <InputArea
                        required
                        register={register}
                        label={t("StaffPassword")}
                        name="password"
                        type="password"
                        autocomplete="new-password"
                        placeholder={t("StaffPassword")}
                      />
                    ) : (
                      <InputArea
                        register={register}
                        label={t("StaffPassword")}
                        name="password"
                        type="password"
                        autocomplete="new-password"
                        placeholder={t("StaffPassword")}
                      />
                    )}

                    <Error errorName={errors.password} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("StaffContactNumber")} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={t("StaffContactNumber")}
                      name="phone"
                      pattern={/^[+]?\d*$/}
                      minLength={6}
                      maxLength={15}
                      type="text"
                      placeholder={t("StaffContactNumber")}
                    />
                    <Error errorName={errors.phone} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("StaffJoiningDate")} />
                  <div className="col-span-8 sm:col-span-4">
                    <Input
                      onChange={(e) => setSelectedDate(e.target.value)}
                      label={t("StaffJoiningDate")}
                      name="joiningDate"
                      value={selectedDate}
                      type="date"
                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      placeholder={t("StaffJoiningDate")}
                    />
                    <Error errorName={errors.joiningDate} />
                  </div>
                </div>

                {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Staff Role" />
                  <div className="col-span-8 sm:col-span-4">
                    <SelectRole register={register} label="Role" name="role" />
                    <Error errorName={errors.role} />
                  </div>
                </div> */}
              </div>

              <DrawerButton id={id} title="OurStaff" />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default StaffDrawer;
