// Shared
import FieldWithLabel, {type IFieldWithLabelProps} from "@/shared/components/FieldWithLabel/FieldWithLabel";

// Styles
import "./fieldWithIcon.scss";

interface IProps extends IFieldWithLabelProps {
    icon: string
}

const FieldWithIcon = ({
                           as = "input",
                           icon,
                           className = "",
                           children,
                           ...props
                       }: IProps) => {
    return (
        <div className="input-section__with-icon-wrapper">
            <FieldWithLabel
                as={as}
                className={className}
                {...props}
            >
                {children}
            </FieldWithLabel>

            <img className="input-select__icon" src={icon} alt=""/>
        </div>
    );
};

export default FieldWithIcon;
