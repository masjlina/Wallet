import {Main, Div, Img, P } from "../components/index.js";
import { toggleSidebarPosition } from "../services/underlayService";
import {View} from "../core/View";
import urlPaths from "../utils/enumeration";
import {navigateTo} from "../utils";
import {Button} from "../components";

export class UnderlayView extends View {
    constructor(parent) {
        super(parent);
    }

    init() {
         this.mainComponent = new Main({
            classList: "wrapper main__wrapper",
            children: [
                // Header
                new Div({
                    classList: "wrapper header__wrapper",
                    children: [
                        new Div({
                            classList: "container header__container",
                            children: [
                                new Img({
                                    classList: "icon--side-bar__logo",
                                    src: "img/logo.svg",
                                    alt: "Spend tracker"
                                }),
                                new Div({
                                    classList: "content header-content",
                                    children: [
                                        new Img({
                                            classList: "icon",
                                            src: "icons/bell.svg",
                                            alt: "bell"
                                        }),
                                        new Img({
                                            classList: "icon--profile",
                                            src: "img/profile.png",
                                            alt: "profile"
                                        })
                                    ]
                                })
                            ],
                        })
                    ]
                }),

                // Rest of
                this.parentMainContent = new Div({
                    classList: "wrapper center__wrapper",
                    children: [

                        // Sidebar
                        this.sidebar = new Div({
                            classList: "wrapper side-bar__wrapper",
                            children: [
                                new Div({
                                    classList: "container side-bar__container",
                                    children: [
                                        new Div({
                                            children: [
                                                this.sidebarArrow = new Img({
                                                    classList: "icon--side-bar__arrow",
                                                    src: "icons/left-arrow.svg",
                                                    alt: "Left arrow"
                                                })
                                            ]
                                        }),
                                        new Div({
                                            classList: "content side-bar-content",
                                            children: [

                                                // Sidebar top
                                                new Div({
                                                    classList: "side-bar__top",
                                                    children: [
                                                        new Button({
                                                            classList: "side-bar__item btn btn__nav",
                                                            props: `data-page=${urlPaths.home}`,
                                                            children: [
                                                                new Img({
                                                                    classList: "icon",
                                                                    src: "icons/four-blocks.svg",
                                                                    alt: "Dashboard",
                                                                }),
                                                                new P({
                                                                    text: "Dashboard"
                                                                })
                                                            ]
                                                        }),
                                                        new Button({
                                                            classList: "side-bar__item btn btn__nav",
                                                            props: `data-page=${urlPaths.transactions}`,
                                                            children: [
                                                                new Img({
                                                                    classList: "icon",
                                                                    src: "icons/dot-list.svg",
                                                                    alt: "Transactions"
                                                                }),
                                                                new P({
                                                                    text: "Transactions"
                                                                })
                                                            ]
                                                        }),
                                                        new Button({
                                                            classList: "side-bar__item btn btn__nav",
                                                            props: `data-page=${urlPaths.wallet}`,
                                                            children: [
                                                                new Img({
                                                                    classList: "icon",
                                                                    src: "icons/wallet.svg",
                                                                    alt: "Wallet"
                                                                }),
                                                                new P({
                                                                    text: "Wallet"
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),

                                                // Sidebar bottom
                                                new Div({
                                                    classList: "side-bar__bottom",
                                                    children: [
                                                        new Button({
                                                            classList: "side-bar__item btn btn__nav",
                                                            props: `data-page=${urlPaths.settings}`,
                                                            children: [
                                                                new Img({
                                                                    classList: "icon",
                                                                    src: "icons/gear.svg",
                                                                    alt: "Settings"
                                                                }),
                                                                new P({
                                                                    text: "Settings"
                                                                })
                                                            ]
                                                        }),
                                                        new Button({
                                                            classList: "side-bar__item btn btn__nav",
                                                            props: `data-page=${urlPaths.logout}`,
                                                            children: [
                                                                new Img({
                                                                    classList: "icon",
                                                                    src: "icons/out-door.svg",
                                                                    alt: "Logout"
                                                                }),
                                                                new P({
                                                                    text: "Logout"
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    }

    async mountView() {
        this.init();
        await this.mainComponent.mountComponent(this.parent);
        this.bindListeners();
    }

    unmount() {
        this.mainComponent.unmount();
    }

    bindListeners() {
        this.sidebarArrow.element.addEventListener("click", () => {
            toggleSidebarPosition(this.sidebar.element)
        });
        this.sidebar.element.addEventListener("click", (e) => {
            const btn = e.target.closest(".btn__nav");
            const page = btn.dataset.page;

            navigateTo(page);
        })
    }
}