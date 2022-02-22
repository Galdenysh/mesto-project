import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor({ handleConfirm }, selector) {
    super(selector);
    this._handleConfirm = handleConfirm;
  }

  setEventListeners() {
    const confirmBtn = this._popup.querySelector(".popup__save-button");

    super.setEventListeners();
    confirmBtn.addEventListener("click", () => this._handleConfirm({ cardElement: this._cardElement, cardId: this._cardId }, confirmBtn));
  }

  open({ cardElement, cardId }) {
    super.open();

    this._cardElement = cardElement;
    this._cardId = cardId;
  }
}
