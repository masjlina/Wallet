import {PasswordField} from "@/modules/auth";

import "./securityTab.scss";
import Button from "@/ui/Button/Button";
import {useEffect, useState} from "react";
import useInput from "@/shared/hooks/useInput";
import {useDispatch, useSelector} from "react-redux";
import {changeUserPassword} from "@/modules/auth/store/authThunks";
import {} from "@/modules/auth/api/types/changePasswordRequest";
import ErrorText from "@/shared/components/ErrorText";

const SecurityTab = () => {
    const dispatch = useDispatch();

    const oldPassword = useInput("");
    const newPassword = useInput("");
    const confirmPassword = useInput("");

    const [areInputsChanged, setAreInputsChanged] = useState(false);

    const serverErrors = useSelector(state => state.auth.errors);
    const [localErrors, setLocalErrors] = useState([]);
    const allErrors = [...localErrors, ...serverErrors];

    useEffect(() => {
        if (oldPassword.value && newPassword.value && confirmPassword.value)
            setAreInputsChanged(true);
    }, [oldPassword.value, newPassword.value, confirmPassword.value]);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (newPassword.value !== confirmPassword.value) {
            setLocalErrors(["Passwords do not match"]);
            return;
        }

        const changePasswordDto = createChangePasswordDto({
            oldPassword: oldPassword.value,
            newPassword: newPassword.value,
            confirmPassword: confirmPassword.value
        });

        try {
            await dispatch(changeUserPassword(changePasswordDto)).unwrap();

            oldPassword.setValue("");
            newPassword.setValue("");
            confirmPassword.setValue("");
        } catch (errors) {
        }
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