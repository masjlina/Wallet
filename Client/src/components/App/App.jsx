import {Route, Routes} from "react-router-dom";

import LoginPage from "../../pages/LoginPage";
import RegistrationPage from "../../pages/RegistrationPage";
import RootLayout from "../../pages/RootLayout";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<RootLayout/>}>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="registration" element={<RegistrationPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;