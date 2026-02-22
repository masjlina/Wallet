// Shared
import InputWithEye from "@/shared/components/InputWithEye/InputWithEye";

// UI
import Input from "@/ui/Input/Input";
import Label from "@/ui/Label/Label";
import Select from "@/ui/Select/Select";
import Textarea from "@/ui/Textarea/Textarea";

const FieldWithLabel = ({
                            id,
                            labelText,
                            as = "input",
                            variant = "default",
                            children,
                            ...props
                        }) => {
    const renderControl = () => {
        if (variant === "password") return <InputWithEye id={id} {...props} />;

        if (as === "select") return <Select id={id} {...props}>{children}</Select>;

        if (as === "textarea") return <Textarea id={id} {...props}/>

        return <Input id={id} {...props} />;
    };

    return (
        <div className="input-section__field">
            <Label id={id} labelText={labelText}></Label>
            {renderControl()}
        </div>
    );
};

export default FieldWithLabel;
