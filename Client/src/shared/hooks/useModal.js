// React
import { useState } from "react";

const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const openModal = (e) => {
        setIsOpen(true);
        setAnchorEl(e?.currentTarget ?? null);
    };

    const closeModal = () => {
        setIsOpen(false);
        setAnchorEl(null);
    };

    return { isOpen, anchorEl, openModal, closeModal };
};

export default useModal;
