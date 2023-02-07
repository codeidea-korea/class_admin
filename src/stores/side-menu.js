import { atom } from "recoil";

const sideMenu = atom({
  key: "sideMenu",
  default: {
    menu: [
      {
        icon: "Home",
        title: "Dashboard",
        subMenu: [
          {
            icon: "",
            pathname: "/",
            title: "Overview 1",
          },
          {
            icon: "",
            pathname: "/dashboard-overview-2",
            title: "Overview 2",
          },
          {
            icon: "",
            pathname: "/dashboard-overview-3",
            title: "Overview 3",
          },
          {
            icon: "",
            pathname: "/dashboard-overview-4",
            title: "Overview 4",
          },
        ],
      },
      {
        icon: "Home",
        pathname: "/",
        title: "Page 1",
      },
      {
        icon: "Home",
        pathname: "/page-2",
        title: "Page 2",
      },
    ],
  },
});

export { sideMenu };
