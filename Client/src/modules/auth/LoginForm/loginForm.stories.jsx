import STATUSES from "@/shared/consts/statuses";
import {LoginForm} from "./LoginForm";
import {withProviders} from "@/shared/utils/test-utils"
import LoginPo from "../../../../tests/pages/login.po";
import {user} from "@/stub/user";
import { act } from '@testing-library/react';

const createAuthState = (authState) => ({
    auth: {
        user: null,
        isAuthenticated: false,
        status: STATUSES.IDLE,
        errors: [],
        ...authState
    }
});

const meta = {
    title: "Auth/LoginForm",
    component: LoginForm,
    parameters: {
        layout: "centered"
    }
};

export default meta;

export const Default = {
    decorators: [
        withProviders(createAuthState())
    ]
};

export const FilledForm = {
    decorators: [
        withProviders(createAuthState())
    ],

    play: async ({canvasElement, userEvent}) => {
        const loginPage = new LoginPo(canvasElement, userEvent);

        await act(async () => {
            await loginPage.fillForm(user);
        });
    }
};

export const Error = {
    decorators: [
        withProviders(createAuthState({
            errors: ["Error"],
            status: STATUSES.FAILED
        }))
    ],
    play: async ({canvasElement, userEvent}) => {
        const loginPage = new LoginPo(canvasElement, userEvent);
        await loginPage.fillForm(user);

        await loginPage.submit();
    }
};
