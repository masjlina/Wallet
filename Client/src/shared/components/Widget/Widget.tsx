// Styles
import "./widget.scss";
import type {ReactNode} from "react";

interface IBaseProps {
    children: ReactNode | ReactNode[];
    className?: string;
}

const WidgetRoot = ({children, className = ""}: IBaseProps) => {
    return (
        <section className={`wrapper widget__wrapper ${className}`}>
            <div className="container widget__container">
                {children}
            </div>
        </section>
    );
};

const Header = ({children}: IBaseProps) => {
    return <header className="widget__header">{children}</header>;
};

const Content = ({children, className = ""}: IBaseProps) => {
    return <main className={`content widget__content ${className}`}>{children}</main>;
};

const Footer = ({children, className = ""}: IBaseProps) => {
    return <footer className={`content widget__footer ${className}`}>{children}</footer>;
};

export const Widget = Object.assign(WidgetRoot, {
    Header,
    Content,
    Footer
});
