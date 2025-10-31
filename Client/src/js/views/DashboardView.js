import {Main, Div, Img, Button, P } from "../components/index.js";
import {View} from "../core/View.js";
import { toggleSidebarPosition } from "../Services/sidebarService";
import CarouselIndicator from "../components/CarouselIndicator";

export class DashboardView extends View {
    constructor(parent) {
        super(parent);

        this.location = "/";
    }

    init() {
        this.main = new Main({
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
                new Div({
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
                                                        new Div({
                                                            classList: "side-bar__item",
                                                            children: [
                                                                new Img({
                                                                    classList: "icon",
                                                                    src: "icons/four-blocks.svg",
                                                                    alt: "Dashboard"
                                                                }),
                                                                new P({
                                                                    text: "Dashboard"
                                                                })
                                                            ]
                                                        }),
                                                        new Div({
                                                            classList: "side-bar__item",
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
                                                        new Div({
                                                            classList: "side-bar__item",
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
                                                        new Div({
                                                            classList: "side-bar__item",
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
                                                        new Div({
                                                            classList: "side-bar__item",
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
                        }),

                        // Dashboard
                        new Div({
                            classList: "wrapper dashboard__wrapper",
                            children: [
                                new Div({
                                    classList: "container dashboard__container",
                                    children: [

                                        // Dashboard top
                                        new Div({
                                            classList: "content dashboard__content--top",
                                            children: [

                                                // Month Budget widget
                                                new Div({
                                                    classList: "wrapper widget__wrapper",
                                                    children: [
                                                        new Div({
                                                            classList: "container widget__container",
                                                            children: [
                                                                new Div({
                                                                    classList: "content widget__content--title",
                                                                    children: [
                                                                        new Div({
                                                                            classList: "text text__title",
                                                                            text: "Month Budget"
                                                                        })
                                                                    ]
                                                                }),
                                                                new Div({
                                                                    classList: "content widget__content",
                                                                    children: [
                                                                        new Div({
                                                                            classList: "content month-limit__left-content text",
                                                                            children: [
                                                                                new Div({
                                                                                    classList: "widget__month-limit",
                                                                                    children: [
                                                                                        new P({
                                                                                            classList: "text__base",
                                                                                            text: "Month limit:"
                                                                                        }),
                                                                                        new P({
                                                                                            classList: "text text__base--bold",
                                                                                            text: "$1000"
                                                                                        })
                                                                                    ]
                                                                                }),
                                                                                new Div({
                                                                                    classList: "widget__spent-month",
                                                                                    children: [
                                                                                        new P({
                                                                                            classList: "text__base",
                                                                                            text: "Spent this month:"
                                                                                        }),
                                                                                        new P({
                                                                                            classList: "text text__base--bold",
                                                                                            text: "$800"
                                                                                        })
                                                                                    ]
                                                                                }),
                                                                                new Div({
                                                                                    classList: "widget__rem-balance",
                                                                                    children: [
                                                                                        new P({
                                                                                            classList: "text__base",
                                                                                            text: "Remaining balance:"
                                                                                        }),
                                                                                        new P({
                                                                                            classList: "text text__base--bold",
                                                                                            text: "$200"
                                                                                        })
                                                                                    ]
                                                                                })
                                                                            ]
                                                                        }),
                                                                        new Div({
                                                                            classList: "content month-limit__right-content",
                                                                            children: [
                                                                                new Div({
                                                                                    classList: "graphic",
                                                                                    children: [
                                                                                        new Div({
                                                                                            classList: "graphic__background--bar",
                                                                                            children: [
                                                                                                new Div({
                                                                                                    classList: "graphic__fill--bar"
                                                                                                }),
                                                                                                new P({
                                                                                                    classList: "graphic__fill--procent",
                                                                                                    text: "80%"
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
                                                }),

                                                // Day Limit widget
                                                new Div({
                                                    classList: "wrapper widget__wrapper",
                                                    children: [
                                                        new Div({
                                                            classList: "container widget__container",
                                                            children: [
                                                                new Div({
                                                                    classList: "content day-limit__graphic-content text",
                                                                    children: [
                                                                        new Div({
                                                                            classList: "graphic",
                                                                            children: [
                                                                                new Div({
                                                                                    classList: "graphic__background--radial",
                                                                                    children: [
                                                                                        new Div({
                                                                                            classList: "graphic__fill--radial"
                                                                                        }),
                                                                                        new Div({
                                                                                            classList: "graphic__overlap--radial",
                                                                                            children: [
                                                                                                new P({
                                                                                                    classList: "text__base text__base--inactive",
                                                                                                    text: "Day Limit"
                                                                                                }),
                                                                                                new P({
                                                                                                    classList: "text__primary",
                                                                                                    text: "$50/100"
                                                                                                }),
                                                                                            ]
                                                                                        })
                                                                                    ]
                                                                                })
                                                                            ]
                                                                        })
                                                                    ]
                                                                }),
                                                                new Div({
                                                                    classList: "content day-limit__bottom-content text__btn",
                                                                    children: [
                                                                        new Button({
                                                                            classList: "btn btn__day-limit--fill",
                                                                            text: "Expense"
                                                                        }),
                                                                        new Button({
                                                                            classList: "btn btn__day-limit--empty",
                                                                            text: "Income"
                                                                        })
                                                                    ]
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),

                                                // My Accounts widget
                                                new Div({
                                                    classList: "wrapper widget__wrapper",
                                                    children: [
                                                        new Div({
                                                            classList: "container widget__container",
                                                            children: [
                                                                new Div({
                                                                    classList: "content widget__content--title",
                                                                    props: "id='accounts__content-top'",
                                                                    children: [
                                                                        new Div({
                                                                            classList: "text text__title",
                                                                            text: "My Accounts"
                                                                        }),
                                                                        new Div({
                                                                            classList: "view-all",
                                                                            children: [
                                                                                new Div({
                                                                                    classList: "text text__link",
                                                                                    text: "View All"
                                                                                }),
                                                                                new Img({
                                                                                    classList: "icon--widget__arrow",
                                                                                    src: "icons/right-arrow.svg"
                                                                                })
                                                                            ]
                                                                        })
                                                                    ]
                                                                }),
                                                                new Div({
                                                                    classList: "content accounts__content--main",
                                                                    children: [
                                                                        new Div({
                                                                            classList: "accounts__carousel--underlay",
                                                                            children: [
                                                                                new Div({
                                                                                    classList: "accounts__carousel--background",
                                                                                    children: [
                                                                                        new Div({
                                                                                            classList: "accounts__carousel__btn--left",
                                                                                        }),
                                                                                        new Div({
                                                                                            classList: "accounts__carousel__btn--right",
                                                                                        }),
                                                                                        new Div({
                                                                                            classList: "accounts__carousel--hover",
                                                                                            children: [
                                                                                                new Div({
                                                                                                    classList: "content card__content",
                                                                                                    children: [
                                                                                                        new Div({
                                                                                                            classList: "content card__content--top text text__base text__base--white",
                                                                                                            children: [
                                                                                                                new Div({
                                                                                                                    text: "Account Type"
                                                                                                                }),
                                                                                                                new Div({
                                                                                                                    classList: "text__title text__title--bolder-white",
                                                                                                                    text: "Credit Card"
                                                                                                                }),
                                                                                                                new Div({
                                                                                                                    text: "•••• •••• •••• 1289"
                                                                                                                })
                                                                                                            ]
                                                                                                        }),
                                                                                                        new Div({
                                                                                                            classList: "content card__content--bottom",
                                                                                                            children: [
                                                                                                                new Div({
                                                                                                                    text: "09/25"
                                                                                                                }),
                                                                                                                new Div({
                                                                                                                    classList: "text__title text__title--white",
                                                                                                                    text: "$5 720.20"
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
                                                                        }),
                                                                        new Div({
                                                                            classList: "accounts__carousel__indicator",
                                                                            children: [
                                                                                new CarouselIndicator()
                                                                            ]
                                                                        })
                                                                    ]
                                                                }),
                                                                new Div({
                                                                    classList: "content accounts__content--bottom text text__base",
                                                                    children: [
                                                                        new Div({
                                                                            text: "Total balance:"
                                                                        }),
                                                                        new Div({
                                                                            classList: "text__base--bold",
                                                                            text: "$250.399"
                                                                        })
                                                                    ]
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),

                                        // Dashboard bottom
                                        new Div({
                                            classList: "content dashboard__content--bottom",
                                            children: [

                                                // Recent Transactions widget
                                                new Div({
                                                    classList: "wrapper widget__wrapper",
                                                    children: [
                                                        new Div({
                                                            classList: "container widget__container",
                                                            children: [
                                                                new Div({
                                                                    classList: "content widget__content--title",
                                                                    children: [
                                                                        new Div({
                                                                            classList: "text text__title",
                                                                            text: "Recent Transactions"
                                                                        }),
                                                                        new Div({
                                                                            classList: "view-all",
                                                                            children: [
                                                                                new Div({
                                                                                    classList: "text text__link",
                                                                                    text: "View All"
                                                                                }),
                                                                                new Img({
                                                                                    classList: "icon--widget__arrow",
                                                                                    src: "icons/right-arrow.svg",
                                                                                    alt: "Right arrow"
                                                                                })
                                                                            ]
                                                                        })
                                                                    ]
                                                                }),
                                                                new Div({
                                                                    classList: "content recent-transactions__table-content text text__table",
                                                                    children: [
                                                                        new Div({
                                                                            classList: "table table__column",
                                                                            children: [
                                                                                new Div({
                                                                                    classList: "table table__first-block",
                                                                                    text: "NAME"
                                                                                }),
                                                                                new Div({
                                                                                    text: "TYPE"
                                                                                }),
                                                                                new Div({
                                                                                    text: "AMOUNT"
                                                                                }),
                                                                                new Div({
                                                                                    text: "DATE"
                                                                                }),
                                                                            ]
                                                                        }),
                                                                        new Div({
                                                                            classList: "table table__content text",
                                                                            children: [
                                                                                new Div({
                                                                                    classList: "table table__row",
                                                                                    children: [
                                                                                        new Div({
                                                                                            classList: "table table__first-block",
                                                                                            children: [
                                                                                                new Div({
                                                                                                    classList: "icon--table__expense"
                                                                                                }),
                                                                                                new Div({
                                                                                                    classList: "text__table--name",
                                                                                                    text: "Iphone 13 Pro MAX"
                                                                                                })
                                                                                            ]
                                                                                        }),
                                                                                        new Div({
                                                                                            text: "Mobile"
                                                                                        }),
                                                                                        new Div({
                                                                                            classList: "text__table__amount--expense",
                                                                                            text: "-$990,50"
                                                                                        }),
                                                                                        new Div({
                                                                                            classList: "text__table--date",
                                                                                            text: "12.01.2020<br>09:34"
                                                                                        })
                                                                                    ]
                                                                                }),
                                                                                new Div({
                                                                                    classList: "table table__row",
                                                                                    children: [
                                                                                        new Div({
                                                                                            classList: "table table__first-block",
                                                                                            children: [
                                                                                                new Div({
                                                                                                    classList: "icon--table__income"
                                                                                                }),
                                                                                                new Div({
                                                                                                    classList: "text__table--name",
                                                                                                    text: "Netflix Subscription"
                                                                                                })
                                                                                            ]
                                                                                        }),
                                                                                        new Div({
                                                                                            text: "Entertainment"
                                                                                        }),
                                                                                        new Div({
                                                                                            classList: "text__table__amount--income",
                                                                                            text: "+$20"
                                                                                        }),
                                                                                        new Div({
                                                                                            classList: "text__table--date",
                                                                                            text: "12.01.2020<br>09:34"
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
                                                }),

                                                // Month Activities widget
                                                new Div({
                                                    classList: "wrapper widget__wrapper",
                                                    children: [
                                                        new Div({
                                                            classList: "container widget__container",
                                                            children: [
                                                                new Div({
                                                                    classList: "content widget__content--title",
                                                                    children: [
                                                                        new Div({
                                                                            classList: "text text__title",
                                                                            text: "Month Activities"
                                                                        }),
                                                                        new Div({
                                                                            classList: "content widget__content--title-right",
                                                                            children: [
                                                                                new Img({
                                                                                    classList: "icon icon--base-24",
                                                                                    src: "icons/calendar.svg"
                                                                                }),
                                                                                new P({
                                                                                    text: "Jan 21 - Sep 21, 2022"
                                                                                })
                                                                            ]
                                                                        })
                                                                    ]
                                                                }),
                                                                new Div({
                                                                    classList: "content activities__graphic-content",
                                                                    children: [
                                                                        new Img({
                                                                            classList: "graphic",
                                                                            src: "icons/graphic.svg"
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
                                }),
                            ]
                        })
                    ]
                })
            ]
        })
    }

    async mount() {
        await this.main.mount(this.parent);
        this.bindListeners();
    }

    unmount() {
        this.main.unmount();
    }

    bindListeners() {
        this.sidebarArrow.element.addEventListener("click", () => {
            toggleSidebarPosition(this.sidebar.element)
        })
    }
}