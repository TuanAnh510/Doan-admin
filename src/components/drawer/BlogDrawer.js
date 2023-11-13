import { Select } from "@windmill/react-ui";
import DrawerButton from "components/form/DrawerButton";
import Error from "components/form/Error";
import InputArea from "components/form/InputArea";
import LabelArea from "components/form/LabelArea";
import Title from "components/form/Title";
import Uploader from "components/image-uploader/Uploader";
import Editor from "components/quill/Editor";
import useAsync from "hooks/useAsync";
import useBlogSubmit from "hooks/useBlogSubmit";
import { t } from "i18next";
import { Scrollbars } from "react-custom-scrollbars-2";
import CategoryBlogServices from "services/CategoryBlogServices";

const BlogDrawer = ({ id }) => {

    const { data } = useAsync(CategoryBlogServices.getAllCategoryBlog);

    const {
        description,
        setDescription,
        register,
        handleSubmit,
        onSubmit,
        errors,
        setImageUrl,
        imageUrl,
        isSubmitting,
    } = useBlogSubmit(id);

    return (
        <>
            <div className="w-full relative  p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 ">

                {id ? (
                    <Title
                        title={t("UpdateBlog")}
                        description={t("UpdateBlogDescription")}
                    />
                ) : (
                    <Title
                        title={t("AddBlogTitle")}
                        description={t("AddBlogDescription")}
                    />
                )}
            </div>

            <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={t("Title")} />
                            <div className="col-span-8 sm:col-span-4">
                                <InputArea
                                    register={register}
                                    label="Coupon title"
                                    name="title"
                                    type="text"
                                    placeholder={t("Title")}
                                />
                                <Error errorName={errors.title} />
                            </div>
                        </div>
                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={t("BlogBannerImage")} />
                            <div className="col-span-8 sm:col-span-4">
                                <Uploader
                                    imageUrl={imageUrl}
                                    setImageUrl={setImageUrl}
                                    folder="blog"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={t("Description")} />
                            <div className="col-span-8 sm:col-span-4">

                                <Editor
                                    description={description}
                                    setDescription={setDescription}
                                    placeholder={t("Description")}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={t("BlogCategory")} />
                            <div className="col-span-8 sm:col-span-4 ">
                                <Select
                                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                                    name="cateBlog"
                                    {...register(`cateBlog`, {
                                        required: `cateBlog is required!`,
                                    })}
                                >
                                    <option value="" defaultValue hidden>
                                        {t("SelectCategoryBlog")}
                                    </option>
                                    {data?.map((ctb, i) => (
                                        <option value={ctb._id} key={i + 1}>{ctb.title}</option>
                                    ))}


                                    {/* <option value="Checkbox">Checkbox</option> */}
                                </Select>
                                <Error errorName={errors.cateBlog} />
                            </div>
                        </div>


                    </div>

                    <DrawerButton id={id} title="Blog" isSubmitting={isSubmitting} />
                </form>
            </Scrollbars>
        </>
    );
};

export default BlogDrawer;
