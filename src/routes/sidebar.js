import {
  FiGrid,
  FiUsers,
  FiUser,
  FiCompass,
  FiSettings,
  FiSlack,
  FiTarget,
} from "react-icons/fi";
import { FaShippingFast, FaLocationArrow } from "react-icons/fa";
import { BiCalendarEdit } from "react-icons/bi";
import { ImBlog } from "react-icons/im";
/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const sidebar = [
  {
    path: "/dashboard", // the url
    icon: FiGrid, // icon
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    icon: FiSlack,
    name: "Catalog",
    routes: [
      {
        path: "/products",
        name: "Products",
      },
      {
        path: "/categories",
        name: "Categories",
      },
      {
        path: "/attributes",
        name: "Attributes",
      },
      {
        path: "/coupons",
        name: "Coupons",
      },
      {
        icon: FaShippingFast,
        path: "/shipping",
        name: "Shipping",
      },
    ],
  },
  {
    path: "/orders",
    icon: FiCompass,
    name: "Orders",
  },
  {
    icon: BiCalendarEdit,
    name: "Rent",
    routes: [
      {
        path: "/rent",
        name: "ProductRent",
      },
      {
        path: "/orderrent",
        name: "ListRent",
      },
      {
        icon: FaLocationArrow,
        path: "/region",
        name: "RegionTitle",
      },
    ],
  },

  {
    path: "/customers",
    icon: FiUsers,
    name: "Customers",
  },
  {
    path: "/our-staff",
    icon: FiUser,
    name: "OurStaff",
  },
  {
    icon: ImBlog,
    name: "Blog",
    routes: [
      {
        path: "/category-blog",
        name: "CategoryBlog",
      },
      {
        path: "/blogs",
        name: "Blog",
      },
    ],
  },

  {
    icon: FiSettings,
    name: "Setting",
    routes: [
      {
        path: "/settings",
        icon: FiSettings,
        name: "StoreSetting",
      },
      {
        path: "/customlogan",
        icon: FiSettings,
        name: "CustomSlogan",
      },
      {
        path: "/custompage",
        icon: FiSettings,
        name: "CustomPage",
      },
      {
        path: "/promotion-banner",
        icon: FiSettings,
        name: "PromotionBanner",
      },
      {
        path: "/introduction",
        icon: FiSettings,
        name: "IntroDescripton",
      },
      {
        path: "/about-us",
        icon: FiSettings,
        name: "AboutUsSetting",
      },
      {
        path: "/privacy-policy",
        icon: FiSettings,
        name: "PrivacyTCSetting",
      },
    ],
  },

  // {
  //   icon: FiGlobe,
  //   name: "International",
  //   routes: [
  //     {
  //       path: "/languages",
  //       name: "Languages",
  //     },
  //     {
  //       path: "/currencies",
  //       name: "Currencies",
  //     },
  //   ],
  // },
  {
    icon: FiTarget,
    name: "ViewStore",
    path: `${process.env.REACT_APP_STORE_DOMAIN}`,
    outside: "store",
  },

  // {
  //   icon: FiSlack,
  //   name: "Pages",
  //   routes: [
  //     // submenu

  //     {
  //       path: "/404",
  //       name: "404",
  //     },
  //     {
  //       path: "/coming-soon",
  //       name: "Coming Soon",
  //     },
  //   ],
  // },
];

export default sidebar;
