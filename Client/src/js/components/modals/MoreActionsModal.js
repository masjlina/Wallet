import {Component} from "../../core/Component";

export default class MoreActionsModal extends Component {
    constructor() {
        super();
    }

    init() {
        return `
           <div class="wrapper modal__wrapper">
             <div class="container modal__container">
                 <div class="content modal__content text text__base">
                    <button class="btn btn__nav btn__modal text--r">
                        <img src="icons/pencil.svg" alt="Pencil">
                        Edit
                    </button>
                    <hr/>
                    <button class="btn btn__nav btn__modal text--red">
                        <img src="icons/trash--red.svg" alt="Trash can">
                        Delete
                    </button>
                </div>
             </div>
           </div>
        `
    }
}