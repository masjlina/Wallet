import profileIcon from "@/assets/img/profile.svg";
import ButtonCreateEntity from "@/shared/components/Toolbar/components/ButtonCreateEntity/ButtonCreateEntity";

import "./profileTab.scss"
import {FirstNameField, LastNameField} from "@/modules/auth";
import Button from "@/ui/Button/Button";
import useInput from "@/shared/hooks/useInput";
import type {MouseEvent} from "react";
import {type ChangeEvent, useEffect, useMemo, useState} from "react";
import {arePairsEqual} from "@/shared/utils/arePairsEqual";
import {updateApplicationUser} from "@/modules/user";
import {removeApplicationUserAvatar, uploadApplicationUserAvatar} from "@/modules/user/store/userThunks";
import {SERVER_URL} from "@/shared/consts/endpoints";
import type {IUser, IUserToUpdate} from "@/domain/user.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch.ts";

type PropsType = Pick<IUser, "firstName" | "lastName" | "avatarUri">;

const ProfileTab = ({firstName, lastName, avatarUri}: PropsType) => {
    const dispatch = useAppDispatch();

    const firstNameInput = useInput(firstName ?? "");
    const lastNameInput = useInput(lastName ?? "");

    const [areInputsChanged, setAreInputsChanged] = useState(false);

    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const avatarSrc = useMemo(() => {
        return avatarPreview ||
            (avatarUri ? `${SERVER_URL}${avatarUri}?t=${encodeURIComponent(avatarUri)}` : null) ||
            profileIcon;
    }, [avatarPreview, avatarUri]);

    const onDiscard = () => {
        firstNameInput.setValue(firstName ?? "");
        lastNameInput.setValue(lastName ?? "");
        setAvatarPreview(null);
        setAvatarFile(null);
    };

    const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const userToUpdate: IUserToUpdate = {
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
        };

        await dispatch(updateApplicationUser(userToUpdate));

        if (avatarFile) {
            const formData = new FormData();
            formData.append("avatar", avatarFile);

            await dispatch(uploadApplicationUserAvatar(formData));
            setAreInputsChanged(false);
        }
    };

    const onAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e?.target?.files?.[0];

        if (!file) return;

        setAvatarFile(file);

        const preview = URL.createObjectURL(file);
        setAvatarPreview(preview);
        setAreInputsChanged(true);
    };

    const onRemoveAvatar = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (avatarSrc !== profileIcon) {
            setAvatarPreview(null);
            setAvatarFile(null);
            await dispatch(removeApplicationUserAvatar());
        }
    };

    useEffect(() => {
        return () => {
            if (avatarPreview) URL.revokeObjectURL(avatarPreview);
        };
    }, [avatarPreview]);

    useEffect(() => {
        firstNameInput.setValue(firstName ?? "");
        lastNameInput.setValue(lastName ?? "");
    }, [firstName, lastName]);

    useEffect(() => {
        setAreInputsChanged(!arePairsEqual(
            firstNameInput.value, firstName,
            lastNameInput.value, lastName,
        ));
    }, [firstNameInput.value, lastNameInput.value, firstName, lastName]);

    return (
        <form className="profile">
            <div className="profile__top">
                <div className="profile__image">
                    <img
                        className="icon__r-50 icon--profile--big"
                        src={avatarSrc}
                        alt="profile"
                    />
                    <div className="profile__image--control">
                        <input
                            type="file"
                            accept="image/*"
                            style={{display: "none"}}
                            id="avatarInput"
                            onChange={onAvatarChange}
                        />
                        <ButtonCreateEntity
                            className="profile__btn-load"
                            text="Load image"
                            onClick={() => document.getElementById("avatarInput")?.click()}
                        />
                        <button className="btn text--red" onClick={onRemoveAvatar}>Remove</button>
                    </div>

                </div>
                <div className="profile__input">
                    <FirstNameField
                        value={firstNameInput.value}
                        onChange={firstNameInput.onChange}
                        className="profile__field"/>
                    <LastNameField
                        value={lastNameInput.value}
                        onChange={lastNameInput.onChange}
                        className="profile__field"/>
                </div>
            </div>

            <div className="profile__btns">
                <Button
                    className={`btn__primary--empty 
                        ${!areInputsChanged ?
                        "btn--disabled" : ""} 
                        `}
                    type="button"
                    onClick={onDiscard}>Discard</Button>
                <Button
                    className={`btn__primary 
                        ${!areInputsChanged ?
                        "btn--disabled" : ""} 
                        `}
                    type="submit"
                    onClick={onSubmit}
                >Save</Button>
            </div>
        </form>
    );
}

export default ProfileTab;
