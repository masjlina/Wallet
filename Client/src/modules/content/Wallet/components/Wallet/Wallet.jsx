import "./wallet.scss";
import Toolbar from "../../../components/Toolbar/components/Toolbar/Toolbar";
import ButtonCreateEntity from "../../../components/Toolbar/components/ButtonCreateEntity/ButtonCreateEntity";
import CardWidget from "../CardWidget/CardWidget";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserWallet} from "../../store/thunks";
import {Widget} from "../../../../../components/Widget/Widget";
import Button from "../../../../../ui/Button/Button";
import useModal from "../../../../../hooks/useModal";
import CreateWalletModal from "../CreateWalletModal/CreateWalletModal";

const Wallet = () => {
    const dispatch = useDispatch();
    const wallet = useSelector(state => state.wallet.wallet);
    const user = useSelector(state => state.auth.user);
    const modal = useModal();


    // useEffect(() => {
    //     (async () => {
    //         await dispatch(getUserWallet()).unwrap();
    //     })();
    // }, []);

    return (
        <div className="container content__container">
            {!wallet ?
                <Widget>
                    <Widget.Content className="text text__title d-center">
                        <Button
                            className="btn__add"
                        onClick={modal.openModal}>Create wallet</Button>
                    </Widget.Content>
                </Widget>
                :
                <>
                    <Toolbar>
                        <div/>
                        <ButtonCreateEntity text="Add account"/>
                    </Toolbar>


                    <div className="accounts">
                        <CardWidget/>
                    </div>
                </>}
            <CreateWalletModal isOpen={modal.isOpen} onClose={modal.closeModal}/>
        </div>
    );
}

export {Wallet};