import {act, screen, waitFor} from "@testing-library/react";
import {afterEach, test} from "vitest"
import {composeStory} from '@storybook/react-vite';
import {LoginForm, loginUser} from "@/modules/auth";
import Meta, {FilledForm as FilledFormStory} from "./loginForm.stories";
import LoginPo from "../../../../tests/pages/login.po";
import {userEvent} from "storybook/test";
import {user as userData} from "@/stub/user";
import {renderWithProviders} from "@/shared/utils/test-utils";

const FilledForm = composeStory(FilledFormStory, Meta);

const {mockNavigate, mockLogin} = vi.hoisted(() => ({
    mockNavigate: vi.fn(),
    mockLogin: vi.fn()
}));

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");

    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

vi.mock("@/modules/auth/api/authApi", () => ({
    login: mockLogin
}));

mockLogin.mockResolvedValue({
    accessToken: "fake-token",
    user: {id: 1, email: "test@mail.com"}
});

describe("LoginForm", () => {
    afterEach(() => {
        mockLogin.mockResolvedValue({
            accessToken: "fake-token",
            user: {id: 1, email: "test@mail.com"}
        });
        vi.restoreAllMocks();
        vi.clearAllMocks();
    });

    test("render login form", async () => {
        await FilledForm.run();
        const page = new LoginPo(screen, userEvent);

        await expect(page.email).toBeInTheDocument();
        await expect(page.password).toBeInTheDocument();
        await expect(page.submitBtn).toBeInTheDocument();
    });

    test("user enter email and password", async () => {
        await FilledForm.run();

        const page = new LoginPo(screen, userEvent);

        expect(page.email).toHaveValue(userData.email);
        expect(page.password).toHaveValue(userData.password);
    });

    test("send form with right data", async () => {
        await FilledForm.run();

        const page = new LoginPo(screen, userEvent);
        await act(async () => {
            await page.submit();
        })

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith({
                email: userData.email,
                password: userData.password,
                rememberMe: userData.rememberMe
            });
        });
    });

    test("rememberMe is in form data", async () => {
        await FilledForm.run();

        const page = new LoginPo(screen, userEvent);

        await act(async () => {
            await page.submit();
        });


        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith(
                expect.objectContaining({rememberMe: true})
            );
        });
    });

    test("redirect after successful login", async () => {
        await FilledForm.run();

        const page = new LoginPo(screen, userEvent);

        await act(async () => {
            await page.submit();
        });

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalled();
        });
    });

    test("show error after submission", async () => {
        mockLogin.mockResolvedValue({
            errors: ["Invalid credentials"]
        });

        await FilledForm.run();

        const page = new LoginPo(screen, userEvent);

        await act(async () => {
            await page.submit();
        });

        expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
    });

    test("store user in redux after success login", async () => {
        const {store} = renderWithProviders(<LoginForm/>);

        await act(async () => {
            await store.dispatch(loginUser(userData));
        });

        expect(store.getState().auth.user).toEqual({
            id: 1,
            email: "test@mail.com"
        });
    });
});
