// UI
import Logo from "@/ui/Logo/Logo";

const AuthLayout = ({children}) => {
    return (
        <div className="log-reg__wrapper">
            <div className="log-reg__container">
                <Logo/>
                {children}
            </div>
        </div>
    );
}

export default AuthLayout;