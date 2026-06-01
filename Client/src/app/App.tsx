// React
import {useEffect, useRef} from "react";

// External libs
import {Route, Routes, useMatch, useNavigate} from "react-router-dom";

// App (modules)
import AuthLayout from "@/app/layouts/AuthLayout/AuthLayout";
import RootLayout from "@/app/layouts/RootLayout/RootLayout";
import {checkUserAuth} from "@/modules/auth";
import {getApplicationUser, updateApplicationUser} from "@/modules/user";
import {AccountDetails} from "@/modules/wallet-accounts";
import HomePage from "@/pages/DashboardPage/DashboardPage";
import LoginPage from "@/pages/LoginPage";
import RegistrationPage from "@/pages/RegistrationPage";
import TransactionsPage from "@/pages/TransactionsPage/TransactionsPage";
import WalletPage from "@/pages/WalletPage/WalletPage";

// Shared
import {ROUTES} from "@/shared/consts/routes";
import STATUSES from "@/shared/consts/statuses";
import SettingsPage from "@/pages/SettingsPage/SettingsPage";
import useModal from "@/shared/hooks/useModal";
import DaySummaryModal from "@/app/components/DaySummaryModal/DaySummaryModal";
import {
    markDaySummarySeen,
    markMonthlyLimitReset,
    shouldResetMonthlyLimit,
    shouldShowDaySummary
} from "@/app/helpers/daySummary";
import {createUserToUpdate} from "@/domain/user";
import {getThisMonthDays} from "@/shared/services/dateTimeService";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch.ts";
import {useAppSelector} from "@/shared/hooks/useAppSelector.ts";

const App = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const isLoginPage = !!useMatch(`${ROUTES.LOGIN}`);
    const isRegPage = !!useMatch(`${ROUTES.REGISTRATION}`);

    const daySummaryModal = useModal();
    const monthlyResetInProgressRef = useRef(false);

    const {isAuthenticated, status} = useAppSelector(state => state.auth);
    const user = useAppSelector(state => state.user?.user);
    const userMonthlyLimit = useAppSelector(state => state.user?.user?.monthlyLimit);

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

    // Day result

    useEffect(() => {
        const now = new Date();

        const target = new Date();
        target.setDate(target.getDate() + 1);
        target.setHours(0, 0, 0, 0);

        const delay = target.getTime() - now.getTime();

        const timer = setTimeout(() => {
            if (shouldShowDaySummary()) {
                daySummaryModal.openModal();
            }
        }, delay);

        return () => clearTimeout(timer);

    }, []);

    // Reset daily limit for new month
    useEffect(() => {
        if (!isAuthenticated || !user || userMonthlyLimit == null) {
            return;
        }

        if (!shouldResetMonthlyLimit()) {
            return;
        }

        if (monthlyResetInProgressRef.current) {
            return;
        }

        const days = getThisMonthDays();
        const newDailyLimit = Number((userMonthlyLimit / days).toFixed(2));
        const userToUpdate = createUserToUpdate({
            dailyLimit: newDailyLimit
        });

        monthlyResetInProgressRef.current = true;
        dispatch(updateApplicationUser(userToUpdate))
            .unwrap()
            .then(() => {
                markMonthlyLimitReset();
            })
            .catch(() => {
                monthlyResetInProgressRef.current = false;
            });
    }, [dispatch, isAuthenticated, user, userMonthlyLimit]);


    const handleClose = () => {
        markDaySummarySeen();
        daySummaryModal.closeModal();
    };

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

                <Route path={`${ROUTES.SETTINGS}`} element={<SettingsPage/>}/>
            </Route>

            <Route element={<AuthLayout/>}>
                <Route path={ROUTES.LOGIN} element={<LoginPage/>}/>
                <Route path={ROUTES.REGISTRATION} element={<RegistrationPage/>}/>
            </Route>
        </Routes>

            <DaySummaryModal
                isOpen={daySummaryModal.isOpen}
                onClose={handleClose}/>
        </>
    );
}

export default App;
