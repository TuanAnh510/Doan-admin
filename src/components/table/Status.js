import { Badge } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

const Status = ({ status }) => {
  const { t } = useTranslation();
  return (
    <>
      <span className="font-serif">
        {(status === "Pending" || status === "Inactive") && (
          <Badge type="warning">{t(status)}</Badge>
        )}

        {status === "Waiting for Password Reset" && (
          <Badge type="warning">{t(status)}</Badge>
        )}
        {status === "Processing" && <Badge type="neutral">{t(status)}</Badge>}

        {(status === "InTransit" || status === "Deposit") && <Badge type="primary">{t(status)}</Badge>}

        {(status === "Delivered" || status === "Active") && (
          <Badge type="success">{t(status)}</Badge>
        )}

        {status === "Cancel" && <Badge type="danger">{t(status)}</Badge>}
        {status === `POS-Completed` && (
          <Badge className="dark:bg-teal-900 bg-teal-100">{t(status)}</Badge>
        )}
        {status === "RentedOut" && <Badge type="success">{t(status)}</Badge>}
        {status === "Expired" && <Badge type="danger">{t(status)}</Badge>}

        {status === "Pay" && <Badge type="success">{t(status)}</Badge>}
        {status === "Unpaid" && <Badge type="danger">{t(status)}</Badge>}
      </span>
    </>
  );
};

export default Status;
