import {act, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {afterEach, test} from "vitest"
import {LoginForm, loginUser} from "@/modules/auth";
import {renderWithProviders} from "@/shared/utils/test-utils";
import Statuses from "@/shared/consts/statuses";

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

const DEFAULT_CREDENTIALS = {
    email: "test@mail.com",
    password: "123456",
    rememberMe: false
};

const createUser = () => userEvent.setup();

const renderLoginForm = (preloadedState) => {
    const {store} = renderWithProviders(<LoginForm/>, preloadedState);

    return {
        store,
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
    const user = createUser();
    const emailInput = screen.getByRole("textbox");
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, email);
    await user.type(passwordInput, password);

    return {emailInput, passwordInput, user};
};

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
        const {submitButton} = renderLoginForm();

        const {user} = await fillLoginForm();
        await user.click(submitButton);

        expect(mockLogin).toHaveBeenCalledWith({
            email: DEFAULT_CREDENTIALS.email,
            password: DEFAULT_CREDENTIALS.password,
            rememberMe: false
        });
    });

    test("rememberMe is in form data", async () => {
        const {rememberMeCheckbox, submitButton} = renderLoginForm();

        const {user} = await fillLoginForm();
        await user.click(rememberMeCheckbox);
        await user.click(submitButton);

        expect(mockLogin).toHaveBeenCalledWith(
            expect.objectContaining({rememberMe: true})
        );
    });

    test("redirect after successful login", async () => {
        const {submitButton} = renderLoginForm({
            auth: {
                status: Statuses.IDLE,
                errors: []
            }
        });

        const {user} = await fillLoginForm();
        await user.click(submitButton);

        expect(mockNavigate).toHaveBeenCalled();
    });

    test("show error after submission", async () => {
        mockLogin.mockResolvedValue({
            errors: ["Invalid credentials"]
        });

        const {submitButton} = renderLoginForm({
            auth: {
                status: Statuses.IDLE,
                errors: ["Invalid credentials"]
            }
        });

        const {user} = await fillLoginForm();
        await user.click(submitButton);

        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });

    test("store user in redux after success login", async () => {
        const {store} = renderLoginForm();

        await act(async () => {
            await store.dispatch(loginUser(DEFAULT_CREDENTIALS));
        });

        expect(store.getState().auth.user).toEqual({
            id: 1,
            email: "test@mail.com"
        });
    });
});
