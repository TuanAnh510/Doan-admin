
import DrawerButton from "components/form/DrawerButton";
import Error from "components/form/Error";
import InputArea from "components/form/InputArea";
import LabelArea from "components/form/LabelArea";
import Title from "components/form/Title";
import useCategoryBlogSubmit from "hooks/useCategoryBlogSubmit";
import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";
//internal import


const CategoryBlogDrawer = ({ id }) => {
    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        onSubmit,
        errors,
        isSubmitting,
    } = useCategoryBlogSubmit(id);


    return (
        <>
            <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                {id ? (
                    <Title
                        title={t("UpdateCategoryBlog")}
                        description={t("UpdateCategoryBlogDescription")}
                    />
                ) : (
                    <Title
                        title={t("AddCategoryBlogTitle")}
                        description={t("AddCategoryBlogDescription")}
                    />
                )}
            </div>

            <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={t("Name")} />
                            <div className="col-span-8 sm:col-span-4">
                                <InputArea
                                    register={register}
                                    label="Category title"
                                    name="title"
                                    type="text"
                                    placeholder={t("CategoryBlog")}
                                />
                                <Error errorName={errors.title} />
                            </div>
                        </div>

                    </div>

                    <DrawerButton id={id} title="CategoryBlog" isSubmitting={isSubmitting} />
                </form>
            </Scrollbars>

        </>
    );
};

export default CategoryBlogDrawer;
