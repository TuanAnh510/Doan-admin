import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "context/SidebarContext";
import { notifyError, notifySuccess } from "utils/toast";
import ShippingServices from "services/ShippingServices";
import { useTranslation } from "react-i18next";
import OrderServices from "services/OrderServices";
const useOrderRentSubmit = (id) => {
    const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        setValue,
        clearErrors,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            console.log('BillOfLadingCode', data.BillOfLadingCode)
            setIsSubmitting(true);
            const orderRentData = {
                BillOfLadingCode: data.BillOfLadingCode,
            };
            if (id) {
                await OrderServices.updateOrder(id, orderRentData);
                setIsUpdate(true);
                setIsSubmitting(false);
                notifySuccess(t("UpdateOrderSuccess"));
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
            setValue("BillOfLadingCode");
            clearErrors("BillOfLadingCode");
            return;
        }
        if (id) {
            (async () => {
                try {
                    const res = await OrderServices.getOrderById(id);
                    if (res) {
                        console.log('res', res);

                        setValue("BillOfLadingCode", res?.BillOfLadingCode);

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
    };
};

export default useOrderRentSubmit;
