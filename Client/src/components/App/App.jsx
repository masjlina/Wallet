import {Route, Routes, useNavigate} from "react-router-dom";

import LoginPage from "../../pages/LoginPage";
import RegistrationPage from "../../pages/RegistrationPage";
import TransactionsPage from "../../pages/TransactionsPage/TransactionsPage";
import RootLayout from "../../pages/RootLayout/RootLayout";
import HomePage from "../../pages/DashboardPage/DashboardPage";
import AuthLayout from "../../pages/AuthLayout/AuthLayout";
import WalletPage from "../../pages/WalletPage/WalletPage";

import {ROUTES} from "../../consts/routes";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {checkUserAuth} from "../../modules/logRegForms/store/thunks";
import STATUSES from "../../consts/STATUSES";

const App = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { user, isAuthenticated, status } = useSelector(state => state.auth);

    useEffect(() => {
        if (status === STATUSES.IDLE) {
            dispatch(checkUserAuth());
        }
    }, [dispatch, status]);

    useEffect(() => {
        if (status === STATUSES.FAILED && !isAuthenticated) {
            navigate(ROUTES.LOGIN, { replace: true });
        }
    }, [status, isAuthenticated, navigate]);

    if (status === STATUSES.LOADING) {
        return <p>Checking auth…</p>;
    }

    return (
        <Routes>
            <Route path="/" element={<RootLayout/>}>
                <Route path={ROUTES.DASHBOARD} element={<HomePage/>}/>
                <Route path={ROUTES.TRANSACTIONS} element={<TransactionsPage/>}/>
                <Route path={ROUTES.WALLET} element={<WalletPage/>}/>
            </Route>

            <Route element={<AuthLayout/>}>
                <Route path={ROUTES.LOGIN} element={<LoginPage/>}/>
                <Route path={ROUTES.REGISTRATION} element={<RegistrationPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;
// TODO: get redux state with checkAuth; create wallet

// TODO: try to make shadow not overflowed
// TODO: if wallet doesn't exist, show a button to create it on every page
