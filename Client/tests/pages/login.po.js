import BasePo from "./base.po";
import {user} from "@/stub/user";

class LoginPo extends BasePo {
    constructor(scope, event) {
        super(scope, event);
    }

    set state(state) {
        this.state.auth = {
            ...this.state.auth,
            ...state
        }
    }

    get email() {
        return this.scope.getByRole("textbox", {name: /email/i});
    }

    async setEmail(value) {
        await this.event.type(this.email, value);
    }

    get password() {
        return this.scope.getByLabelText(/password/i);
    }

    async setPassword(value) {
        await this.event.type(this.password, value);
    }

    get checkbox() {
        return this.scope.queryByRole("checkbox");
    }

    async toggleCheckbox() {
        if (this.checkbox) {
            await this.event.click(this.checkbox);
        }
    }

    get submitBtn() {
        return this.scope.getByRole("button", {name: /login/i});
    }

    async submit() {
        await this.event.click(this.submitBtn);
    }

    async fillForm({email, password, rememberMe} = user) {
        await this.setEmail(email);
        await this.setPassword(password);

        if (rememberMe) {
            await this.toggleCheckbox();
        }
    }
}

export default LoginPo;
