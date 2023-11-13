import React from "react";
import { useTranslation } from "react-i18next";

const ThemeSuspense = () => {
  const { t } = useTranslation()

  return (
    <div className="w-full h-screen p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
      <>
        {t("Loading")}
      </>
    </div>
  );
};

export default ThemeSuspense;
