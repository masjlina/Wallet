import {Route, Routes} from "react-router-dom";

import LoginPage from "../../pages/LoginPage";
import RegistrationPage from "../../pages/RegistrationPage";
import TransactionsPage from "../../pages/TransactionsPage/TransactionsPage";
import RootLayout from "../../pages/RootLayout/RootLayout";
import HomePage from "../../pages/DashboardPage/DashboardPage";
import AuthLayout from "../../pages/AuthLayout/AuthLayout";
import AccountsPage from "../../pages/AccountsPage/AccountsPage";

import {ROUTES} from "../../consts/routes";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<RootLayout/>}>
                <Route path={ROUTES.DASHBOARD} element={<HomePage/>}/>
                <Route path={ROUTES.TRANSACTIONS} element={<TransactionsPage/>}/>
                <Route path={ROUTES.ACCOUNTS} element={<AccountsPage/>}/>
            </Route>

            <Route element={<AuthLayout/>}>
                <Route path={ROUTES.LOGIN} element={<LoginPage/>}/>
                <Route path={ROUTES.REGISTRATION} element={<RegistrationPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;

// TODO: try to make shadow not overflowed
