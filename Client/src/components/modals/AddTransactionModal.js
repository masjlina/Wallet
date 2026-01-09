import Div from "../Div";
import Form from "../Form";
import {View} from "../../core/View";
import {Component} from "../../core/Component";

export class AddTransactionModal extends Component {
    constructor() {
        super();
    }

    init() {
        this.mainComponent = new Div({
            classList: "wrapper modal-underlay__wrapper",
            children: [
                new Div({
                    classList: "wrapper modal__wrapper",
                    children:[
                        new Div({
                            classList: "container modal__container",
                            children: [
                                
                                // Modal Title
                                new Div({
                                    classList: "content modal__content--top text__title",
                                    children: [
                                        
                                    ]
                                }),
                                
                                // Modal Content
                                new Form({
                                    classList: "content modal__content",
                                    children: [
                                        
                                    ]
                                }),
                                
                                // Modal Bottom
                                new Div({
                                    classList: "content modal__content--bottom",
                                    children: [
                                        
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    }

    async mountComponent(parent) {
        this.init();
        await this.mainComponent.mountComponent(parent);
        this.bindListeners();
    }

    unmount() {
        this.mainComponent.unmount();
    }

    async formSubmit(e) {
        // e.preventDefault();
        // if (validate(e.target)) {
        //     const formData = new FormData(e.target);
        //     const response = await loginUser(Object.fromEntries(formData.entries()));
        //     if (response.isRegistrationSuccessful) {
        //         // create user model
        //         navigateTo(urlPaths.home);
        //     } else {
        //         console.log(...response.errors);
        //     }
        // }
    }

    bindListeners() {
    }
}