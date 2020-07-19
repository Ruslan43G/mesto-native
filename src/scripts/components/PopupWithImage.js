import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    open({link, name}) {
        super.open();
        this._popup.querySelector('.popup__image').src = link;
        this._popup.querySelector('.popup__img-text').textContent = name;
    }
}