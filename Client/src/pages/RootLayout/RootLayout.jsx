import {Outlet} from "react-router-dom";

import "./rootLayout.scss";
import Header from "../../modules/Header/components/Header/Header";
import Sidebar from "../../modules/Sidebar/components/Sidebar/Sidebar";

const RootLayout = () => {
  return (
      <div className="wrapper main__wrapper">
          <div className="layout">
              <Header/>
              <div className="wrapper center__wrapper">
                  <Sidebar/>
                  <div className="wrapper content__wrapper">
                    <Outlet/>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default RootLayout;