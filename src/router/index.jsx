import { useRoutes } from "react-router-dom";
import SideMenu from "../layouts/side-menu/Main";
import SimpleMenu from "../layouts/simple-menu/Main";
import TopMenu from "../layouts/top-menu/Main";
import Page1 from "../views/page-1/Main";
import Page1_1 from "../views/page-1_1/Main";
import Page2 from "../views/page-2/Main";


function Router() {
  const routes = [
    {
      path: "/",
      element: <SideMenu />,
      children: [
        {
          path: "/",
          element: <Page1 />,
        },
        {
          path: "page1_1",
          element: <Page1_1 />,
        },
        {
          path: "page-2",
          element: <Page2 />,
        },
      ],
    }
  ];

  return useRoutes(routes);
}

export default Router;
