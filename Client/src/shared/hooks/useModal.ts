// React
import {type MouseEvent, useState} from "react";

type AnchorElType = HTMLElement | null;

interface IReturn {
    isOpen: boolean;
    anchorEl: AnchorElType;
    openModal: (e?: MouseEvent<HTMLElement>) => void;
    closeModal: () => void;
}

const useModal = (): IReturn => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<AnchorElType>(null);

    const openModal = (e?: MouseEvent<HTMLElement>): void => {
        setIsOpen(true);
        if (e?.currentTarget) {
            setAnchorEl(e.currentTarget);
        }
    };

    const closeModal = (): void => {
        setIsOpen(false);
        setAnchorEl(null);
    };

    return { isOpen, anchorEl, openModal, closeModal };
};

export default useModal;
