import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "context/SidebarContext";
import { notifyError, notifySuccess } from "utils/toast";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ProductServices from "services/ProductServices";
const useRentSubmit = (id) => {
    const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

    const [agree, setAgree] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        setValue,
        clearErrors,
        formState: { errors },
    } = useForm();
    const settings = useSelector((state) => state.setting);
    const { settingItem } = settings;

    const globalSetting = settingItem.find(
        (value) => value.name === 'globalSetting'
    );
    const currency = globalSetting?.default_currency || 'VND';

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);
            const rentData = {
                monthlyrent: data.monthlyrent,
                depositcost: data.depositcost,
                agree: agree,

            };
            if (id) {
                await ProductServices.updateRent(id, rentData);
                setIsUpdate(true);
                setIsSubmitting(false);
                notifySuccess(t("notifySuccessUpdate"));
                closeDrawer();
            }

        } catch (err) {
            notifyError(err ? err?.response?.data?.message : err.message);
            setIsSubmitting(false);
            closeDrawer();
        }
    };

    useEffect(() => {
        if (!isDrawerOpen) {
            setValue("monthlyrent");
            setValue("depositcost");
            setAgree("");

            clearErrors("monthlyrent");
            clearErrors("depositcost");
            return;
        }
        if (id) {
            (async () => {
                try {
                    const res = await ProductServices.getProductById(id);
                    if (res) {
                        // console.log('res coupon', res);

                        setValue("monthlyrent", res.rent.monthlyrent);
                        setValue("depositcost", res.rent.depositcost);
                        setAgree(res.rent.agree);

                    }
                } catch (err) {
                    notifyError(err ? err?.response?.data?.message : err.message);
                }
            })();
        }
    }, [id, setValue, isDrawerOpen, clearErrors]);

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        isSubmitting,
        setAgree,
        agree,
        currency,
    };
};

export default useRentSubmit;
