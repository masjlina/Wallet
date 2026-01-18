// import {Div, Img, Button, P} from "../components/index.js";
// import {View} from "../core/View.js";
// import Table from "../components/Table";
// import Thead from "../components/Thead";
// import Tr from "../components/Tr";
// import Th from "../components/Th";
// import Tbody from "../components/Tbody";
// import Td from "../components/Td";
// import {diContainer} from "../utils/DiContainer";
// import MoreActionsModal from "../components/modals/MoreActionsModal";
// import {AddTransactionModal} from "../components/modals/AddTransactionModal";
//
// export class TransactionsView extends View {
//     constructor(parent) {
//         super(parent);
//
//         this.location = "/";
//     }
//
//     init() {
//         this.underlayView = diContainer.get("underlay").value;
//
//         // Transactions
//         this.mainComponent = new Div({
//             classList: "container content__container",
//             children: [
//
//                 // Control
//                 new Div({
//                     classList: "content transactions__content--top",
//                     children: [
//                         new Div({
//                             classList: "wrapper widget__wrapper",
//                             children: [
//                                 new Div({
//                                     classList: "container widget__container",
//                                     children: [
//                                         new Div({
//                                             classList: "content widget__content--control",
//                                             children: [
//                                                 new Div({
//                                                     classList: "tabs text text__title",
//                                                     children: [
//                                                         new Button({
//                                                             classList: "btn btn__nav--text",
//                                                             text: "All"
//                                                         }),
//                                                         new Button({
//                                                             classList: "btn btn btn__nav--text",
//                                                             text: "Incomes"
//                                                         }),
//                                                         new Button({
//                                                             classList: "btn btn btn__nav--text",
//                                                             text: "Expenses"
//                                                         })
//                                                     ]
//                                                 }),
//                                                 this.addTransaction = new Button({
//                                                     classList: "btn btn__primary btn__add-transaction text text__base--bold text__base--white",
//                                                     children: [
//                                                         new Img({
//                                                             src: "icons/plus.svg",
//                                                             alt: "plus"
//                                                         }),
//                                                         new P({
//                                                             text: "Add transaction"
//                                                         })
//                                                     ]
//                                                 })
//                                             ]
//                                         })
//                                     ]
//                                 })
//                             ]
//                         })
//                     ]
//                 }),
//
//                 // Content
//                 new Div({
//                     classList: "content transactions__content",
//                     children: [
//                         new Div({
//                             classList: "wrapper widget__wrapper",
//                             children: [
//                                 new Div({
//                                     classList: "container widget__container",
//                                     children: [
//                                         new Div({
//                                             classList: "content widget__content",
//                                             children: [
//                                                 new Table({
//                                                     classList: "table text text__table",
//                                                     children: [
//                                                         new Thead({
//                                                             children: [
//                                                                 new Tr({
//                                                                     children: [
//                                                                         new Th({
//                                                                             text: "NAME/BUSINESS"
//                                                                         }),
//                                                                         new Th({
//                                                                             text: "AMOUNT"
//                                                                         }),
//                                                                         new Th({
//                                                                             text: "CATEGORY"
//                                                                         }),
//                                                                         new Th({
//                                                                             text: "PAYMENT METHODS"
//                                                                         }),
//                                                                         new Th({
//                                                                             text: "DATE"
//                                                                         }),
//                                                                         new Th({
//                                                                             text: "ACTION"
//                                                                         })
//                                                                     ]
//                                                                 })
//                                                             ]
//                                                         }),
//                                                         this.tableBody = new Tbody({
//                                                             classList: "text text__table--name",
//                                                             children: [
//                                                                 new Tr({
//                                                                     classList: "table__row-new",
//                                                                     children: [
//                                                                         new Td({
//                                                                             children: [
//                                                                                 new Div({
//                                                                                     classList: "table table__first-block",
//                                                                                     children: [
//                                                                                         new Div({
//                                                                                             classList: "icon--table__expense"
//                                                                                         }),
//                                                                                         new Div({
//                                                                                             classList: "text__table--name",
//                                                                                             text: "Iphone 13 Pro MAX"
//                                                                                         })
//                                                                                     ]
//                                                                                 })
//                                                                             ]
//                                                                         }),
//                                                                         new Td({
//                                                                             classList: "text text--red",
//                                                                             text: "-$5.30"
//                                                                         }),
//                                                                         new Td({
//                                                                             text: "Groceries"
//                                                                         }),
//                                                                         new Td({
//                                                                             text: "Cash"
//                                                                         }),
//                                                                         new Td({
//                                                                             classList: "text__table--date",
//                                                                             text: "12 Jan 2020<br>09:34"
//                                                                         }),
//                                                                         new Td({
//                                                                             classList: "text__table--date",
//                                                                             children: [
//                                                                                 new Img({
//                                                                                     classList: "btn btn_more-actions",
//                                                                                     src: "icons/dots.svg"
//                                                                                 })
//                                                                             ]
//                                                                         })
//                                                                     ]
//                                                                 })
//                                                             ]
//                                                         })
//                                                     ]
//                                                 })
//                                             ]
//                                         })
//                                     ]
//                                 })
//                             ]
//                         })
//                     ]
//                 })
//             ]
//         })
//     }
//
//     async mountView() {
//         await this.underlayView.mountView();
//         await this.mainComponent.mountComponent(this.underlayView.parentMainContent.element);
//         this.bindListeners();
//     }
//
//     unmount() {
//         this.mainComponent.unmount();
//     }
//
//     async showModal(btnDOM, name) {
//         if (diContainer.get(name)) {
//             this.closeModal(name);
//             return;
//         }
//
//         let modal;
//
//         if (name === "moreActionsModal") {
//             modal = new MoreActionsModal();
//             await modal.mountComponent(document.body);
//
//             const rect = btnDOM.getBoundingClientRect();
//             const modalRect = modal.element.getBoundingClientRect();
//             modal.element.style.top = `${rect.top - modalRect.height}px`;
//             modal.element.style.left = `${rect.left - modalRect.width}px`;
//         }
//
//         if (name === "addTransaction") {
//             modal = new AddTransactionModal();
//             await modal.mountComponent(document.body);
//         }
//
//         diContainer.register(name, {type: "modal", value: modal});
//     }
//
//     closeModal(name) {
//         const modal = diContainer.get(name);
//         if (!modal) return;
//
//         modal.unmount();
//         diContainer.delete(name);
//     }
//
//     bindListeners() {
//         this.tableBody.element.addEventListener("click", async (e) => {
//             const btn = e.target.closest(".btn_more-actions");
//             if (!btn) return;
//
//             e.stopPropagation();
//             await this.showModal(btn, "moreActionsModal");
//         });
//
//
//         this.addTransaction.element.addEventListener("click", async (e) => {
//             const btn = e.target.closest(".btn__add-transaction") ? e.target : null;
//             if (btn) {
//                 e.stopPropagation();
//                 await this.showModal(btn, "addTransaction");
//             }
//         });
//     }
// }