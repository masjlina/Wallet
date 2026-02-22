// Shared
import FieldWithLabel from "@/shared/components/FieldWithLabel/FieldWithLabel";

// Styles
import "./fieldWithIcon.scss";

const FieldWithIcon = ({
                           id,
                           labelText,
                           as = "input",
                           icon,
                           className,
                           children,
                           ...props
                       }) => {
    return (
        <div className="input-section__with-icon-wrapper">
            <FieldWithLabel
                id={id}
                labelText={labelText}
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
