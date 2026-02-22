// External libs
import {Outlet} from "react-router-dom";

// App (modules)
import {Header} from "@/modules/layout";
import {Sidebar} from "@/modules/layout";

// Styles
import "./rootLayout.scss";

const RootLayout = () => {
  return (
      <div className="wrapper main__wrapper">
          <div className="main__grid-layout">
              <Header/>
              <Sidebar/>
              <div className="wrapper content__wrapper">
                <Outlet/>
              </div>
          </div>
      </div>
  );
}

export default RootLayout;
