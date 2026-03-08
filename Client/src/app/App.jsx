// React
import {useEffect} from "react";

// External libs
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes, useMatch, useNavigate} from "react-router-dom";

// App (modules)
import AuthLayout from "@/app/layouts/AuthLayout/AuthLayout";
import RootLayout from "@/app/layouts/RootLayout/RootLayout";
import {checkUserAuth} from "@/modules/auth";
import {getApplicationUser} from "@/modules/user";
import {AccountDetails} from "@/modules/wallet-accounts";
import HomePage from "@/pages/DashboardPage/DashboardPage";
import LoginPage from "@/pages/LoginPage";
import RegistrationPage from "@/pages/RegistrationPage";
import TransactionsPage from "@/pages/TransactionsPage/TransactionsPage";
import WalletPage from "@/pages/WalletPage/WalletPage";

// Shared
import {ROUTES} from "@/shared/consts/routes";
import STATUSES from "@/shared/consts/statuses";

const App = () => {
    const navigate = useNavigate();
    const isLoginPage = !!useMatch(`${ROUTES.LOGIN}`);
    const isRegPage = !!useMatch(`${ROUTES.REGISTRATION}`);

    const dispatch = useDispatch();
    const {isAuthenticated, status} = useSelector(state => state.auth);
    const user = useSelector(state => state.user.user);

    useEffect(() => {
        if (status === STATUSES.IDLE) {
            dispatch(checkUserAuth());
        }
    }, [dispatch, status]);

    useEffect(() => {
        if (isAuthenticated && !user) {
            dispatch(getApplicationUser());
        }
    }, [isAuthenticated, user, dispatch]);

    useEffect(() => {
        if (status === STATUSES.FAILED && !isAuthenticated && !isLoginPage && !isRegPage) {
            navigate(ROUTES.LOGIN, { replace: true });
        }
    }, [status, isAuthenticated, isLoginPage, navigate]);

    useEffect(() => {
        if (status === STATUSES.SUCCEEDED && isAuthenticated && isLoginPage) {
            navigate(ROUTES.DASHBOARD, { replace: true });
        }
    }, [status, isAuthenticated, isLoginPage, navigate]);

    return (
        <>
            {status === STATUSES.LOADING && <p>Checking auth…</p>}
        <Routes>
            <Route path="/" element={<RootLayout/>}>
                <Route path={ROUTES.DASHBOARD} element={<HomePage/>}/>
                <Route path={ROUTES.TRANSACTIONS} element={<TransactionsPage/>}/>

                <Route path={ROUTES.WALLET} element={<WalletPage/>}/>
                <Route path={`${ROUTES.WALLET}/:id`} element={<AccountDetails/>}/>

                <Route path={`${ROUTES.CREDIT_CARDS}/:id`} element={<AccountDetails/>}/>
            </Route>

            <Route element={<AuthLayout/>}>
                <Route path={ROUTES.LOGIN} element={<LoginPage/>}/>
                <Route path={ROUTES.REGISTRATION} element={<RegistrationPage/>}/>
            </Route>
        </Routes>
        </>
    );
}

export default App;
