import {Outlet} from "react-router-dom";

const RootLayout = () => {
  return (
      <div className="wrapper main__wrapper">
          <Outlet/>
      </div>
  );
}

export default RootLayout;