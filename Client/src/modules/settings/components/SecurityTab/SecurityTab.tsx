import {PasswordField} from "@/modules/auth";

import "./securityTab.scss";
import Button from "@/ui/Button/Button";
import {type ChangeEvent, useEffect, useState} from "react";
import useInput from "@/shared/hooks/useInput";
import {changeUserPassword} from "@/modules/auth/store/authThunks";
import ErrorText from "@/shared/components/ErrorText";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch.ts";
import {useAppSelector} from "@/shared/hooks/useAppSelector.ts";
import type {IChangePasswordRequest} from "@/modules/auth/api/types/changePasswordRequest.ts";

const SecurityTab = () => {
    const dispatch = useAppDispatch();

    const oldPassword = useInput("");
    const newPassword = useInput("");
    const confirmPassword = useInput("");

    const [areInputsChanged, setAreInputsChanged] = useState(false);

    const serverErrors = useAppSelector(state => state.auth.errors);
    const [localErrors, setLocalErrors] = useState<string[]>([]);
    const allErrors = [...localErrors, ...serverErrors];

    useEffect(() => {
        if (oldPassword.value && newPassword.value && confirmPassword.value)
            setAreInputsChanged(true);
    }, [oldPassword.value, newPassword.value, confirmPassword.value]);

    const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newPassword.value !== confirmPassword.value) {
            setLocalErrors(["Passwords do not match"]);
            return;
        }

        const changePasswordDto: IChangePasswordRequest = {
            oldPassword: oldPassword.value,
            newPassword: newPassword.value,
            confirmPassword: confirmPassword.value
        };

        await dispatch(changeUserPassword(changePasswordDto)).unwrap();

        oldPassword.setValue("");
        newPassword.setValue("");
        confirmPassword.setValue("");
    };

    return (
        <form className="security" onSubmit={onSubmit}>
            <div className="security__top">
                <PasswordField
                    id="old-password"
                    labelText="Old password"
                    placeholder="Type your old password"
                    value={oldPassword.value}
                    onChange={oldPassword.onChange}/>
                <PasswordField
                    id="new-password"
                    labelText="New password"
                    placeholder="Create new password"
                    value={newPassword.value}
                    onChange={newPassword.onChange}/>
                <PasswordField
                    id="confirm-password"
                    labelText="Confirm password"
                    placeholder="Repeat new password"
                    value={confirmPassword.value}
                    onChange={confirmPassword.onChange}/>
                {(allErrors.length > 0) && (
                    <ErrorText errors={allErrors}/>
                )}
            </div>

            <div className="security__btns">
                <Button
                    className={`btn__primary w-100
                        ${!areInputsChanged ?
                        "btn--disabled" : ""}
                `}
                    type="submit"
                >Save</Button>
            </div>
        </form>
    );
}

export default SecurityTab;