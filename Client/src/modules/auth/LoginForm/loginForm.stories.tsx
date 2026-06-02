import STATUSES from "@/shared/consts/statuses";
import {LoginForm} from "./LoginForm";
import {withProviders} from "@/shared/utils/test-utils.tsx"
import LoginPo from "../../../../tests/pages/login.po";
import {user} from "@/stub/user";
import type {IAuthState} from "@/modules/auth";
import type {RootState} from "@/app/store/rootReducer.ts";
import type {Meta, StoryObj} from "@storybook/react-vite";

const createAuthState = (authState?: Partial<IAuthState>): Partial<RootState> => ({
    auth: {
        user: null,
        isAuthenticated: false,
        status: STATUSES.IDLE,
        errors: [],
        ...authState
    }
});

const meta: Meta<typeof LoginForm> = {
    title: "Auth/LoginForm",
    component: LoginForm,
    parameters: {
        layout: "centered"
    }
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
    decorators: [
        withProviders(createAuthState())
    ]
};

export const FilledForm: Story = {
    decorators: [
        withProviders(createAuthState())
    ],
    // Типы для canvasElement и userEvent подтягиваются автоматически благодаря типу Story
    play: async ({ canvasElement, userEvent }) => {
        const loginPage = new LoginPo(canvasElement, userEvent);

        // Убрали лишний act(), так как userEvent внутри Page Object уже асинхронно обобщен
        await loginPage.fillForm(user);
    }
};

export const Error: Story = {
    decorators: [
        withProviders(createAuthState({
            errors: ["Error"],
            status: STATUSES.FAILED
        }))
    ],
    play: async ({ canvasElement, userEvent }) => {
        const loginPage = new LoginPo(canvasElement, userEvent);

        await loginPage.fillForm(user);
        await loginPage.submit();
    }
};
