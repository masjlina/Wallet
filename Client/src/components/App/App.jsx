import {Route, Routes} from "react-router-dom";

import LoginPage from "../../pages/LoginPage";
import RegistrationPage from "../../pages/RegistrationPage";
import RootLayout from "../../pages/RootLayout/RootLayout";
import HomePage from "../../pages/DashboardPage/DashboardPage";
import AuthLayout from "../../pages/AuthLayout/AuthLayout";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<RootLayout/>}>
                <Route path="/dashboard" element={<HomePage/>}/>
            </Route>

            <Route element={<AuthLayout/>}>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="registration" element={<RegistrationPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;