import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor({ handleConfirm }, selector) {
    super(selector);
    this._handleConfirm = handleConfirm;
    this._handleConfirmEvent = this._handleConfirmEvent.bind(this); // Явная привязка к class PopupConfirm, чтобы не потерять контекст
  }

  setEventListeners() {
    this._confirmBtn = this._popup.querySelector(".popup__save-button");

    super.setEventListeners();
    this._confirmBtn.addEventListener("click", this._handleConfirmEvent);
  }

  open({ cardElement, cardId }) {
    super.open();

    this._cardElement = cardElement;
    this._cardId = cardId;
  }

  _handleConfirmEvent() {
    this._handleConfirm({ cardElement: this._cardElement, cardId: this._cardId }, this._confirmBtn);
  }
}
