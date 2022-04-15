import Dashboard from "views/Dashboard";
import Maps from "views/Map";
import TableList from "views/Tables"
import UserPage from "views/User.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/teams",
    name: "Teams",
    icon: "nc-icon nc-single-02",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/projects",
    name: "Projects",
    icon: "nc-icon nc-briefcase-24",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-map-big",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: "nc-icon nc-single-02",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
  }
];
export default routes;
