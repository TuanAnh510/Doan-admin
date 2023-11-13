import React from 'react';
import { useTranslation } from 'react-i18next';

const ActiveButton = ({ tapValue, activeValue, handleProductTap }) => {
  const { t } = useTranslation()
  return (
    <button
      className={`inline-block px-4 py-2 text-base ${tapValue === activeValue &&
        'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 rounded-t-lg border-b-2'
        } focus:outline-none`}
      aria-current="page"
      onClick={() => handleProductTap(activeValue, false, tapValue)}
    >
      {t(activeValue)}
    </button>
  );
};

export default ActiveButton;
