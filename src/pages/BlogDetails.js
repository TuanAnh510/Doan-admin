import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import Loading from "components/preloader/Loading";
import PageTitle from "components/Typography/PageTitle";
import useAsync from "hooks/useAsync";
import BlogServices from "services/BlogServices";


const BlogDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();


  const { data, loading } = useAsync(() => BlogServices.getBlogById(id));


  return (
    <>
      <PageTitle>{t("Blog")}</PageTitle>

      {loading ? (
        <Loading loading={loading} />
      ) : (
        <>
          <PageTitle>{t("Header")} : {data.title}</PageTitle>
          <h1>{t("Categories")} : {data.category?.title}</h1>
          <h1>{t("Content1")}:</h1>
          <br></br>
          <div className="inline-block overflow-y-auto h-full align-middle transition-all transform">
            <div> <div dangerouslySetInnerHTML={{ __html: data?.description }} /></div>
          </div>
        </>
      )}

    </>
  );
};

export default BlogDetails;
