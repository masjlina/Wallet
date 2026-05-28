// React
import {type ChangeEvent, useState} from "react";

type AnchorElType = HTMLAnchorElement | null;
type OpenModalEventType = ChangeEvent<HTMLAnchorElement>;

interface IReturn {
    isOpen: boolean,
    anchorEl: AnchorElType,
    openModal: (e: OpenModalEventType) => void,
    closeModal: () => void
}

const useModal = (): IReturn => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<AnchorElType>(null);

    const openModal = (e: OpenModalEventType): void => {
        setIsOpen(true);
        setAnchorEl(e.currentTarget ?? null);
    };

    const closeModal = (): void => {
        setIsOpen(false);
        setAnchorEl(null);
    };

    return { isOpen, anchorEl, openModal, closeModal };
};

export default useModal;
