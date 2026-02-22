// Styles
import "./widget.scss";

const WidgetRoot = ({children, className = ""}) => {
    return (
        <section className={`wrapper widget__wrapper ${className}`}>
            <div className="container widget__container">
                {children}
            </div>
        </section>
    );
};

const Header = ({children}) => {
    return <header className="widget__header">{children}</header>;
};

const Content = ({children, className = ""}) => {
    return <main className={`content widget__content ${className}`}>{children}</main>;
};

const Footer = ({children, className = ""}) => {
    return <footer className={`content widget__footer ${className}`}>{children}</footer>;
};

export const Widget = Object.assign(WidgetRoot, {
    Header,
    Content,
    Footer
});
