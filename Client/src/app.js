// "use strict";
//
// import {navigateTo} from "./utils/index";
// import {UnderlayView} from "./views/UnderlayView";
// import {diContainer} from "./utils/DiContainer";
// import urlPaths from "./utils/enumeration";
//
// diContainer.register("underlay", {value: new UnderlayView(document.querySelector("body"))});
//
// window.addEventListener('DOMContentLoaded', () => {
//     if (!window.location.hash) {
//         window.location.hash = '#/login';
//     } else {
//         navigateTo(urlPaths.home);
//     }
// });
//
// document.body.addEventListener("click", (e) => {
//     const openedModals = diContainer.filterByType("modal");
//     console.log(openedModals);
//     if (openedModals.length === 0) return;
//
//     const modalWrapper = e.target.closest(".modal__wrapper");
//
//     if (!modalWrapper) {
//         openedModals.forEach(modal => modal.value.unmount());
//         diContainer.clearModals();
//         return;
//     }
// });
