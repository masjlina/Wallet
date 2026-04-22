import {screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {afterEach, test} from "vitest"
import * as authModule from "@/modules/auth";
import {LoginForm} from "@/modules/auth";
import {renderWithProviders} from "@/shared/utils/test-utils";
import Statuses from "@/shared/consts/statuses";

const {mockNavigate} = vi.hoisted(() => ({
    mockNavigate: vi.fn()
}));

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");

    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

const DEFAULT_CREDENTIALS = {
    email: "test@mail.com",
    password: "123456"
};

const renderLoginForm = (preloadedState) => {
    renderWithProviders(<LoginForm/>, preloadedState);

    return {
        emailInput: screen.getByRole("textbox"),
        passwordInput: screen.getByLabelText(/password/i),
        submitButton: screen.getByRole("button", {name: /login/i}),
        rememberMeCheckbox: screen.queryByRole("checkbox")
    };
};

const fillLoginForm = async ({
                                 email = DEFAULT_CREDENTIALS.email,
                                 password = DEFAULT_CREDENTIALS.password
                             } = {}) => {
    const emailInput = screen.getByRole("textbox");
    const passwordInput = screen.getByLabelText(/password/i);

    await userEvent.type(emailInput, email);
    await userEvent.type(passwordInput, password);

    return {emailInput, passwordInput};
};

const mockSuccessfulLogin = () => vi.spyOn(authModule, "loginUser").mockReturnValue(() => ({
    unwrap: () => Promise.resolve()
}));


describe("LoginForm", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    test("render login form", () => {
        const {emailInput, passwordInput, submitButton} = renderLoginForm();

        expect(submitButton).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    });

    test("user enter email and password", async () => {
        renderLoginForm();

        const {emailInput, passwordInput} = await fillLoginForm({
            password: "$2Teaqpd"
        });

        expect(emailInput).toHaveValue(DEFAULT_CREDENTIALS.email);
        expect(passwordInput).toHaveValue("$2Teaqpd");
    });

    test("send form with right data", async () => {
        mockSuccessfulLogin();
        const {submitButton} = renderLoginForm();

        await fillLoginForm();
        await userEvent.click(submitButton);

        expect(authModule.loginUser).toHaveBeenCalledWith({
            email: DEFAULT_CREDENTIALS.email,
            password: DEFAULT_CREDENTIALS.password,
            rememberMe: false
        });
    });

    test("rememberMe is in form data", async () => {
        mockSuccessfulLogin();
        const {rememberMeCheckbox, submitButton} = renderLoginForm();

        await fillLoginForm();
        await userEvent.click(rememberMeCheckbox);
        await userEvent.click(submitButton);

        expect(authModule.loginUser).toHaveBeenCalledWith(
            expect.objectContaining({rememberMe: true})
        );
    });

    test("redirect after successful login", async () => {
        mockSuccessfulLogin();
        const {submitButton} = renderLoginForm({
            auth: {
                status: Statuses.IDLE,
                errors: []
            }
        });

        await fillLoginForm();
        await userEvent.click(submitButton);

        expect(mockNavigate).toHaveBeenCalled();
    });

    test("show error after submission", async () => {
        const {submitButton} = renderLoginForm({
            auth: {
                status: Statuses.IDLE,
                errors: ["Invalid credentials"]
            }
        });

        await fillLoginForm();
        await userEvent.click(submitButton);

        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
});
