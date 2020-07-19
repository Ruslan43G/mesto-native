import Popup from './Popup.js';


export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, onConfirm) {
    super(popupSelector);
    this._onConfirm = onConfirm;
    this._submitEvent = evt => {
      evt.preventDefault();
      this._onConfirm(this._card, this._cardClass);
    };
    this._popup.addEventListener('submit', this._submitEvent);
  }
  setCard(card, cardClass) {
    this._card = card;
    this._cardClass = cardClass;
  }
}