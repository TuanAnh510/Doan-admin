import { lazy } from "react";

// use lazy for better code splitting
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Attributes = lazy(() => import("../pages/Attributes"));
const ChildAttributes = lazy(() => import("../pages/ChildAttributes"));
const Products = lazy(() => import("../pages/Products"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Category = lazy(() => import("../pages/Category"));
const ChildCategory = lazy(() => import("../pages/ChildCategory"));
const Staff = lazy(() => import("../pages/Staff"));
const Customers = lazy(() => import("../pages/Customers"));
const CustomerOrder = lazy(() => import("../pages/CustomerOrder"));
const Orders = lazy(() => import("../pages/Orders"));
const OrderInvoice = lazy(() => import("../pages/OrderInvoice"));
const Coupons = lazy(() => import("../pages/Coupons"));
// const Setting = lazy(() => import("../pages/Setting"));
const Page404 = lazy(() => import("../pages/404"));
const ComingSoon = lazy(() => import("../pages/ComingSoon"));
const EditProfile = lazy(() => import("../pages/EditProfile"));
const Languages = lazy(() => import("../pages/Languages"));
const Currencies = lazy(() => import("../pages/Currencies"));
const Setting = lazy(() => import("../pages/Setting"));
const Blogs = lazy(() => import("../pages/Blogs"));
const CategoryBlog = lazy(() => import("../pages/CategoryBlog"));
const Shipping = lazy(() => import("../pages/Shipping"));
const Region = lazy(() => import("../pages/Region"));
const BlogComment = lazy(() => import("../pages/BlogComment"));
const BlogDetails = lazy(() => import("../pages/BlogDetails"));
const ProductComment = lazy(() => import("../pages/ProductComment"));
const OrderRent = lazy(() => import("../pages/OrderRent"));
const Rent = lazy(() => import("../pages/Rent"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const OrderInvoiceRent = lazy(() => import("../pages/OrderInvoiceRent"));
const PromotionBanner = lazy(() => import("../pages/PromotionBanner"));
const Introduction = lazy(() => import("../pages/Introduction"));
const CustomPage = lazy(() => import("../pages/CustomPage"));
const CustomLogan = lazy(() => import("../pages/CustomLogan"));
/*import { AboutUs } from 'pages/AboutUs';
import PrivacyPolicy from './../pages/PrivacyPolicy';
import OrderInvoiceRent from './../pages/OrderInvoiceRent';
import Introduction from './../pages/Introduction';

//  * ⚠ These are internal routes!
//  * They will be rendered inside the app, using the default `containers/Layout`.
//  * If you want to add a route to, let's say, a landing page, you should add
//  * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
//  * are routed.
//  *
//  * If you're looking for the links rendered in the SidebarContent, go to
//  * `routes/sidebar.js`
 */

const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/customlogan",
    component: CustomLogan,
  },
  {
    path: "/custompage",
    component: CustomPage,
  },
  {
    path: "/products",
    component: Products,
  },
  {
    path: "/attributes",
    component: Attributes,
  },
  {
    path: "/attributes/:id",
    component: ChildAttributes,
  },
  {
    path: "/product/:id",
    component: ProductDetails,
  },
  {
    path: "/categories",
    component: Category,
  },
  {
    path: "/languages",
    component: Languages,
  },
  {
    path: "/currencies",
    component: Currencies,
  },

  {
    path: "/categories/:id",
    component: ChildCategory,
  },
  {
    path: "/customers",
    component: Customers,
  },
  {
    path: "/customer-order/:id",
    component: CustomerOrder,
  },
  {
    path: "/our-staff",
    component: Staff,
  },
  {
    path: "/orderrent",
    component: OrderRent,
  },
  {
    path: "/orders",
    component: Orders,
  },
  {
    path: "/order/:id",
    component: OrderInvoice,
  },
  {
    path: "/coupons",
    component: Coupons,
  },
  { path: "/settings", component: Setting },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/coming-soon",
    component: ComingSoon,
  },
  {
    path: "/edit-profile",
    component: EditProfile,
  },
  {
    path: "/blogs",
    component: Blogs,
  },
  {
    path: "/comment/:id",
    component: BlogComment,
  },
  {
    path: "/productsComment/:id",
    component: ProductComment,
  },
  {
    path: "/blogs/:id",
    component: BlogDetails,
  },
  {
    path: "/category-blog",
    component: CategoryBlog,
  },
  {
    path: "/shipping",
    component: Shipping,
  },
  {
    path: "/region",
    component: Region,
  },
  {
    path: "/rent",
    component: Rent,
  },
  {
    path: "/about-us",
    component: AboutUs,
  },
  {
    path: "/privacy-policy",
    component: PrivacyPolicy,
  },
  {
    path: "/orderrent/:id",
    component: OrderInvoiceRent,
  },
  {
    path: "/promotion-banner",
    component: PromotionBanner,
  },
  {
    path: "/introduction",
    component: Introduction,
  },
];

export default routes;
