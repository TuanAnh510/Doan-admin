import React from "react";
import { NavLink, Route } from "react-router-dom";
// import Cookies from "js-cookie";
// import { Button } from "@windmill/react-ui";
// import { IoLogOutOutline } from "react-icons/io5";

import sidebar from "routes/sidebar";
// import { AdminContext } from "context/AdminContext";
import SidebarSubMenu from "./SidebarSubMenu";
// import SidebarSubMenu from "SidebarSubMenu";
import { useTranslation } from "react-i18next";
import { FiSend } from "react-icons/fi";
import useAsync from "hooks/useAsync";
import SettingServices from "services/SettingServices";

const SidebarContent = () => {
  const { t } = useTranslation();
  // const { dispatch } = useContext(AdminContext);
  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);
  // const handleLogOut = () => {
  //   dispatch({ type: "USER_LOGOUT" });
  //   Cookies.remove("adminInfo");
  // };
  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <a className=" text-gray-900 dark:text-gray-200" href="/dashboard">
        <div className="ml-5 flex font-bold">
          <FiSend className="text-2xl" />
          <h6 className="ml-2">{globalSetting.shop_name} Admin</h6>
        </div>
      </a>
      <ul className="mt-6">
        {sidebar.map((route) =>
          route.routes ? (
            <SidebarSubMenu route={route} key={route.name} />
          ) : (
            <li className="relative" key={route.name}>
              {route?.outside ? (
                <a
                  href={process.env.REACT_APP_STORE_DOMAIN}
                  target="_blank"
                  className="px-6 py-4 inline-flex items-center cursor-pointer w-full text-sm font-semibold transition-colors duration-150 hover:text-blue-700 dark:hover:text-gray-200"
                  rel="noreferrer"
                >
                  <Route path={route.path} exact={route.exact}></Route>
                  <route.icon className="w-5 h-5" aria-hidden="true" />
                  <span className="ml-4">{t(`${route.name}`)}</span>
                  {/* <span className="ml-4">{route.name}</span> */}
                </a>
              ) : (
                <NavLink
                  exact
                  to={route.path}
                  target={`${route?.outside ? "_blank" : "_self"}`}
                  className="px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-blue-700 dark:hover:text-gray-200"
                  activeClassName="bg-blue-500 text-white dark:text-gray-100"
                >
                  <Route path={route.path} exact={route.exact}></Route>
                  <route.icon className="w-5 h-5" aria-hidden="true" />
                  <span className="ml-4">{t(`${route.name}`)}</span>
                </NavLink>
              )}
            </li>
          )
        )}
      </ul>
      {/* <span className="lg:fixed bottom-0 px-6 py-6 w-64 mx-auto relative mt-3 block">
        <Button
          onClick={handleLogOut}
          size="large"
          className="w-full bg-blue-500 hover:bg-blue-700"
        >
          <span className="flex items-center">
            <IoLogOutOutline className="mr-3 text-lg" />
            <span className="text-sm">{t("LogOut")}</span>
          </span>
        </Button>
      </span>  */}
    </div>
  );
};

export default SidebarContent;
