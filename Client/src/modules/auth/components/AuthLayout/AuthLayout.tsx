// UI
import Logo from "@/ui/Logo/Logo";
import type {ReactNode} from "react";

interface IProps {
    children: ReactNode | ReactNode[];
}

const AuthLayout = ({children}: IProps) => {
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