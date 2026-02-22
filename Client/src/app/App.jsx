// React
import {useEffect} from "react";

// External libs
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes, useNavigate} from "react-router-dom";

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

    const dispatch = useDispatch();
    const {isAuthenticated, status} = useSelector(state => state.auth);
    const user = useSelector(state => state.user.user);

    useEffect(() => {
        if (status === STATUSES.IDLE) {
            dispatch(checkUserAuth());
        }
    }, [dispatch, status]);

    useEffect(() => {
        if (!user) {
            try {
                dispatch(getApplicationUser());
            } catch (error) {
            }
        }
    }, [user]);

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
                <Route path={`${ROUTES.WALLET}/:id`} element={<AccountDetails/>}/>

                <Route path={`${ROUTES.CREDIT_CARDS}/:id`} element={<AccountDetails/>}/>
            </Route>

            <Route element={<AuthLayout/>}>
                <Route path={ROUTES.LOGIN} element={<LoginPage/>}/>
                <Route path={ROUTES.REGISTRATION} element={<RegistrationPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;
// TODO: get redux state with checkAuth; create wallet-accounts

// TODO: try to make shadow not overflowed
// TODO: if wallet-accounts doesn't exist, show a button to create it on every page
