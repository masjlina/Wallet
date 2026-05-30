export const MODAL_VARIANT = {
    CENTRAL: "central",
    CONTEXT: "context",
    TOAST: "toast"
} as const;

export type ModalVariantType = typeof MODAL_VARIANT[keyof typeof MODAL_VARIANT];
