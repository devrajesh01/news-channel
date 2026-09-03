import { useState } from "react";

const useToggle = (
    initialValue: boolean = false
) => {
    const [isOpen, setIsOpen] =
        useState<boolean>(initialValue);

    const toggle = () => {
        setIsOpen((prev) => !prev);
    };

    const close = () => {
        setIsOpen(false);
    };

    const open = () => {
        setIsOpen(true);
    };

    return {
        isOpen,
        close,
        open,
        toggle,
    };
};

export default useToggle;