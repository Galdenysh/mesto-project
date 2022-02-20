export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._openPopupBtn = document.querySelector(".profile__avatar-button");
  }

  open() {
    this._popup.classList.add("popup_opened");

    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");

    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      // Если был клик по открытому оверлею, то закроем попап
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
      // Если нажата кнопка закрытия, то закроем попап
      if (evt.target.classList.contains("popup__close-button")) {
        this.close();
      }
    });
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
}
