// Shared
import InputWithEye from "@/shared/components/InputWithEye/InputWithEye";

// UI
import Input from "@/ui/Input/Input";
import Label from "@/ui/Label/Label";
import Select from "@/ui/Select/Select";
import Textarea from "@/ui/Textarea/Textarea";
import type {ComponentPropsWithRef, ReactNode} from "react";

type AsComponents = {
    input: typeof Input;
    select: typeof Select;
    textarea: typeof Textarea;
}

export type IFieldWithLabelProps<T extends keyof AsComponents = "input"> = {
    id: string;
    labelText?: string;
    as?: "input" | "select" | "textarea";
    variant?: "default" | "password";
    children?: ReactNode;
} & ComponentPropsWithRef<AsComponents[T]>;

const FieldWithLabel = <T extends keyof AsComponents = "input">({
                            id,
                            labelText,
                            as,
                            variant = "default",
                            children,
                            ...props
                                                                }: IFieldWithLabelProps<T>) => {
    const controlProps = props as any;

    const renderControl = (): ReactNode => {
        if (variant === "password") return <InputWithEye id={id} {...controlProps} />;

        if (as === "select") return <Select id={id} {...controlProps}>{children}</Select>;

        if (as === "textarea") return <Textarea id={id} {...controlProps}/>

        return <Input id={id} {...controlProps} />;
    };

    return (
        <div className="input-section__field">
            <Label id={id} labelText={labelText ?? ""}></Label>
            {renderControl()}
        </div>
    );
};

export default FieldWithLabel;
