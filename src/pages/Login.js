import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import Error from "components/form/Error";
import LabelArea from "components/form/LabelArea";
import InputArea from "components/form/InputArea";
import ImageLight from "assets/img/forgot-password-office.jpeg";
import ImageDark from "assets/img/forgot-password-office.jpeg";
import useLoginSubmit from "../hooks/useLoginSubmit";

const Login = () => {
  const { t } = useTranslation()
  const { onSubmit, register, handleSubmit, errors, loading } = useLoginSubmit();

  return (
    <>
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <img
                aria-hidden="true"
                className="object-fill w-full h-full dark:hidden"
                src={ImageLight}
                alt="Office"
              />
              <img
                aria-hidden="true"
                className="hidden object-cover w-full h-full dark:block"
                src={ImageDark}
                alt="Office"
              />
            </div>
            <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Đăng nhập</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <LabelArea label="Email" />
                  <InputArea
                    register={register}
                    defaultValue="admin@gmail.com"
                    label="Email"
                    name="email"
                    type="email"
                    placeholder=""
                  />
                  <Error errorName={errors.email} />
                  <div className="mt-6"></div>
                  <LabelArea label="Mật khẩu" />
                  <InputArea
                    register={register}
                    defaultValue="12345678"
                    label={t("labelPassword")}
                    name="password"
                    type="password"
                    placeholder=""
                  />
                  <Error errorName={errors.password} />

                  <Button disabled={loading} type="submit" className="mt-4 h-12 w-full bg-blue-500 hover:bg-blue-700" to="/dashboard">
                    {t("LoginTitle")}
                  </Button>
                  <hr className="my-10" />

                </form>

                <p className="mt-4">
                  <Link
                    className="text-sm font-medium text-blue-500 dark:text-blue-400 hover:underline"
                    to="/forgot-password"
                  >
                    {t("ForgotPassword")}
                  </Link>
                </p>
                {/* <p className="mt-1">
                  <Link
                    className="text-sm font-medium text-blue-500 dark:text-blue-400 hover:underline"
                    to="/signup"
                  >
                    {t("CreateAccountTitle")}
                  </Link>
                </p> */}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
