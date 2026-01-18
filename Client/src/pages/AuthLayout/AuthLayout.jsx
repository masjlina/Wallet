import {Outlet} from "react-router-dom";

import "./authLayout.scss";

const AuthLayout = () => {
  return (
      <div className="wrapper main__wrapper">
          <Outlet/>
      </div>
  );
}

export default AuthLayout;