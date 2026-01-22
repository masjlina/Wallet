import "./accounts.scss";
import Toolbar from "../../../components/Toolbar/components/Toolbar/Toolbar";
import ButtonCreateEntity from "../../../components/Toolbar/components/ButtonCreateEntity/ButtonCreateEntity";
import CardWidget from "../CardWidget/CardWidget";

const Accounts = () => {
    return (
        <div className="container content__container">
            <Toolbar>
                <div/>
                <ButtonCreateEntity text="Add account"/>
            </Toolbar>


            <div className="accounts">
                <CardWidget/>
                <CardWidget/>
                <CardWidget/>
                <CardWidget/>
                <CardWidget/>
                <CardWidget/>
                <CardWidget/>
                <CardWidget/>
                <CardWidget/>
            </div>
        </div>

    );
}

export {Accounts};