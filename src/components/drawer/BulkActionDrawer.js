import ReactTagInput from "@pathofdev/react-tag-input";
import { Button, Input, Select } from "@windmill/react-ui";
import ParentCategory from "components/category/ParentCategory";
import Error from "components/form/Error";
import LabelArea from "components/form/LabelArea";
import SwitchToggle from "components/form/SwitchToggle";
import TextAreaCom from "components/form/TextAreaCom";
import Title from "components/form/Title";
import { SidebarContext } from "context/SidebarContext";
import useBulkActionSubmit from "hooks/useBulkActionSubmit";
import Multiselect from "multiselect-react-dropdown";
import Drawer from "rc-drawer";
import Tree from "rc-tree";
import React, { useContext } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { FiX } from "react-icons/fi";
import { notifyError } from "utils/toast";
import { showingTranslateValue } from "utils/translate";
import { useTranslation } from "react-i18next";
//internal import

const BulkActionDrawer = ({
  ids,
  title,
  lang,
  data,
  childId,
  attributes,
  isCheck,
}) => {
  const { toggleBulkDrawer, isBulkDrawerOpen, closeBulkDrawer } =
    useContext(SidebarContext);
  const { t } = useTranslation();
  const {
    tag,
    setTag,
    published,
    register,
    onSubmit,
    errors,
    checked,
    setChecked,
    resetRefTwo,
    handleSubmit,
    setPublished,
    selectedCategory,
    setSelectedCategory,
    defaultCategory,
    setDefaultCategory,
    selectCategoryName,
    setSelectCategoryName,
  } = useBulkActionSubmit(ids, lang, childId);

  const motion = {
    motionName: "node-motion",
    motionAppear: false,
    onAppearStart: (node) => {
      return { height: 0 };
    },
    onAppearActive: (node) => ({ height: node.scrollHeight }),
    onLeaveStart: (node) => ({ height: node.offsetHeight }),
    onLeaveActive: () => ({ height: 0 }),
  };

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        title: showingTranslateValue(category?.name, lang),
        key: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }

    return myCategories;
  };

  const findObject = (obj, target) => {
    return obj._id === target
      ? obj
      : obj?.children?.reduce(
        (acc, obj) => acc ?? findObject(obj, target),
        undefined
      );
  };

  const handleSelect = (key) => {
    const checkId = isCheck?.find((data) => data === key);

    if (isCheck?.length === data[0]?.children?.length) {
      return notifyError(t("ParentCate"));
    } else if (checkId !== undefined) {
      return notifyError(t("ParentCate"));
    } else if (key === childId) {
      return notifyError(t("ParentCate"));
    } else {
      if (key === undefined) return;
      setChecked(key);

      const obj = data[0];
      const result = findObject(obj, key);
      setSelectCategoryName(showingTranslateValue(result?.name, lang));
    }
  };

  const STYLE = `
  .rc-tree-child-tree {
    display: hidden;
  }
  .node-motion {
    transition: all .3s;
    overflow-y: hidden;
  }
`;

  return (
    <>
      <Drawer
        open={isBulkDrawerOpen}
        onClose={closeBulkDrawer}
        parent={null}
        level={null}
        placement={"right"}
      >
        <button
          onClick={toggleBulkDrawer}
          className="absolute focus:outline-none z-50 text-red-500 hover:bg-red-100 hover:text-gray-700 transition-colors duration-150 bg-white shadow-md mr-6 mt-6 right-0 left-auto w-10 h-10 rounded-full block text-center"
        >
          <FiX className="mx-auto" />
        </button>
        <div className="flex flex-col w-full h-full justify-between">
          <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
            <Title
              title={`${t("Head1")} ${t(title)}`}
              description={`${t("Head2")} ${t(title)} ${t("Head3")}`}
            />
          </div>
          <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
            <form onSubmit={handleSubmit(onSubmit)} className="block">
              <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
                {title === "Products" && (
                  <>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Category")} />
                      <div className="col-span-8 sm:col-span-4">
                        <ParentCategory
                          lang={lang}
                          selectedCategory={selectedCategory}
                          setSelectedCategory={setSelectedCategory}
                          setDefaultCategory={setDefaultCategory}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("DefaultCategory")} />
                      <div className="col-span-8 sm:col-span-4">
                        <Multiselect
                          displayValue="name"
                          isObject={true}
                          singleSelect={true}
                          ref={resetRefTwo}
                          hidePlaceholder={true}
                          onKeyPressFn={function noRefCheck() { }}
                          onRemove={function noRefCheck() { }}
                          onSearch={function noRefCheck() { }}
                          onSelect={(v) => setDefaultCategory(v)}
                          selectedValues={defaultCategory}
                          options={selectedCategory}
                          placeholder={t("DefaultCategory")}
                        ></Multiselect>
                      </div>
                    </div>

                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Published")} />
                      <div className="col-span-8 sm:col-span-4">
                        <SwitchToggle
                          handleProcess={setPublished}
                          processOption={published}
                        />
                        <Error errorName={errors.status} />
                      </div>
                    </div>

                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("ProductTag")} />
                      <div className="col-span-8 sm:col-span-4">
                        <ReactTagInput
                          placeholder={t("ProductTagPlaseholder")}
                          tags={tag}
                          onChange={(newTags) => setTag(newTags)}
                        />
                      </div>
                    </div>
                  </>
                )}

                {title === "Coupons" && (
                  <>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("StartTime")} />
                      <div className="col-span-8 sm:col-span-4">
                        <Input
                          {...register(`startTime`, {
                            required: "Coupon Validation Start Time",
                          })}
                          label={t("ValidTimeStart")}
                          name="startTime"
                          type="datetime-local"
                          placeholder={t("StartTime")}
                          className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                        />

                        <Error errorName={errors.startTime} />
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("EndTime")} />
                      <div className="col-span-8 sm:col-span-4">
                        <Input
                          {...register(`endTime`, {
                            required: "Coupon Validation End Time",
                          })}
                          label={t("ValidTimeEnd")}
                          name="endTime"
                          type="datetime-local"
                          placeholder={t("EndTime")}
                          className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                        />

                        <Error errorName={errors.endTime} />
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Published")} />
                      <div className="col-span-8 sm:col-span-4">
                        <SwitchToggle
                          handleProcess={setPublished}
                          processOption={published}
                        />
                        <Error errorName={errors.published} />
                      </div>
                    </div>
                  </>
                )}

                {title === "Languages" && (
                  <>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Published")} />
                      <div className="col-span-8 sm:col-span-4">
                        <SwitchToggle
                          title={""}
                          processOption={published}
                          handleProcess={setPublished}
                        />
                      </div>
                    </div>
                  </>
                )}

                {title === "Currencies" && (
                  <>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("CurrenciesEnabled")} />
                      <div className="col-span-8 sm:col-span-4">
                        <SwitchToggle
                          title={""}
                          processOption={published}
                          handleProcess={setPublished}
                        />
                      </div>
                    </div>
                  </>
                )}

                {title === "Categories" && (
                  <>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("CateDescription")} />
                      <div className="col-span-8 sm:col-span-4">
                        <TextAreaCom
                          required
                          register={register}
                          label={t("CateDescription")}
                          name="description"
                          type="text"
                          placeholder={t("CateDescription")}
                        />
                        <Error errorName={errors.description} />
                      </div>
                    </div>

                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("ParentCategory")} />
                      <div className="col-span-8 sm:col-span-4">
                        <Input
                          readOnly
                          {...register(`parent`, {
                            required: false,
                          })}
                          name="parent"
                          value={
                            selectCategoryName ? selectCategoryName : "Home"
                          }
                          placeholder={t("ParentCategory")}
                          type="text"
                          className="border h-12 w-full text-sm focus:outline-none block bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                        />

                        <div className="draggable-demo capitalize">
                          <style dangerouslySetInnerHTML={{ __html: STYLE }} />
                          <Tree
                            treeData={renderCategories(data)}
                            selectedKeys={[checked]}
                            onSelect={(v) => handleSelect(v[0])}
                            motion={motion}
                            animation="slide-up"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Published")} />
                      <div className="col-span-8 sm:col-span-4">
                        <SwitchToggle
                          title={""}
                          processOption={published}
                          handleProcess={setPublished}
                        />
                      </div>
                    </div>
                  </>
                )}

                {title === "Child Categories" && (
                  <>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("CateDescription")} />
                      <div className="col-span-8 sm:col-span-4">
                        <TextAreaCom
                          required
                          register={register}
                          label={t("CateDescription")}
                          name="description"
                          type="text"
                          placeholder={t("CateDescription")}
                        />
                        <Error errorName={errors.description} />
                      </div>
                    </div>

                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("ParentCategory")} />
                      <div className="col-span-8 sm:col-span-4">
                        <Input
                          readOnly
                          {...register(`parent`, {
                            required: false,
                          })}
                          name="parent"
                          value={
                            selectCategoryName ? selectCategoryName : "Home"
                          }
                          placeholder={t("ParentCategory")}
                          type="text"
                          className="border h-12 w-full text-sm focus:outline-none block bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                        />

                        <div className="draggable-demo capitalize">
                          <style dangerouslySetInnerHTML={{ __html: STYLE }} />
                          <Tree
                            treeData={renderCategories(data)}
                            selectedKeys={[checked]}
                            onSelect={(v) => handleSelect(v[0])}
                            motion={motion}
                            animation="slide-up"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Published")} />
                      <div className="col-span-8 sm:col-span-4">
                        <SwitchToggle
                          title={""}
                          processOption={published}
                          handleProcess={setPublished}
                        />
                      </div>
                    </div>
                  </>
                )}

                {title === "Attributes" && (
                  <>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Options")} />
                      <div className="col-span-8 sm:col-span-4">
                        <Select
                          className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                          name="option"
                          {...register(`option`, {
                            required: `Option is required!`,
                          })}
                        >
                          <option value="" defaultValue hidden>
                            {t("SelectType")}
                          </option>
                          <option value="Dropdown">{t("Dropdown")}</option>
                          <option value="Radio">{t("Radio")}</option>
                          {/* <option value="Checkbox">Checkbox</option> */}
                        </Select>
                        <Error errorName={errors.option} />
                      </div>
                    </div>

                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Published")} />
                      <div className="col-span-8 sm:col-span-4">
                        <SwitchToggle
                          title={""}
                          processOption={published}
                          handleProcess={setPublished}
                        />
                      </div>
                    </div>
                  </>
                )}

                {title === "Attribute Value(s)" && (
                  <>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("ChangeAtt")} />
                      <div className="col-span-8 sm:col-span-4">
                        <Select
                          className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                          name="groupName"
                          {...register(`groupName`, {
                            required: false,
                          })}
                        >
                          <option value="" defaultValue hidden>
                            {t("SelectAtt")}
                          </option>

                          {attributes?.map((value, index) => (
                            <option key={index + 1} value={value._id}>
                              {showingTranslateValue(value?.name, lang)}
                            </option>
                          ))}
                        </Select>

                        <Error errorName={errors.groupName} />
                      </div>
                    </div>

                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Published")} />
                      <div className="col-span-8 sm:col-span-4">
                        <SwitchToggle
                          title={""}
                          processOption={published}
                          handleProcess={setPublished}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="fixed bottom-0 w-full right-0 py-4 lg:py-8 px-6 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex bg-gray-50 border-t border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                  <Button
                    onClick={toggleBulkDrawer}
                    className="h-12 bg-white w-full text-red-500 hover:bg-red-50 hover:border-red-100 hover:text-red-600 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-red-700"
                    layout="outline"
                  >
                    {t("Published")}
                  </Button>
                </div>
                <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                  <Button type="submit" className="w-full h-12">
                    {" "}
                    {t("BulkUpdate")} {t(title)}
                  </Button>
                </div>
              </div>
            </form>
          </Scrollbars>
        </div>
      </Drawer>
    </>
  );
};

export default BulkActionDrawer;
