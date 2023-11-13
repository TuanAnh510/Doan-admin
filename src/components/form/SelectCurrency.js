import { Select } from "@windmill/react-ui";
import useAsync from "hooks/useAsync";
import { useTranslation } from "react-i18next";
import CurrencyServices from "services/CurrencyServices";
// import { CODES } from 'currencies-map';

const SelectCurrency = ({
  register,
  name,
  label,
  required,
  // loading,
}) => {
  const { t } = useTranslation()
  const { data, loading } = useAsync(CurrencyServices.getShowingCurrency);

  return (
    <>
      {loading ? (
        <>
          {t("Loading")}
        </>
      ) : (
        <Select
          className={`border text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-blue-500 h-12`}
          name={name}
          {...register(`${name}`, {
            required: required ? false : `${label} is required!`,
          })}
        >
          {data?.map((currency) => (
            <option key={currency._id} value={`${currency.symbol}`}>
              {currency?.name}
            </option>
          ))}
        </Select>
      )}
    </>
  );
};
export default SelectCurrency;
